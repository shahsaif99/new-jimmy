<?php

namespace App\Http\Controllers\Api;

use App\Traits\Upload;
use App\Models\Equipment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
        $equipments = Equipment::query()
            ->with('project:id,name', 'media')
            ->search($request->q)
            ->applyFilters($request)
            ->when($request->perPage, function ($query, $perPage) {
                return $query->paginate($perPage);
            }, function ($query) {
                return $query->get();
            });

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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Equipment  $equipment
     * @return \Illuminate\Http\Response
     */
    public function show(Equipment $equipment)
    {
        //
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
        $equipment->update($request->validated());

        // if ($request->hasFile('files')) {
        //     if ($equipment->media->count() > 0) {
        //         $equipment->media->each(function ($media) {
        //             $media->delete();
        //         });
        //     }
        // }

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
