<?php

namespace App\Http\Controllers\Api;

use App\Events\NewNotification;
use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use PhpOffice\PhpSpreadsheet\Calculation\Logical\Boolean;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query()->with(['checklist', 'project', 'assignedUsers']);
        
        if (!auth()->user()->hasRole('Admin')) {
            $query->whereHas('assignedUsers', function ($query) {
                $query->where('user_id', auth()->id());
            });
        }

        if ($request->has('project_id')) {
            $query->where('project_id', $request->input('project_id'));
        }

        // Filter by due date range
        if ($request->has('date')) {
            $date = $request->input('date');
            $dueDateFrom = $date[0];
            $dueDateTo = $date[1];
            $query->whereBetween('due_date', [$dueDateFrom, $dueDateTo]);
        }

        // Filter by priority
        if ($request->has('priority')) {
            $priority = $request->input('priority');
            $query->where('priority', $priority);
        }

        // Filter by status
        if ($request->has('status')) {
            $status = $request->input('status');
            $query->where('status', $status);
        }
        // category_id filter
        if ($request->has('category_id')) {
            $category_id = $request->input('category_id');
            $query->where('category_id', $category_id);
        }
        // user_id filter
        if ($request->has('user_id')) {
            $user_id = $request->input('user_id');
            $query->whereHas('assignedUsers', function ($query) use ($user_id) {
                $query->where('user_id', $user_id);
            });
        }
        // filter for room, area and floor
        if ($request->has('room')) {
            $room = $request->input('room');
            $query->where('room', $room);
        }
        if ($request->has('area')) {
            $area = $request->input('area');
            $query->where('area', $area);
        }
        if ($request->has('floor')) {
            $floor = $request->input('floor');
            $query->where('floor', $floor);
        }
        // show_open filter
        if ($request->has('show_open')) {
            $show_open = $request->input('show_open');
            if ($show_open) {
                $query->where('status', 'open');
            }
        }
        if ($request->has('due_date')) {
            if ($request->due_date == 'true') {
                $query->where('due_date', '<', now());
            }
        }
        $tasks = $query->orderBy('id', 'desc')->paginate(10);
        $tasks = TaskResource::collection($tasks);
        return response()->json([
            'tasks' => $tasks,
            'pagination' => [
                'total' => $tasks->total(),
                'count' => $tasks->count(),
                'per_page' => $tasks->perPage(),
                'current_page' => $tasks->currentPage(),
                'total_pages' => $tasks->lastPage(),
                'has_more_pages' => $tasks->hasMorePages()
            ]
        ]);        // $tasks = Task::all();
        // return response()->json($tasks);
    }
    public function store(Request $request)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to create a task'], 403);
        }
        $data =  $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
            'checklist_id' => 'nullable|integer',
            'category_id' => 'required|string|exists:api_categories,id',
            'project_id' => 'nullable|string|exists:projects,id',
            'priority' => 'required|string',
            'room' => 'nullable|string',
            'floor' => 'nullable|string',
            'area' => 'nullable|string',
            'due_date' => 'nullable|date',
            'img' => 'nullable',
            'user_ids' => 'nullable|array',
            'start_date' => 'nullable|date',
            'is_started' => 'nullable|boolean',
        ]);
        $task = Task::create(Arr::except($data, 'user_ids'));

        if ($request->hasFile('img') && $request->file('img')->isValid()) {
            // Generating a unique file name based on the current timestamp and file extension
            $imageName = time() . '.' . $request->img->extension();

            // Moving the image to a permanent location (e.g., 'public/images')
            $request->img->move(public_path('images'), $imageName);

            // Creating the storage path that will be saved in the database
            $storagePath = 'images/' . $imageName;

            // Assuming you have a model where this data should be stored
            $task->img = $storagePath;
            // Set other properties as needed
            $task->save();

            // Additional handling or response
        }

        if (isset($data['user_ids'])) {
            $task->assignedUsers()->sync($data['user_ids']);
            $this->notifyUsers($data['user_ids']);
        }
        return response()->json($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = Task::with(['checklist', 'project', 'assignedUsers'])->findOrFail($id);
        return response()->json(new TaskResource($task));
    }
    
    public function update(Request $request, $id)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to create a task'], 403);
        }
        $data =  $request->validate([
            'title' => 'required|string',
            'description' => 'nullable|string',
            'status' => 'nullable|string',
            'checklist_id' => 'nullable|integer',
            'category_id' => 'required|string|exists:api_categories,id',
            'project_id' => 'nullable|string|exists:projects,id',
            'priority' => 'required|string',
            'room' => 'nullable|string',
            'floor' => 'nullable|string',
            'area' => 'nullable|string',
            'due_date' => 'nullable|date',
            'img' => 'nullable',
            'user_ids' => 'nullable|array',
            'start_date' => 'nullable|date',
            'is_started' => 'nullable|boolean',
            'img' => 'nullable',
        ]);


        $task = Task::findOrFail($id);
        $task->update(Arr::except($data, 'user_ids'));

        if ($request->hasFile('img') && $request->file('img')->isValid()) {
            $imageName = time() . '.' . $request->img->extension();
            $request->img->move(public_path('images'), $imageName);
            $storagePath = 'images/' . $imageName;
            $task->img = $storagePath;
            $task->save();
        }

        if (isset($data['user_ids'])) {
            $task->assignedUsers()->sync($data['user_ids']);
            $this->notifyUsers($data['user_ids']);
        }
        return response()->json($task);
    }
    public function updateStatus(Request $request, $id)
    {
        $data =  $request->validate([
            'status' => 'nullable|string',
        ]);
        $task = Task::findOrFail($id);
        if($data['status'] == 'in progress'){
            $task->update(['status' => $data['status'], 'start_date'=>  now()]);
            return response()->json("Task status updated successfully");
        }
        $task->update(['status' => $data['status']]);
        return response()->json("Task status updated successfully");
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasRole('Admin')) {
            return response()->json(['message' => 'You are not authorized to create a task'], 403);
        }
        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully']);
    }

    public function notifyUsers ($user_ids)
    {
       $users = User::whereIn('id',$user_ids)->get();
       foreach($users as $user){
            $user->notify(new NewNotification($user,'You have been assigned a new task'));
       }
    }
}
