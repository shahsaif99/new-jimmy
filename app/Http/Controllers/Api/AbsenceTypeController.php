<?php

namespace App\Http\Controllers\Api;

use App\Models\AbsenceType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\AbsenceTypeResource;

class AbsenceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $absenceTypes = AbsenceType::query()
        ->search($request->q)
        ->when($request->perPage, function ($query, $perPage) {
            return $query->paginate($perPage);
        }, function ($query) {
            return $query->get();
        });

        return AbsenceTypeResource::collection($absenceTypes);
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

        AbsenceType::create($data);

        return response()->json([
            'message' => 'Absence Type successfully created.',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AbsenceType  $absenceType
     * @return \Illuminate\Http\Response
     */
    public function show(AbsenceType $absenceType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AbsenceType  $absenceType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AbsenceType $absenceType)
    {
        $data = $request->validate([
            'name' => ['required', 'unique:absence_types,name,'.$absenceType->id]
        ]);

        $absenceType->update($data);

        return response()->json([
            'message' => 'Absence Type successfully updated.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AbsenceType  $absenceType
     * @return \Illuminate\Http\Response
     */
    public function destroy(AbsenceType $absenceType)
    {
        $absenceType->delete();

        return response()->json([
            'message' => 'Absence Type successfully updated.',
        ], 200);
    }
}
