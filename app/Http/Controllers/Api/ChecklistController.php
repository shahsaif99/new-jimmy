<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChecklistResource;
use App\Models\AvvikListing;
use App\Models\Checklist;
use App\Models\ChecklistTask;
use App\Models\Section;
use App\Models\TaskCheckListAnswer;
use App\Models\UserChecklist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ChecklistController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'sections' => 'required|array',
            'title_img' => 'nullable',
            'icon' => 'nullable',
            'color' => 'nullable',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $checklist = Checklist::create([
            'name' => $data['name'],
            'icon' => $data['icon'] ?? null,
            'color' => $data['color'] ?? null,
            'category_id' => $data['category_id'] ?? null,
            'user_id' => auth()->id(),
        ]);

        if (!empty($data['title_img'])) {
            $path = 'attachments/checklist_' . \strtotime(now()) . $checklist->id . '.png';
            $this->convertImage($data['title_img'], $path);
            $checklist->update(['title_img' => 'storage/' . $path]);
        }

        $this->writeSections($checklist, $data['sections']);

        return response()->json(['message' => 'Checklist created successfully'], 201);
    }

    public function convertImage($base_64_string, $output_file)
    {
        $image = preg_replace('#^data:image/\w+;base64,#i', '', $base_64_string);
        $image = str_replace(' ', '+', $image);
        Storage::disk('public')->put($output_file, base64_decode($image));
    }

    public function index(Request $request)
    {
        $query = Checklist::query()
            ->with(['sections.checklistTasks', 'category', 'user'])
            ->withCount(['sections', 'tasks'])
            ->when($request->q, fn ($q, $term) => $q->where('name', 'like', "%{$term}%"))
            ->when($request->category_id, fn ($q, $id) => $q->where('category_id', $id))
            ->latest('id');

        return response()->json(ChecklistResource::collection($query->get()), 200);
    }

    public function show(Checklist $checklist)
    {
        $checklist->load(['sections.checklistTasks', 'category', 'user'])
            ->loadCount(['sections', 'tasks']);
        return response()->json(new ChecklistResource($checklist), 200);
    }

    public function destroy(Checklist $checklist)
    {
        $checklist->delete();
        return response()->json(['message' => 'Checklist deleted successfully'], 200);
    }

    public function update(Request $request, Checklist $checklist)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'sections' => 'required',
            'title_img' => 'nullable',
            'icon' => 'nullable',
            'color' => 'nullable',
            'category_id' => 'nullable|exists:categories,id',
        ]);

        $checklist->update([
            'name' => $data['name'],
            'icon' => $data['icon'] ?? null,
            'color' => $data['color'] ?? null,
            'category_id' => $data['category_id'] ?? null,
        ]);

        if (!empty($data['title_img'])) {
            $path = 'attachments/checklist_' . \strtotime(now()) . $checklist->id . '.png';
            $this->convertImage($data['title_img'], $path);
            $checklist->update(['title_img' => 'storage/' . $path]);
        }

        if ($checklist->sections()->exists()) {
            $checklist->sections()->delete();
        }

        $this->writeSections($checklist, $data['sections']);

        return response()->json(['message' => 'Checklist updated successfully'], 200);
    }

    public function start(Request $request, Checklist $checklist)
    {
        $data = $request->validate([
            'project_id' => 'nullable|exists:projects,id',
            'equipment_id' => 'nullable|exists:equipment,id',
        ]);

        $userChecklist = UserChecklist::create([
            'checklist_id' => $checklist->id,
            'title' => $checklist->name,
            'status' => UserChecklist::STATUS_IN_PROGRESS,
            'started_at' => now(),
            'assigned_by' => auth()->id(),
            'project_id' => $data['project_id'] ?? null,
            'equipment_id' => $data['equipment_id'] ?? null,
            'category_id' => $checklist->category_id,
            'total_tasks' => $checklist->tasks()->count(),
        ]);

        $userChecklist->snapshotFromTemplate($checklist);
        $userChecklist->users()->sync([auth()->id()]);
        $userChecklist->update(['is_started' => true]);

        return response()->json([
            'message' => 'Checklist started',
            'user_checklist_id' => $userChecklist->id,
        ], 201);
    }

    public function perform(Request $request, Checklist $checklist)
    {
        $data = $request->validate([
            'title' => 'nullable|string',
            'description' => 'nullable|string',
            'project_id' => 'nullable|exists:projects,id',
            'equipment_id' => 'nullable|exists:equipment,id',
            'answers' => 'required|array|min:1',
            'answers.*.checklist_task_id' => 'required|integer|exists:checklist_tasks,id',
            'answers.*.answer' => 'required|in:PASS,FAIL,NA',
            'answers.*.notes' => 'nullable|string',
            'answers.*.img' => 'nullable|string',
            'answers.*.deviation' => 'nullable|array',
            'answers.*.deviation.type' => 'required_with:answers.*.deviation|string',
            'answers.*.deviation.title' => 'required_with:answers.*.deviation|string',
            'answers.*.deviation.responsible_person' => 'nullable|string',
        ]);

        $userChecklist = DB::transaction(function () use ($data, $checklist) {
            $uc = UserChecklist::create([
                'checklist_id' => $checklist->id,
                'title' => $data['title'] ?? $checklist->name,
                'description' => $data['description'] ?? null,
                'project_id' => $data['project_id'] ?? null,
                'equipment_id' => $data['equipment_id'] ?? null,
                'category_id' => $checklist->category_id,
                'status' => UserChecklist::STATUS_SUBMITTED,
                'started_at' => now(),
                'submitted_at' => now(),
                'assigned_by' => auth()->id(),
                'is_started' => true,
                'total_tasks' => $checklist->tasks()->count(),
            ]);
            $uc->snapshotFromTemplate($checklist);
            $uc->users()->sync([auth()->id()]);

            $snapshotTaskMap = $uc->snapshotTasks()->get()->keyBy('source_checklist_task_id');

            foreach ($data['answers'] as $a) {
                $snapshotTask = $snapshotTaskMap->get($a['checklist_task_id']);
                $answer = TaskCheckListAnswer::create([
                    'checklist_task_id' => $a['checklist_task_id'],
                    'user_checklist_task_id' => $snapshotTask?->id,
                    'user_checklist_id' => $uc->id,
                    'user_id' => auth()->id(),
                    'answer' => $a['answer'],
                    'notes' => $a['notes'] ?? null,
                ]);

                if (!empty($a['img']) && str_starts_with($a['img'], 'data:image')) {
                    $path = 'attachments/answer_' . $uc->id . '_' . $answer->id . '_' . uniqid() . '.png';
                    $this->convertImage($a['img'], $path);
                    $answer->update(['img' => 'storage/' . $path]);
                }

                if ($a['answer'] === 'FAIL' && !empty($a['deviation'])) {
                    $deviation = AvvikListing::create([
                        'type' => $a['deviation']['type'],
                        'title' => $a['deviation']['title'],
                        'date' => now()->format('Y-m-d'),
                        'responsible_person' => $a['deviation']['responsible_person'] ?? null,
                        'project_id' => $uc->project_id,
                        'equipment_id' => $uc->equipment_id,
                        'description' => $a['notes'] ?? null,
                        'registered_by' => auth()->id(),
                        'user_id' => auth()->id(),
                        'status' => 'open',
                    ]);
                    $answer->update(['avvik_listing_id' => $deviation->id]);
                }
            }

            $uc->recalculateProgress();
            return $uc;
        });

        return response()->json([
            'message' => 'Checklist submitted',
            'user_checklist_id' => $userChecklist->id,
        ], 201);
    }

    private function writeSections(Checklist $checklist, array $sections): void
    {
        foreach ($sections as $section) {
            $newSection = Section::create([
                'name' => $section['name'],
                'checklist_id' => $checklist->id,
            ]);
            foreach ($section['tasks'] as $task) {
                $newTask = ChecklistTask::create([
                    'name' => $task['name'],
                    'type' => $task['type'],
                    'param' => $task['param'] ?? null,
                    'is_img_required' => $task['is_img_required'] ?? false,
                    'section_id' => $newSection->id,
                ]);
                if (!empty($task['img'])) {
                    $path = 'attachments/task_' . \strtotime(now()) . $newTask->id . '.png';
                    $this->convertImage($task['img'], $path);
                    $newTask->update(['img' => 'storage/' . $path]);
                }
            }
        }
    }
}
