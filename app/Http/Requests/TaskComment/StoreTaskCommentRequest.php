<?php

namespace App\Http\Requests\TaskComment;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class StoreTaskCommentRequest extends FormRequest
{

    public function rules()
    {
        return [
            'task_id' => 'required|exists:tasks,id',
            'comment' => 'required|string|max:500'
        ];
    }
}
