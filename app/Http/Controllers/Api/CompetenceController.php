<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Competence\StoreRequest;
use App\Http\Requests\Competence\UpdateRequest;
use App\Http\Resources\CompetenceResource;
use App\Models\Competence;
use App\Models\User;
use Illuminate\Http\Request;
use Plank\Mediable\Facades\MediaUploader;

class CompetenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $competences = User::query()
        ->select('id','first_name','last_name')
        ->has('competences')
        ->with(['competences' => ['competence' => ['media']]])
        ->search($request->q)
        ->applyFilters($request)
        ->role('Employee')
        ->get()
        ->when($request->group, function($query){
            $query->transform(function($item, $key){
                 return [
                     'mode' => 'span',
                     'label' => $item->first_name . ' ' . $item->last_name,
                     'children' => $item->competences
                 ];
             });

         });

        return CompetenceResource::collection($competences);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        // dd($request->all());

        // dd(json_decode($request->employees));

        $competence = Competence::create($request->validated());

        if($request->hasFile('files')){

            $this->uploadDocuments($request, $competence);
        }

        $employees = User::whereIn('id', json_decode($request->employees))->get();

        $competence->employees()->saveMany($employees);

        return response()->json(['message' => 'Competence successfully created.'],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Competence  $competence
     * @return \Illuminate\Http\Response
     */
    public function show(Competence $competence)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Competence  $competence
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Competence $competence)
    {
        $competence->update($request->validated());

        return response()->json(['message' => 'Competence successfully updated.'], 200);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Competence  $competence
     * @return \Illuminate\Http\Response
     */
    public function destroy(Competence $competence)
    {
        // $competence->employees()->delete();

        return response()->json([
            'message' => 'Competence successfully deleted.',
        ], 200);
    }

    public function uploadDocuments(Request $request, Competence $competence)
    {

        foreach ($request->file('files') as $file) {
            // Save the file to the specified disk
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('competence/' . $competence->id)
                ->upload();

            $competence->attachMedia($media, 'competence');
        }

        return response()->json([
            'message' => 'Competence Documents successfully uploaded.',
        ], 200);

    }
}
