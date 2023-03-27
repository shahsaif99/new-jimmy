<?php

namespace App\Http\Controllers\Api;

use App\Traits\Upload;
use App\Models\Handbook;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\HandbookResource;
use Plank\Mediable\Facades\MediaUploader;
use App\Http\Requests\Handbook\StoreRequest;
use App\Http\Requests\Handbook\UpdateRequest;

class HandbookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $handbooks = Handbook::query()
            ->with('project:id,name', 'media')
            // ->search($request->q)
            // ->applyFilters($request)
            ->when($request->perPage, function ($query, $perPage) {
                return $query->paginate($perPage);
            }, function ($query) {
                return $query->get();
            });

        return HandbookResource::collection($handbooks);
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
            $avatar = Upload::uploadBase64Avatar($request->image, 'handbook');
            $data['image'] = $avatar;
        }

        $handbook = Handbook::create($data);

        if ($request->hasFile('files')) {
            $this->uploadDocuments($request, $handbook);
        }

        return response()->json([
            'message' => 'Handbook successfully created.',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Handbook  $handbook
     * @return \Illuminate\Http\Response
     */
    public function show(Handbook $handbook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Handbook  $handbook
     * @return \Illuminate\Http\Response
     */

    public function update(UpdateRequest $request, Handbook $handbook)
    {
        $data = $request->validated();

        if ($request->image) {
            Storage::disk('public')->delete('handbook/'.$handbook->image);
            $avatar = Upload::uploadBase64Avatar($request->image, 'handbook');
            $data['image'] = $avatar;
        }

        $handbook->update($data);

        if ($request->hasFile('files')) {
            $this->uploadDocuments($request, $handbook);
        }

        return response()->json(['message' => 'Handbook successfully updated.'], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Handbook  $handbook
     * @return \Illuminate\Http\Response
     */
    public function destroy(Handbook $handbook)
    {
        $handbook->delete();

        return response()->json([
            'message' => 'Handbook successfully deleted.',
        ], 200);
    }

    public function uploadDocuments(Request $request, Handbook $handbook)
    {

        foreach ($request->file('files') as $file) {
            // Save the file to the specified disk
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('handbook/' . $handbook->id)
                ->upload();

            $handbook->attachMedia($media, 'handbook');
        }

    }
}
