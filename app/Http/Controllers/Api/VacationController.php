<?php

namespace App\Http\Controllers\Api;

use App\Models\Vacation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\VacationResource;
use App\Http\Requests\Vacation\StoreRequest;

class VacationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $vacations = Vacation::query()
        ->with(['approvedBy:id,first_name,last_name'])
        ->applyFilters($request)
        ->when($request->perPage, function ($query, $perPage) {
            return $query->paginate($perPage);
        }, function ($query) {
            return $query->get();
        });

        return VacationResource::collection($vacations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
       Vacation::create($request->validated());

       return response()->json(['message' => 'Vacation successfully created.'],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vacation  $vacation
     * @return \Illuminate\Http\Response
     */
    public function show(Vacation $vacation)
    {
        $vacation->load('user');

        return new VacationResource($vacation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vacation  $vacation
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRequest $request, Vacation $vacation)
    {
        $vacation->update($request->validated());

        return response()->json(['message' => 'Vacation successfully updated.'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vacation  $vacation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vacation $vacation)
    {
        //
        $vacation->delete();

        return response()->json(['message' => 'Vacation request successfully deleted.'],200);

    }

    // public function absenceStatistics()
    // {
    //     $vacations = Vacation::query()
    //     ->select([DB::raw("SUM(days) as total_days"), 'type'])
    //     ->groupBy('type')
    //     ->get()->keyBy('type');

    //     return VacationResource::collection($vacations);

    // }
}
