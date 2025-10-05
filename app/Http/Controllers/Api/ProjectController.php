<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Project\StoreRequest;
use App\Http\Requests\Project\UpdateRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectShowResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Plank\Mediable\Facades\MediaUploader;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $projects = Project::with(['customer', 'projectManager', 'projectHseManager'])
            ->search($request->search)
            ->applyFilters($request)
            ->when($request->perPage, fn($query, $perPage) => $query->paginate($perPage), fn($query) => $query->get());

        return ProjectResource::collection($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $project = Project::create($request->validated());

        return response()->json([
            'message' => 'Project successfully created.',
            'data' => new ProjectResource($project),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $project = Project::withCount('tasks')->findOrFail($id); // Preload task count
    
        return response()->json([
            'message' => 'Project retrieved successfully',
            'data' => new ProjectShowResource($project),
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, Project $project)
    {
        $project->update($request->validated());

        return response()->json([
            'message' => 'Project successfully updated.',
            'data' => new ProjectResource($project),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Project successfully deleted.'], 200);
    }

    /**
     * Upload documents for the project.
     */
    public function uploadDocuments(Request $request, Project $project)
    {
        if (!$request->hasFile('files')) {
            return response()->json(['message' => 'No files uploaded.'], 400);
        }

        foreach ($request->file('files') as $file) {
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('project/' . $project->id)
                ->upload();

            $project->attachMedia($media, 'document');
        }

        return response()->json(['message' => 'Project Documents successfully uploaded.'], 200);
    }
}
