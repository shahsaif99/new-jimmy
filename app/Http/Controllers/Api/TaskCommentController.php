<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TaskComment\StoreTaskCommentRequest;
use App\Http\Resources\TaskCommentResource;
use App\Models\TaskComment;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class TaskCommentController extends Controller
{
    public function index($taskId)
    {
        $comments = TaskComment::where('task_id', $taskId)->oldest()->get();
        return TaskCommentResource::collection($comments);
    }

    public function store(StoreTaskCommentRequest $request)
    {
        $user = Auth::user();
        $task = Task::findOrFail($request->task_id);

        $comment = TaskComment::create([
            'task_id' => $task->id,
            'user_id' => $user->id,
            'comment' => $request->comment
        ]);
        return new TaskCommentResource($comment);
    }

    public function destroy(TaskComment $taskComment)
    {
        $this->authorize('delete', $taskComment);
        $taskComment->delete();
        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
