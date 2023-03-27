<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use App\Models\AvvikListing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvvikListing\Store;
use App\Http\Requests\AvvikListing\Update;
use App\Http\Resources\AvvikListingsResource;

class AvvikListingsController extends Controller
{
    //

    public function index(Request $request){

        $avvikListings = AvvikListing::query()
        ->with(['user', 'project'])
        ->applyFilters($request)
        ->latest()
        ->get();

        return  AvvikListingsResource::collection($avvikListings);
    }

    public function store(Store $request){

        $data = $request->validated();
        $data['user_id'] = $request->validated()['user']['id'];
        $data['project_id'] = $request->validated()['project']['id'];

        AvvikListing::create($data);

        return response()->json([
            'message' => 'Avvik Ruh successfully created.',
        ], 200);
    }

    public function update(Update $request,  $avvikId){

        $data = $request->validated();
        $data['user_id'] = $request->validated()['user']['id'];
        $data['project_id'] = $request->validated()['project']['id'];

        $avvikData = AvvikListing::findOrFail($avvikId);

        $avvikData->update($data);

        return response()->json([
            'message' => 'Avvik Ruh successfully updated.',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BoardInformation  $boardInformation
     * @return \Illuminate\Http\Response
     */
    public function show($avvikId)
    {
        $avvikData = AvvikListing::query()->with(['user', 'project'])->findOrFail($avvikId);

        return new AvvikListingsResource($avvikData);
    }

     /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AvvikListing  $avvikId
     * @return \Illuminate\Http\Response
     */
    public function destroy($avvikId)
    {
        $avvikData = AvvikListing::findOrFail($avvikId);
        $avvikData->delete();

        return response()->json([
            'message' => 'Avvik Ruh successfully deleted.',
        ], 200);
    }
}
