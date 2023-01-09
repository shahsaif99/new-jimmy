<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\BoardInformation;
use App\Models\InformationBoard;
use App\Http\Controllers\Controller;
use App\Http\Resources\BoardInformationResource;

class BoardInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $items = InformationBoard::query()
        ->with('user:id,first_name,last_name')
        ->search($request->q)
            ->when($request->perPage, function ($query, $perPage) {
                return $query->paginate($perPage);
            }, function ($query) {
                return $query->get();
            });

        return BoardInformationResource::collection($items);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        InformationBoard::create(array_merge($request->all(), ['user_id' => auth()->id()]));

        return response()->json([
            'message' => 'Information successfully added.',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BoardInformation  $boardInformation
     * @return \Illuminate\Http\Response
     */
    public function show(InformationBoard $boardInformation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BoardInformation  $boardInformation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, InformationBoard $boardInformation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BoardInformation  $boardInformation
     * @return \Illuminate\Http\Response
     */
    public function destroy(InformationBoard $boardInformation)
    {
        //
    }
}
