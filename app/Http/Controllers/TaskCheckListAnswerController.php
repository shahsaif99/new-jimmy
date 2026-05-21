<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\TaskCheckListAnswer;
use App\Models\UserChecklist;
use App\Models\UserChecklistTask;
use Illuminate\Http\Request;

class TaskCheckListAnswerController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'checklist_task_id' => 'nullable|exists:checklist_tasks,id',
            'user_checklist_task_id' => 'nullable|exists:user_checklist_tasks,id',
            'main_task_id' => 'nullable|exists:tasks,id',
            'user_checklist_id' => 'nullable|exists:user_checklists,id',
            'answer' => 'required_without:img|string|in:PASS,FAIL,NA',
            'img' => 'required_without:answer',
            'attachment' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        if (empty($data['main_task_id']) && empty($data['user_checklist_id'])) {
            return response()->json(['message' => 'Either main_task_id or user_checklist_id is required'], 422);
        }

        $snapshotTask = null;
        if (!empty($data['user_checklist_task_id'])) {
            $snapshotTask = UserChecklistTask::find($data['user_checklist_task_id']);
        }

        // Locate the existing answer to upsert. Prefer the snapshot-task key when present.
        $query = TaskCheckListAnswer::query();
        if ($snapshotTask) {
            $query->where('user_checklist_task_id', $snapshotTask->id);
        } elseif (!empty($data['checklist_task_id'])) {
            $query->where('checklist_task_id', $data['checklist_task_id']);
        }
        if (!empty($data['user_checklist_id'])) {
            $query->where('user_checklist_id', $data['user_checklist_id']);
        }
        if (!empty($data['main_task_id'])) {
            $query->where('main_task_id', $data['main_task_id']);
        }
        $answer = $query->first() ?? new TaskCheckListAnswer();

        if ($snapshotTask) {
            $answer->user_checklist_task_id = $snapshotTask->id;
            $answer->checklist_task_id = $data['checklist_task_id'] ?? $snapshotTask->source_checklist_task_id;
        } elseif (!empty($data['checklist_task_id'])) {
            $answer->checklist_task_id = $data['checklist_task_id'];
        }
        if (!empty($data['main_task_id'])) {
            $answer->main_task_id = $data['main_task_id'];
        }
        if (!empty($data['user_checklist_id'])) {
            $answer->user_checklist_id = $data['user_checklist_id'];
        }
        $answer->user_id = auth()->id();
        if (isset($data['answer'])) {
            $answer->answer = $data['answer'];
        }
        if (array_key_exists('notes', $data)) {
            $answer->notes = $data['notes'];
        }

        if ($request->hasFile('img') && $request->file('img')->isValid()) {
            $imageName = time() . '_' . uniqid() . '.' . $request->img->extension();
            $request->img->move(public_path('images'), $imageName);
            $answer->img = 'images/' . $imageName;
        }

        if ($request->hasFile('attachment') && $request->file('attachment')->isValid()) {
            $attName = time() . '_att_' . uniqid() . '.' . $request->attachment->extension();
            $request->attachment->move(public_path('images'), $attName);
            $answer->attachment = 'images/' . $attName;
        }

        $answer->save();

        if (!empty($data['main_task_id'])) {
            $main_task = Task::find($data['main_task_id']);
            if ($main_task && $main_task->checklist) {
                $totalTasks = count($main_task->checklist->tasks);
                $userAnswered = TaskCheckListAnswer::where('main_task_id', $data['main_task_id'])->count();
                if ($userAnswered >= $totalTasks) {
                    $main_task->status = 'completed';
                    $main_task->save();
                }
            }
        }

        if (!empty($data['user_checklist_id'])) {
            $uc = UserChecklist::find($data['user_checklist_id']);
            if ($uc && $uc->status === UserChecklist::STATUS_DRAFT) {
                $uc->update(['status' => UserChecklist::STATUS_IN_PROGRESS, 'started_at' => $uc->started_at ?? now()]);
            }
        }

        return response()->json([
            'message' => 'Answer saved',
            'answer' => $answer->fresh(),
        ]);
    }
}
