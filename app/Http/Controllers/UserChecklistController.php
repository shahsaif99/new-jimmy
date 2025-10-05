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
        // Validate incoming request data
        $data = $request->validate([
            'assign_to'        => 'required|array',
            'checklist'        => 'required',
            'description'      => 'nullable',
            'files'            => 'nullable',
            'name'             => 'nullable',
            'priority'         => 'nullable',
            'work_location'    => 'nullable',
            'work_order'       => 'nullable',


        ]);

        // Create a new checklist
        $checklist = UserChecklist::create([
            'checklist_id'        => $data['checklist'],
            'description'      => $data['description'],
            'name'             => $data['name'],
            'priority'         => $data['priority'],
            'work_location'    => \json_encode($data['work_location']),
            'work_order'       => $data['work_order'],

        ]);
        foreach ($data['files'] as $file) {
            $this->convertImage($file, 'attachments/user_checklist_' . \strtotime(now()) . $checklist->id . '.png');
            UserChecklistFile::create(['user_checklist_id' => $checklist->id,'file' => 'attachments/user_checklist_' . \strtotime(now()) . $checklist->id . '.png']);
        }

        $checklist->users()->sync($data['assign_to']);

        return response()->json(['message' => 'User Checklist created successfully'], 201);
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
    public function update (Request $request,UserChecklist $userChecklist)
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


        ]);

        // Create a new checklist
        $userChecklist->update([
            'checklist_id'     => $data['checklist'],
            'description'      => $data['description'],
            'name'             => $data['name'],
            'priority'         => $data['priority'],
            'work_location'    => \json_encode($data['work_location']),
            'work_order'       => $data['work_order'],

        ]);
        foreach ($data['files'] as $file) {
            $this->convertImage($file, 'attachments/user_checklist_' . \strtotime(now()) . $userChecklist->id . '.png');
            UserChecklistFile::create(['user_checklist_id' => $userChecklist->id,'file' => 'attachments/user_checklist_' . \strtotime(now()) . $userChecklist->id . '.png']);
        }

        $userChecklist->users()->sync($data['assign_to']);

        return response()->json(['message' => 'User Checklist created successfully'], 201);
    }

    public function start(UserChecklist $userChecklist)
    {
        $is_started = $userChecklist->is_started;
        $userChecklist->update(['is_started' => !$is_started]);
        return response()->json(['message' => 'User Checklist'.$is_started? 'started' : 'paused' .'$userstarted successfully'], 200);
    }
}
