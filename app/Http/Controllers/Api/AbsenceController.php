<?php

namespace App\Http\Controllers\Api;

use App\Models\Absence;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Resources\AbsenceResource;
use App\Http\Requests\Absence\StoreRequest;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->filled('range') && !str_contains($request->range, 'to')) {
            return response()->json([
                'message' => 'Invalid date format. Please select date in range',
            ], 500);
        }
        $absences = Absence::query()
        ->with(['user:id,first_name,last_name'])
        ->applyFilters($request)
        ->when($request->perPage, function ($query, $perPage) {
            return $query->paginate($perPage);
        }, function ($query) {
            return $query->get();
        });

        return AbsenceResource::collection($absences);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
       Absence::create($request->validated());

       return response()->json(['message' => 'Absence successfully created.'],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function show(Absence $absence)
    {
        $absence->load('user');

        return new AbsenceResource($absence);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRequest $request, Absence $absence)
    {
        $absence->update($request->validated());

        return response()->json(['message' => 'Absence successfully updated.'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Absence  $absence
     * @return \Illuminate\Http\Response
     */
    public function destroy(Absence $absence)
    {
        //
        $absence->delete();

        return response()->json(['message' => 'Absence request successfully deleted.'],200);

    }

    public function absenceStatistics()
    {
        $absences = Absence::query()
        ->select([DB::raw("SUM(days) as total_days"), 'type'])
        ->groupBy('type')
        ->get()->keyBy('type');
        return AbsenceResource::collection($absences);

    }

    public function absenceStatusUpdate(Request $request, Absence $absence){

        $absence->update([
            'status' => $request->status,
            'approved_by' => auth()->user()->first_name. ' ' . auth()->user()->last_name,
            'approved_date' => date('Y-m-d')
        ]);

        return response()->json(['message' => 'Absence request successfully'. ucwords($request->status)],200);
    }
}
