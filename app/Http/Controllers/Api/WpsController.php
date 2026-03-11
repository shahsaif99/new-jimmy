<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Wps\StoreRequest;
use App\Http\Resources\WpsResource;
use App\Models\Wps;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Plank\Mediable\Facades\MediaUploader;

class WpsController extends Controller
{
    public function index(Request $request)
    {
        $wps = Wps::with(['project', 'preparedByUser'])
            ->search($request->search)
            ->applyFilters($request)
            ->when($request->perPage, fn($query, $perPage) => $query->paginate($perPage), fn($query) => $query->get());

        return WpsResource::collection($wps);
    }

    public function store(StoreRequest $request)
    {
        $wps = Wps::create($request->validated());

        if ($request->hasFile('attachment')) {
            $media = MediaUploader::fromSource($request->file('attachment'))
                ->useOriginalFilename()
                ->toDirectory('wps/' . $wps->id)
                ->upload();

            $wps->attachMedia($media, 'attachment');
        }

        return response()->json([
            'message' => 'WPS successfully created.',
            'data' => new WpsResource($wps->load(['project', 'preparedByUser'])),
        ], 201);
    }

    public function show(Wps $wp)
    {
        return response()->json([
            'message' => 'WPS retrieved successfully.',
            'data' => new WpsResource($wp->load(['project', 'preparedByUser'])),
        ]);
    }

    public function update(Request $request, Wps $wp)
    {
        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'wpqr' => ['nullable', 'string', 'max:255'],
            'welding_process' => ['sometimes', 'required', 'string'],
            'material_group' => ['sometimes', 'required', 'string'],
            'welding_position' => ['nullable', 'array'],
            'joint_type' => ['nullable', 'array'],
            'thickness_min' => ['nullable', 'string', 'max:20'],
            'thickness_max' => ['nullable', 'string', 'max:20'],
            'diameter_min' => ['nullable', 'string', 'max:20'],
            'diameter_max' => ['nullable', 'string', 'max:20'],
            'layer' => ['nullable', 'string'],
            'sides' => ['nullable', 'string'],
            'standard' => ['nullable', 'array'],
            'ref_spec' => ['nullable', 'array'],
            'prepared_date' => ['nullable', 'date'],
            'prepared_by' => ['nullable', 'exists:users,id'],
            'project_id' => ['nullable', 'exists:projects,id'],
            'remove_media' => ['nullable', 'array'],
            'remove_media.*' => ['integer'],
        ]);

        $removeMediaIds = $validated['remove_media'] ?? [];
        unset($validated['remove_media']);

        $wp->update($validated);

        // Remove requested media
        if (!empty($removeMediaIds)) {
            $mediaToRemove = $wp->getMedia('attachment')->whereIn('id', $removeMediaIds);
            foreach ($mediaToRemove as $media) {
                $media->delete();
            }
            $wp->detachMedia($mediaToRemove, 'attachment');
        }

        if ($request->hasFile('attachment')) {
            $media = MediaUploader::fromSource($request->file('attachment'))
                ->useOriginalFilename()
                ->toDirectory('wps/' . $wp->id)
                ->upload();

            $wp->attachMedia($media, 'attachment');
        }

        return response()->json([
            'message' => 'WPS successfully updated.',
            'data' => new WpsResource($wp->fresh()->load(['project', 'preparedByUser'])),
        ]);
    }

    public function destroy(Wps $wp)
    {
        $wp->delete();

        return response()->json(['message' => 'WPS successfully deleted.']);
    }

    public function addToProject(Request $request, Wps $wp)
    {
        $request->validate([
            'project_id' => ['required', 'exists:projects,id'],
        ]);

        $wp->update(['project_id' => $request->project_id]);

        return response()->json([
            'message' => 'WPS successfully added to project.',
            'data' => new WpsResource($wp->load(['project', 'preparedByUser'])),
        ]);
    }

    public function removeFromProject(Wps $wp)
    {
        $wp->update(['project_id' => null]);

        return response()->json([
            'message' => 'WPS successfully removed from project.',
        ]);
    }
}
