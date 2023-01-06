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
            ->with(['registeredBy:id,first_name,last_name', 'equipment:id,name,serial_number'])
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
        Lending::create(array_merge($request->validated(), ['registered_by' => auth()->id()]));

        return response()->json(['message' => 'Lending successfully created.'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lending  $lending
     * @return \Illuminate\Http\Response
     */
    public function show(Lending $lending)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
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
