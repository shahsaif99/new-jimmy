<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubmittedChecklistResource;
use App\Models\AvvikListing;
use App\Models\TaskCheckListAnswer;
use App\Models\UserChecklist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubmittedChecklistController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'scope' => 'nullable|in:mine,all',
            'checklist_id' => 'nullable|integer',
            'project_id' => 'nullable|integer',
            'equipment_id' => 'nullable|integer',
            'employee_id' => 'nullable|integer',
            'status' => 'nullable|string',
            'q' => 'nullable|string',
            'date' => 'nullable|array',
            'sortBy' => 'nullable|string',
            'sortDesc' => 'nullable',
            'perPage' => 'nullable|integer|min:1|max:100',
        ]);

        $query = UserChecklist::query()
            ->with(['checklist', 'users:id,first_name,last_name', 'project:id,name,project_no', 'equipment:id,name'])
            ->withCount(['answers as deviation_count_cache' => fn ($q) => $q->whereNotNull('avvik_listing_id')]);

        $user = $request->user();
        if ($request->scope === 'mine' || !$user || !$user->can('checklist-view-all')) {
            $query->mine($user?->id);
        }

        $query->applyFilters($request);

        if (!$request->has('date')) {
            $query->where('created_at', '>=', now()->subDays(30));
        }

        $perPage = (int) ($request->perPage ?? 15);
        $paginated = $query->paginate($perPage);

        return SubmittedChecklistResource::collection($paginated)->response();
    }

    public function show(UserChecklist $userChecklist)
    {
        $userChecklist->load([
            'checklist.sections.checklistTasks',
            'users:id,first_name,last_name',
            'project:id,name,project_no',
            'equipment:id,name',
            'category:id,name',
            'assigner:id,first_name,last_name',
            'answers.deviation:id,title,severity,close_date,status,type,responsible_person,project_id',
        ])->loadCount(['answers as deviation_count_cache' => fn ($q) => $q->whereNotNull('avvik_listing_id')]);

        $resource = new SubmittedChecklistResource($userChecklist);
        $payload = $resource->toArray(request());

        $answersByTask = $userChecklist->answers->keyBy('checklist_task_id');

        $payload['template_full'] = $userChecklist->checklist ? [
            'id' => $userChecklist->checklist->id,
            'name' => $userChecklist->checklist->name,
            'icon' => $userChecklist->checklist->icon,
            'color' => $userChecklist->checklist->color,
            'sections' => $userChecklist->checklist->sections->map(function ($section) use ($answersByTask) {
                return [
                    'id' => $section->id,
                    'name' => $section->name,
                    'tasks' => $section->checklistTasks->map(function ($task) use ($answersByTask) {
                        $answer = $answersByTask->get($task->id);
                        return [
                            'id' => $task->id,
                            'name' => $task->name,
                            'type' => $task->type,
                            'param' => $task->param,
                            'is_img_required' => (bool) $task->is_img_required,
                            'img' => $task->img,
                            'answer' => $answer ? [
                                'id' => $answer->id,
                                'value' => $answer->answer,
                                'notes' => $answer->notes,
                                'img' => $answer->img,
                                'avvik_listing_id' => $answer->avvik_listing_id,
                                'deviation' => $answer->deviation ? [
                                    'id' => $answer->deviation->id,
                                    'title' => $answer->deviation->title,
                                    'type' => $answer->deviation->type,
                                    'severity' => $answer->deviation->severity,
                                    'status' => $answer->deviation->status,
                                ] : null,
                            ] : null,
                        ];
                    })->values(),
                ];
            })->values(),
        ] : null;

        return response()->json($payload);
    }

    public function destroy(UserChecklist $userChecklist)
    {
        $userChecklist->delete();
        return response()->json(['message' => 'Submitted checklist deleted'], 200);
    }

    public function submit(UserChecklist $userChecklist)
    {
        $userChecklist->update([
            'status' => UserChecklist::STATUS_SUBMITTED,
            'submitted_at' => now(),
            'is_started' => true,
        ]);

        return response()->json([
            'message' => 'Checklist submitted',
            'submitted_at' => $userChecklist->submitted_at,
            'status' => $userChecklist->status,
        ]);
    }

    public function createDeviation(Request $request, UserChecklist $userChecklist, TaskCheckListAnswer $answer)
    {
        $data = $request->validate([
            'type' => 'required|string',
            'title' => 'required|string',
            'responsible_person' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'description' => 'nullable|string',
        ]);

        if ($answer->user_checklist_id !== $userChecklist->id) {
            return response()->json(['message' => 'Answer does not belong to this checklist'], 422);
        }

        $deviation = DB::transaction(function () use ($data, $userChecklist, $answer) {
            $deviation = AvvikListing::create([
                'type' => $data['type'],
                'title' => $data['title'],
                'date' => now()->format('Y-m-d'),
                'responsible_person' => $data['responsible_person'] ?? null,
                'project_id' => $data['project_id'] ?? $userChecklist->project_id,
                'equipment_id' => $userChecklist->equipment_id,
                'description' => $data['description'] ?? $answer->notes,
                'registered_by' => auth()->id(),
                'user_id' => auth()->id(),
                'status' => 'open',
            ]);

            $answer->update(['avvik_listing_id' => $deviation->id]);

            return $deviation;
        });

        return response()->json([
            'message' => 'Deviation created and linked',
            'deviation' => [
                'id' => $deviation->id,
                'title' => $deviation->title,
                'type' => $deviation->type,
            ],
        ], 201);
    }
}
