<?php

namespace App\Http\Controllers\Api;

use App\Traits\Upload;
use App\Models\Handbook;
use Illuminate\Http\Request;
use App\Models\HandbookChapter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Handbook\Store;
use App\Http\Requests\Handbook\Update;
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
            // ->with('project:id,name', 'media')
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
    public function store(Store $request)
    {

        $data = $request->validated();
        $handbook = Handbook::create($data);

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
        return new HandbookResource($handbook);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Handbook  $handbook
     * @return \Illuminate\Http\Response
     */

    public function update(Update $request, Handbook $handbook)
    {
        $data = $request->validated();

        // if ($request->image) {
        //     Storage::disk('public')->delete('handbook/'.$handbook->image);
        //     $avatar = Upload::uploadBase64Avatar($request->image, 'handbook');
        //     $data['image'] = $avatar;
        // }

        $handbook->update($data);

        // if ($request->hasFile('files')) {
        //     $this->uploadDocuments($request, $handbook);
        // }

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

    // createHandbookChapter
    public function createHandbookChapter(Request $request, $handbookId)
    {
        $data = $request->validate([
            'chapter' => ['required'],
            'content' => ['required'],
            'title' => ['required'],
        ]);

        $data['handbook_id'] = $handbookId;
        HandbookChapter::create($data);

        return response()->json([
            'message' => 'Chapter successfully created.',
        ], 200);
    }

    // updateHandbookChapter
    public function updateHandbookChapter(Request $request, $handbookChapterId)
    {
        $data = $request->validate([
            'chapter' => ['required'],
            'content' => ['required'],
            'title' => ['required'],
        ]);

        $chapter = HandbookChapter::find($handbookChapterId);
        $chapter->update($data);

        return response()->json([
            'message' => 'Chapter successfully updated.',
        ], 200);
    }

    // getHandbookChapters group by chapter name and return as array
    public function getHandbookChapters(Request $request)
    {
        $chapters = HandbookChapter::query()
            ->where('handbook_id', $request->handbook_id)
            ->search($request->q)
            ->get()
            ->groupBy('chapter');

        return $chapters;
    }
}
