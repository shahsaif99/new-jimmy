<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserChecklistResource;
use App\Models\Checklist;
use App\Models\User;
use App\Models\UserChecklist;
use App\Models\UserChecklistFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserChecklistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Checklist $checklist)
    {
        $checklist = UserChecklist::where('checklist_id', $checklist->id)->get();
        return response()->json(UserChecklistResource::collection($checklist), 200);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'assign_to'        => 'required|array',
            'checklist'        => 'required',
            'description'      => 'nullable',
            'files'            => 'nullable',
            'name'             => 'nullable',
            'priority'         => 'nullable',
            'work_location'    => 'nullable',
            'work_order'       => 'nullable',
            'project_id'       => 'nullable|exists:projects,id',
            'equipment_id'     => 'nullable|exists:equipment,id',
            'due_date'         => 'nullable|date',
        ]);

        $template = \App\Models\Checklist::find($data['checklist']);

        $checklist = UserChecklist::create([
            'checklist_id'  => $data['checklist'],
            'description'   => $data['description'] ?? null,
            'title'         => $data['name'] ?? $template?->name,
            'priority'      => $data['priority'] ?? null,
            'work_location' => isset($data['work_location']) ? \json_encode($data['work_location']) : null,
            'work_order'    => $data['work_order'] ?? null,
            'project_id'    => $data['project_id'] ?? null,
            'equipment_id'  => $data['equipment_id'] ?? null,
            'category_id'   => $template?->category_id,
            'due_date'      => $data['due_date'] ?? null,
            'status'        => UserChecklist::STATUS_ASSIGNED,
            'assigned_by'   => auth()->id(),
            'total_tasks'   => $template?->tasks()->count() ?? 0,
        ]);

        if ($template) {
            $checklist->snapshotFromTemplate($template);
        }

        foreach ($data['files'] ?? [] as $file) {
            $path = 'attachments/user_checklist_' . \strtotime(now()) . $checklist->id . '.png';
            $this->convertImage($file, $path);
            UserChecklistFile::create(['user_checklist_id' => $checklist->id, 'file' => $path]);
        }

        $checklist->users()->sync($data['assign_to']);

        return response()->json([
            'message' => 'User Checklist created successfully',
            'user_checklist_id' => $checklist->id,
        ], 201);
    }
    public function convertImage($base_64_string, $output_file)
    {
        $image = preg_replace('#^data:image/\w+;base64,#i', '', $base_64_string);
        $image = str_replace(' ', '+', $image);
        Storage::disk('public')->put($output_file, base64_decode($image));
    }

    public function show (UserChecklist $userChecklist)
    {
       return response()->json(new UserChecklistResource($userChecklist), 200);
    }

    public function destroy (UserChecklist $userChecklist)
    {
        $userChecklist->delete();
        return response()->json(['message' => 'User Checklist deleted successfully'], 200);
    }
    public function update(Request $request, UserChecklist $userChecklist)
    {
        $data = $request->validate([
            'assign_to'        => 'required|array',
            'checklist'        => 'required',
            'description'      => 'nullable',
            'files'            => 'nullable',
            'name'             => 'nullable',
            'priority'         => 'nullable',
            'work_location'    => 'nullable',
            'work_order'       => 'nullable',
            'project_id'       => 'nullable|exists:projects,id',
            'equipment_id'     => 'nullable|exists:equipment,id',
            'due_date'         => 'nullable|date',
        ]);

        $userChecklist->update([
            'checklist_id'  => $data['checklist'],
            'description'   => $data['description'] ?? null,
            'title'         => $data['name'] ?? $userChecklist->title,
            'priority'      => $data['priority'] ?? null,
            'work_location' => isset($data['work_location']) ? \json_encode($data['work_location']) : null,
            'work_order'    => $data['work_order'] ?? null,
            'project_id'    => $data['project_id'] ?? $userChecklist->project_id,
            'equipment_id'  => $data['equipment_id'] ?? $userChecklist->equipment_id,
            'due_date'      => $data['due_date'] ?? $userChecklist->due_date,
        ]);

        foreach ($data['files'] ?? [] as $file) {
            $path = 'attachments/user_checklist_' . \strtotime(now()) . $userChecklist->id . '.png';
            $this->convertImage($file, $path);
            UserChecklistFile::create(['user_checklist_id' => $userChecklist->id, 'file' => $path]);
        }

        $userChecklist->users()->sync($data['assign_to']);

        return response()->json(['message' => 'User Checklist updated successfully'], 200);
    }

    public function start(UserChecklist $userChecklist)
    {
        $is_started = $userChecklist->is_started;
        $userChecklist->update(['is_started' => !$is_started]);
        return response()->json(['message' => 'User Checklist'.$is_started? 'started' : 'paused' .'$userstarted successfully'], 200);
    }
}
