<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Lending\StoreRequest;
use App\Http\Requests\Lending\UpdateRequest;
use App\Http\Resources\LendingResource;
use App\Models\Lending;
use Illuminate\Http\Request;

class LendingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $lendings = Lending::query()
            ->with(['registeredBy:id,first_name,last_name', 'equipment:id,name,serial_number',   'returnBy:id,first_name,last_name'])
            ->applyFilters($request)
            ->when($request->perPage, function ($query, $perPage) {
                return $query->paginate($perPage);
            }, function ($query) {
                return $query->get();
            });

        return LendingResource::collection($lendings);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Lending\StoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        $user = auth()->user();
        $equipmentId = $request->input('equipment_id');

        // Check if the latest lending record for the given equipment has not been returned
        $latestLending = Lending::where('equipment_id', $equipmentId)
            ->where('returned_at', null)
            ->latest('created_at')
            ->first();

        if ($latestLending) {
            return response()->json([
                'message' => 'This equipment cannot be lent out until the previous lending record is returned.',
            ], 400);
        }

        // Proceed to create a new lending record
        Lending::create(array_merge($request->validated(), ['registered_by' => $user->id]));

        return response()->json(['message' => 'Lending successfully created.'], 200);
    }


    /**
     * Handle the return of the latest lending record for a given equipment.
     *
     * @param  int  $equipmentId
     * @return \Illuminate\Http\Response
     */
    public function returnEquipment(UpdateRequest $request)
    {
        $user = auth()->user();
        $equipmentId = $request->input('equipment_id');

        // Find the latest unreturned lending record for the given equipment
        $lending = Lending::where('equipment_id', $equipmentId)
            ->whereNull('returned_at')
            ->latest('created_at') 
            ->first();

        // If no unreturned lending record is found
        if (!$lending) {
            return response()->json(['message' => 'No active lending record found for this equipment.'], 404);
        }

        // Update the lending record with the current date as returned_at
        $lending->update([
            'returned_at' => now(),
            'return_by' => $user->id, // Set the current authenticated user's ID
        ]);

        return response()->json(['message' => 'Equipment successfully returned.'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lending  $lending
     * @return \Illuminate\Http\Response
     */
    public function show(Lending $lending)
    {
        return new LendingResource($lending);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Lending\UpdateRequest  $request
     * @param  \App\Models\Lending  $lending
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateRequest $request, Lending $lending)
    {
        $lending->update($request->validated());

        return response()->json(['message' => 'Lending successfully updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lending  $lending
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lending $lending)
    {
        $lending->delete();

        return response()->json([
            'message' => 'Lending successfully deleted.',
        ], 200);
    }
}
