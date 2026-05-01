<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubmittedChecklistResource;
use App\Models\UserChecklist;
use Illuminate\Http\Request;

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
            'answers.deviation:id,title,severity,close_date,status',
        ])->loadCount(['answers as deviation_count_cache' => fn ($q) => $q->whereNotNull('avvik_listing_id')]);

        return response()->json(new SubmittedChecklistResource($userChecklist));
    }

    public function destroy(UserChecklist $userChecklist)
    {
        $userChecklist->delete();
        return response()->json(['message' => 'Submitted checklist deleted'], 200);
    }
}
