<?php

namespace App\Http\Controllers\Api;

use App\Traits\Upload;
use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\EquipmentResource;
use Plank\Mediable\Facades\MediaUploader;
use App\Http\Requests\Equipment\StoreRequest;
use App\Http\Requests\Equipment\UpdateRequest;

class EquipmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $validated = $request->validate([
            'q' => 'nullable|string|max:255',
            'perPage' => 'nullable|integer|min:1|max:100',
        ]);

        $equipments = Equipment::query()
            ->with([
                'media',
                'category:id,name',
                'storageLocation:id,name',
                'checklist',
                'procedure',
                'latestLog'
            ])
            ->search($validated['q'] ?? null)
            ->applyFilters($request)
            ->when($request->perPage, function ($query, $perPage) {
                return $query->paginate($perPage);
            }, function ($query) {
                return $query->get();
            });

        $equipments->each(function ($equipment) {
            if ($equipment->media) {
                $equipment->media->each(function ($media) {
                    $media->url = Storage::disk($media->disk)->url($media->directory . '/' . $media->filename . '.' . $media->extension);
                });
            }
        });

        // Transform to include the status
        return EquipmentResource::collection($equipments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {

        $data = $request->validated();

        if ($request->image) {
            $avatar = Upload::uploadBase64Avatar($request->image, 'equipment');
            $data['image'] = $avatar;
        }

        $equipment = Equipment::create($data);

        if ($request->hasFile('files')) {
            $this->uploadDocuments($request, $equipment);
        }

        return response()->json([
            'message' => 'Equipment successfully created.',
        ], 200);
    }


    public function show(Equipment $equipment) {}

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function getDetails(string $tool_id)
    {
        // Validate the tool_id input
        if (empty($tool_id) || !preg_match('/^[A-Za-z0-9-]{1,50}$/', $tool_id)) {
            return response()->json([
                'error' => 'Invalid input',
            ], 400);
        }

        // Find the equipment by tool_id
        $equipment = Equipment::query()
            ->with([
                'media',
                'category:id,name',
                'storageLocation:id,name',
                'checklist',
                'procedure',
                'latestLog',
            ])
            ->where('tool_id', $tool_id)
            ->firstOrFail();

        $equipment->each(function ($equipment) {
            if ($equipment->media) {
                $equipment->media->each(function ($media) {
                    $media->url = Storage::disk($media->disk)->url($media->directory . '/' . $media->filename . '.' . $media->extension);
                });
            }
        });

        // Return the equipment as a resource
        return new EquipmentResource($equipment);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */

    public function update(UpdateRequest $request, Equipment $equipment)
    {
        $data = $request->validated();

        if ($request->image) {
            Storage::disk('public')->delete('equipment/' . $equipment->image);
            $avatar = Upload::uploadBase64Avatar($request->image, 'equipment');
            $data['image'] = $avatar;
        }

        $equipment->update($data);

        if ($request->has('files_to_delete') && is_array($request->files_to_delete)) {
            foreach ($request->files_to_delete as $fileName) {
                $media = $equipment->getMedia('equipment')->where('filename', $fileName)->first();
                if ($media) {
                    $media->delete();
                }
            }
        }

        if ($request->hasFile('files')) {
            $this->uploadDocuments($request, $equipment);
        }

        return response()->json(['message' => 'Equipment successfully updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Equipment $equipment)
    {
        $equipment->delete();

        return response()->json([
            'message' => 'Equipment successfully deleted.',
        ], 200);
    }

    public function uploadDocuments(Request $request, Equipment $equipment)
    {

        foreach ($request->file('files') as $file) {
            // Save the file to the specified disk
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('equipment/' . $equipment->id)
                ->upload();

            $equipment->attachMedia($media, 'equipment');
        }
    }
}
