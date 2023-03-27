<?php

namespace App\Http\Controllers\Api;

use App\Models\RuhType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RuhTypeResource;

class RuhTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $ruhTypes = RuhType::query()
        ->search($request->q)
        ->when($request->perPage, function ($query, $perPage) {
            return $query->paginate($perPage);
        }, function ($query) {
            return $query->get();
        });

        return RuhTypeResource::collection($ruhTypes);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'unique:absence_types']
        ]);

        RuhType::create($data);

        return response()->json([
            'message' => 'Ruh Type successfully created.',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\RuhType  $ruhType
     * @return \Illuminate\Http\Response
     */
    public function show(RuhType $ruhType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RuhType  $ruhType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, RuhType $ruhType)
    {
        $data = $request->validate([
            'name' => ['required', 'unique:ruh_types,name,'.$ruhType->id]
        ]);

        $ruhType->update($data);

        return response()->json([
            'message' => 'Ruh Type successfully updated.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RuhType  $ruhType
     * @return \Illuminate\Http\Response
     */
    public function destroy(RuhType $ruhType)
    {
        $ruhType->delete();

        return response()->json([
            'message' => 'Ruh Type successfully updated.',
        ], 200);
    }
}
