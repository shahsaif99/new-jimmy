<?php

namespace App\Http\Controllers;

use App\Models\ChecklistTask;
use App\Models\Task;
use App\Models\TaskCheckListAnswer;
use Illuminate\Http\Request;

class TaskCheckListAnswerController extends Controller
{

    public function store(Request $request)
    {
        $data = $request->validate([
            'checklist_task_id' => 'required|exists:checklist_tasks,id',
            'main_task_id' => 'required|exists:tasks,id', // I added this line to validate the main task id
            'answer' => 'required_without:img',
            'img' => 'required_without:answer',
            'attachment' => 'nullable|string',
        ]);
        $task_answer = TaskCheckListAnswer::where('checklist_task_id', $data['checklist_task_id'])->where('main_task_id',$data['main_task_id'])->first();
        if(!$task_answer){
            $task_answer = new TaskCheckListAnswer();
            $task_answer->checklist_task_id = $data['checklist_task_id'];
            $task_answer->main_task_id = $data['main_task_id'];
        }
        if ($request->hasFile('img') && $request->file('img')->isValid()) {
            // Generating a unique file name based on the current timestamp and file extension
            $imageName = time() . '.' . $request->img->extension();

            // Moving the image to a permanent location (e.g., 'public/images')
            $request->img->move(public_path('images'), $imageName);

            // Creating the storage path that will be saved in the database
            $storagePath = 'images/' . $imageName;

            // Assuming you have a model where this data should be stored
            $task_answer->img = $storagePath;
            // Set other properties as needed

            // Additional handling or response
        }

        if ($request->hasFile('attachment') && $request->file('attachment')->isValid()) {
            // Generating a unique file name based on the current timestamp and file extension
            $imageName = time() . '.' . $request->attachment->extension();

            // Moving the image to a permanent location (e.g., 'public/images')
            $request->attachment->move(public_path('images'), $imageName);

            // Creating the storage path that will be saved in the database
            $storagePath = 'images/' . $imageName;

            // Assuming you have a model where this data should be stored
            $task_answer->attachment = $storagePath;
            // Set other properties as needed
        }
        $task_answer->answer = $data['answer'] ?? '';
        $task_answer->save();

        $main_task = Task::find($data['main_task_id']);
        $checklist = count($main_task->checklist->tasks);
        $user_answered = TaskCheckListAnswer::where('main_task_id',$data['main_task_id'])->count();
        if($user_answered >= $checklist){
            $main_task->status = 'completed';
            $main_task->save();
        }
        // $task->checklists()->attach($checklist, ['answer' => $request->answer]);

        return response()->json(['message' => 'Answer added successfully']);
    }
}
