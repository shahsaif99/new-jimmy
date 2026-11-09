<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobSafetyAnalysisResource;
use App\Models\CompanyInformation;
use App\Models\JobSafetyAnalysis;
use App\Models\JsaParticipant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class JobSafetyAnalysisController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $query = JobSafetyAnalysis::with(['project', 'leader', 'participants'])
            ->search($request->search)
            ->applyFilters($request);

        // "All JSAs" is the admin tab. Anyone else asking for it is quietly
        // given their own list rather than an error, because the tab is hidden
        // for them and a stray request is a bug, not an attack.
        if ($request->input('scope') !== 'all' || !$user->hasRole('Admin')) {
            $query->involving($user->id);
        }

        $sortBy = in_array($request->sortBy, ['jsa_no', 'title', 'jsa_date', 'status'], true)
            ? $request->sortBy
            : 'jsa_date';
        $query->orderBy($sortBy, $request->sortDesc === 'true' ? 'desc' : 'asc')
            ->orderByDesc('id');

        $perPage = (int) ($request->perPage ?: 10);
        $jsas = $query->paginate($perPage);

        return response()->json([
            'jsas' => JobSafetyAnalysisResource::collection($jsas),
            'pagination' => [
                'total' => $jsas->total(),
                'count' => $jsas->count(),
                'per_page' => $jsas->perPage(),
                'current_page' => $jsas->currentPage(),
                'total_pages' => $jsas->lastPage(),
                'has_more_pages' => $jsas->hasMorePages(),
            ],
            // Drives the "My JSAs 2" badge in the mockup: how many of my JSAs
            // are still waiting on my signature.
            'awaiting_my_signature' => JsaParticipant::where('user_id', $user->id)
                ->where('signature_status', 'not_signed')
                ->whereHas('jsa', fn ($q) => $q->whereIn('status', ['active', 'completed']))
                ->count(),
        ]);
    }

    public function show(Request $request, JobSafetyAnalysis $jobSafetyAnalysis)
    {
        $this->authorizeView($request, $jobSafetyAnalysis);

        $jobSafetyAnalysis->load(['project', 'leader', 'hazards', 'participants.user']);

        return response()->json([
            'data' => new JobSafetyAnalysisResource($jobSafetyAnalysis),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validatePayload($request);

        $jsa = DB::transaction(function () use ($data, $request) {
            $jsa = JobSafetyAnalysis::create([
                'title' => $data['title'],
                'project_id' => $data['project_id'] ?? null,
                'jsa_date' => $data['jsa_date'] ?? null,
                'work_location' => $data['work_location'] ?? null,
                'jsa_leader_id' => $data['jsa_leader_id'] ?? null,
                'status' => $data['status'] ?? 'draft',
                'description' => $data['description'] ?? null,
                'created_by' => $request->user()->id,
            ]);

            $this->syncHazards($jsa, $data['hazards'] ?? []);
            $this->syncParticipants($jsa, $this->withLeader($data));

            return $jsa;
        });

        $jsa->refresh()->load(['project', 'leader', 'hazards', 'participants.user']);

        return response()->json([
            'message' => 'Job safety analysis successfully created.',
            'data' => new JobSafetyAnalysisResource($jsa),
        ], 201);
    }

    public function update(Request $request, JobSafetyAnalysis $jobSafetyAnalysis)
    {
        $this->authorizeManage($request, $jobSafetyAnalysis);

        $data = $this->validatePayload($request);

        DB::transaction(function () use ($data, $jobSafetyAnalysis) {
            $jobSafetyAnalysis->update([
                'title' => $data['title'],
                'project_id' => $data['project_id'] ?? null,
                'jsa_date' => $data['jsa_date'] ?? null,
                'work_location' => $data['work_location'] ?? null,
                'jsa_leader_id' => $data['jsa_leader_id'] ?? null,
                'status' => $data['status'] ?? $jobSafetyAnalysis->status,
                'description' => $data['description'] ?? null,
            ]);

            $this->syncHazards($jobSafetyAnalysis, $data['hazards'] ?? []);
            $this->syncParticipants($jobSafetyAnalysis, $this->withLeader($data));
        });

        $jobSafetyAnalysis->refresh()->load(['project', 'leader', 'hazards', 'participants.user']);

        return response()->json([
            'message' => 'Job safety analysis successfully updated.',
            'data' => new JobSafetyAnalysisResource($jobSafetyAnalysis),
        ]);
    }

    public function destroy(Request $request, JobSafetyAnalysis $jobSafetyAnalysis)
    {
        $this->authorizeManage($request, $jobSafetyAnalysis);

        $jobSafetyAnalysis->delete();

        return response()->json(['message' => 'Job safety analysis deleted.']);
    }

    /**
     * Status is changed on its own, never as a side effect of signing. A JSA
     * signed on paper has to be able to reach Completed with no digital
     * signatures recorded against it at all.
     */
    public function updateStatus(Request $request, JobSafetyAnalysis $jobSafetyAnalysis)
    {
        $this->authorizeManage($request, $jobSafetyAnalysis);

        $validated = $request->validate([
            'status' => ['required', Rule::in(JobSafetyAnalysis::STATUSES)],
        ]);

        $jobSafetyAnalysis->update($validated);
        $jobSafetyAnalysis->load(['project', 'leader', 'hazards', 'participants.user']);

        return response()->json([
            'message' => 'Status updated.',
            'data' => new JobSafetyAnalysisResource($jobSafetyAnalysis),
        ]);
    }

    /**
     * The signed-in user signs their own participant line. Nobody can sign in
     * the app on somebody else's behalf — that is what the paper route is for.
     */
    public function sign(Request $request, JobSafetyAnalysis $jobSafetyAnalysis)
    {
        $participant = $jobSafetyAnalysis->participants()
            ->where('user_id', $request->user()->id)
            ->first();

        if (!$participant) {
            throw ValidationException::withMessages([
                'participant' => 'You are not listed as a participant on this JSA.',
            ]);
        }

        if ($participant->has_signed) {
            throw ValidationException::withMessages([
                'participant' => 'You have already signed this JSA.',
            ]);
        }

        $participant->update([
            'signature_status' => 'signed_in_app',
            'signed_at' => now(),
            'recorded_by_id' => null,
        ]);

        $jobSafetyAnalysis->load(['project', 'leader', 'hazards', 'participants.user']);

        return response()->json([
            'message' => 'JSA signed.',
            'data' => new JobSafetyAnalysisResource($jobSafetyAnalysis),
        ]);
    }

    /**
     * The leader or an admin records that a participant signed the printed
     * copy. This is the only way a participant without a login is ever marked
     * as signed.
     */
    public function recordSignature(Request $request, JobSafetyAnalysis $jobSafetyAnalysis, JsaParticipant $participant)
    {
        $this->authorizeManage($request, $jobSafetyAnalysis);

        if ($participant->job_safety_analysis_id !== $jobSafetyAnalysis->id) {
            abort(404);
        }

        $validated = $request->validate([
            'signature_status' => ['required', Rule::in(['not_signed', 'signed_on_paper'])],
            'signed_at' => ['nullable', 'date'],
        ]);

        $paper = $validated['signature_status'] === 'signed_on_paper';

        // An in-app signature is the participant's own act and is not something
        // the leader may overwrite with a paper one.
        if ($participant->signature_status === 'signed_in_app') {
            throw ValidationException::withMessages([
                'participant' => 'This participant has already signed in the app.',
            ]);
        }

        $participant->update([
            'signature_status' => $validated['signature_status'],
            'signed_at' => $paper ? ($validated['signed_at'] ?? now()) : null,
            'recorded_by_id' => $paper ? $request->user()->id : null,
        ]);

        $jobSafetyAnalysis->load(['project', 'leader', 'hazards', 'participants.user']);

        return response()->json([
            'message' => $paper ? 'Paper signature recorded.' : 'Signature cleared.',
            'data' => new JobSafetyAnalysisResource($jobSafetyAnalysis),
        ]);
    }

    public function exportPdf(Request $request, JobSafetyAnalysis $jobSafetyAnalysis)
    {
        $this->authorizeView($request, $jobSafetyAnalysis);

        $jobSafetyAnalysis->load(['project', 'leader', 'hazards', 'participants.user']);

        $company = CompanyInformation::first();
        $logoPath = $company && $company->logo
            ? storage_path('app/public/company/' . $company->logo)
            : public_path('images/logo/logo.png');

        if (!file_exists($logoPath)) {
            $logoPath = public_path('images/logo/logo.png');
        }

        $pdf = app('dompdf.wrapper');
        $pdf->loadView('exports.jsa-report', [
            'jsa' => $jobSafetyAnalysis,
            'logoPath' => $logoPath,
        ]);

        return $pdf->download(($jobSafetyAnalysis->jsa_no ?: 'JSA') . '.pdf');
    }

    private function validatePayload(Request $request): array
    {
        // A draft is work in progress and may be saved half-finished, which the
        // spec asks for explicitly. Once it goes Active or Completed it is the
        // document the crew works to, so everything the form marks with an
        // asterisk has to actually be there.
        $isDraft = ($request->input('status') ?: 'draft') === 'draft';
        $whenComplete = $isDraft ? 'nullable' : 'required';

        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'project_id' => [$whenComplete, 'nullable', 'exists:projects,id'],
            'jsa_date' => ['nullable', 'date'],
            'work_location' => [$whenComplete, 'nullable', 'string', 'max:255'],
            'jsa_leader_id' => [$whenComplete, 'nullable', 'exists:users,id'],
            'status' => ['nullable', Rule::in(JobSafetyAnalysis::STATUSES)],
            'description' => [$whenComplete, 'nullable', 'string'],

            'hazards' => [$isDraft ? 'array' : 'required', 'array', $isDraft ? 'nullable' : 'min:1'],
            'hazards.*.work_type' => ['required', 'string', 'max:255'],
            'hazards.*.hazard' => ['required', 'string'],
            'hazards.*.control' => ['required', 'string'],

            'participants' => ['array'],
            'participants.*.user_id' => ['nullable', 'exists:users,id'],
            'participants.*.name' => ['required', 'string', 'max:255'],
        ], [], [
            // Without these the messages read "The jsa leader id field is
            // required", which is what the client would see on screen.
            'project_id' => 'project',
            'jsa_date' => 'date',
            'jsa_leader_id' => 'JSA leader',
            'work_location' => 'work location',
            'description' => 'description of the work',
            'hazards' => 'work types',
        ]);
    }

    /**
     * The JSA leader signs the analysis like everyone else on the job, so they
     * are always on the participant list whether or not the form sent them.
     */
    private function withLeader(array $data): array
    {
        $participants = $data['participants'] ?? [];
        $leaderId = $data['jsa_leader_id'] ?? null;

        if (!$leaderId) {
            return $participants;
        }

        foreach ($participants as $row) {
            if (($row['user_id'] ?? null) === $leaderId) {
                return $participants;
            }
        }

        $leader = \App\Models\User::find($leaderId);

        if ($leader) {
            array_unshift($participants, ['user_id' => $leader->id, 'name' => $leader->name]);
        }

        return $participants;
    }

    private function syncHazards(JobSafetyAnalysis $jsa, array $hazards): void
    {
        // The rows are ordered by drag-and-drop and renumbered on the report, so
        // the list is rewritten wholesale rather than diffed; there is no
        // per-row state worth preserving.
        $jsa->hazards()->delete();

        foreach (array_values($hazards) as $index => $row) {
            $jsa->hazards()->create([
                'work_type' => $row['work_type'],
                'hazard' => $row['hazard'],
                'control' => $row['control'],
                'sort_order' => $index,
            ]);
        }
    }

    private function syncParticipants(JobSafetyAnalysis $jsa, array $participants): void
    {
        $existing = $jsa->participants()->get();
        $keptIds = [];

        foreach ($participants as $row) {
            $userId = $row['user_id'] ?? null;

            // Match on the user where there is one, otherwise on the exact
            // name, so that saving the form again does not wipe signatures
            // that have already been collected.
            $match = $userId
                ? $existing->firstWhere('user_id', $userId)
                : $existing->first(fn ($p) => $p->user_id === null && $p->name === $row['name']);

            if ($match) {
                $match->update(['name' => $row['name']]);
                $keptIds[] = $match->id;
                continue;
            }

            $created = $jsa->participants()->create([
                'user_id' => $userId,
                'name' => $row['name'],
                'signature_status' => 'not_signed',
            ]);
            $keptIds[] = $created->id;
        }

        $jsa->participants()->whereNotIn('id', $keptIds ?: [0])->delete();
    }

    /**
     * Only administrators see the whole company's JSAs. For everyone else a
     * JSA is readable exactly when it would appear on their My JSAs tab —
     * otherwise that scoping would be undone by guessing an id.
     */
    private function authorizeView(Request $request, JobSafetyAnalysis $jsa): void
    {
        $user = $request->user();

        if ($user->hasRole('Admin')) {
            return;
        }

        $involved = $jsa->jsa_leader_id === $user->id
            || $jsa->created_by === $user->id
            || $jsa->participants()->where('user_id', $user->id)->exists();

        abort_unless($involved, 403, 'You do not have access to this JSA.');
    }

    /**
     * Editing, deleting, changing status and recording paper signatures belong
     * to the JSA leader, its author, and admins.
     */
    private function authorizeManage(Request $request, JobSafetyAnalysis $jsa): void
    {
        $user = $request->user();

        $allowed = $user->hasRole('Admin')
            || $jsa->jsa_leader_id === $user->id
            || $jsa->created_by === $user->id;

        abort_unless($allowed, 403, 'You are not allowed to manage this JSA.');
    }
}
