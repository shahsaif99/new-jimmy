<?php
// app/Http/Controllers/ChecklistController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChecklistResource;
use App\Models\Checklist;
use App\Models\Section;
use App\Models\ChecklistTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ChecklistController extends Controller
{
    public function store(Request $request)
    {
        // Validate incoming request data
        $data = $request->validate([
            'name' => 'required|string',
            'sections' => 'required|array',
            'title_img' => 'nullable',
            'icon' => 'nullable',
            'color' => 'nullable',
        ]);

        // Create a new checklist
        $checklist = Checklist::create([
            'name' => $data['name'],
            'icon' => $data['icon'],
            'color' => $data['color'],
            'user_id' => auth()->id(),

        ]);
        if($data['title_img']){
            $this->convertImage($data['title_img'], 'attachments/checklist_'.\strtotime(now()).$checklist->id.'.png');
            $checklist->update(['title_img' => 'storage/attachments/checklist_'.\strtotime(now()).$checklist->id.'.png']);
        }
        // Loop through sections and create them for the checklist
       foreach($data['sections'] as $section){
            $new_section = Section::create([
                'name' => $section['name'],
                'checklist_id' => $checklist->id
            ]);
            foreach($section['tasks'] as $checklist_task){
                $new_task = ChecklistTask::create([
                    'name' => $checklist_task['name'],
                    'type' => $checklist_task['type'],
                    'param' => $checklist_task['param'],
                    'is_img_required' => $checklist_task['is_img_required'],
                    'section_id' => $new_section->id
                ]);
                if($checklist_task['img']){
                    $this->convertImage($checklist_task['img'], 'attachments/task_'.\strtotime(now()).$new_task->id.'.png');
                    $new_task->update(['img' => 'storage/attachments/task_'.\strtotime(now()).$new_task->id.'.png']);
                }
            }
       }

        return response()->json(['message' => 'Checklist created successfully'], 201);
    }
    public function convertImage ($base_64_string, $output_file) {
        $image = preg_replace('#^data:image/\w+;base64,#i', '', $base_64_string);
                $image = str_replace(' ', '+', $image);
        Storage::disk('public')->put($output_file, base64_decode($image));
    }
    public function index ()
    {
       $checklist = Checklist::with('sections.checklistTasks')->get();

       return response()->json(ChecklistResource::collection($checklist), 200);
    }
    public function show (Checklist $checklist)
    {
        return response()->json(new ChecklistResource($checklist), 200);
    }
    public function destroy (Checklist $checklist)
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
        ]);
        $checklist->update([
            'name' => $data['name'],
            'icon' => $data['icon'],
            'color' => $data['color'],
        ]);
        if($data['title_img']){
            $this->convertImage($data['title_img'], 'attachments/checklist_'.\strtotime(now()).$checklist->id.'.png');
            $checklist->update(['title_img' => 'storage/attachments/checklist_'.\strtotime(now()).$checklist->id.'.png']);
        }
        // dd($checklist->sections);
        if($checklist->sections()->exists()){

            // $checklist->sections()->tasks()->delete();
            $checklist->sections()->delete();
        }
        foreach($data['sections'] as $section){
            $new_section = Section::create([
                'name' => $section['name'],
                'checklist_id' => $checklist->id
            ]);
            foreach($section['tasks'] as $checklist_task){
                $new_task = ChecklistTask::create([
                    'name' => $checklist_task['name'],
                    'type' => $checklist_task['type'],
                    'param' => $checklist_task['param'],
                    'is_img_required' => $checklist_task['is_img_required'],
                    'section_id' => $new_section->id
                ]);
                if($checklist_task['img']){
                    $this->convertImage($checklist_task['img'], 'attachments/task_'.\strtotime(now()).$new_task->id.'.png');
                    $new_task->update(['img' => 'storage/attachments/task_'.\strtotime(now()).$new_task->id.'.png']);
                }
            }
       }
        return response()->json(['message' => 'Checklist updated successfully'], 200);
    }
}
