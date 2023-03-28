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

    public function avvikStatistics(Request $request){

        $avvikListings = AvvikListing::query()
        ->get();

        $total = $avvikListings->count();

        $avvikHendelse = $avvikListings->where('type', 'Uønsket hendelse')->count();
        $avvik = $avvikListings->where('type', 'Avvik')->count();

        // filter date_closed is null
        $avvikOpen = $avvikListings->where('close_date', null)->count();

        $avvikCritic = $avvikListings->where('severity', 'kritisk')->count();


        // 6 months of monthly data from current month
        $avvikListingsMonthlyDeviation = [];
        $avvikListingsMonthlyUnwantedInnciednt = [];
        $avvikListingsMonthlyLabels = [];

        for ($i = 0; $i < 6; $i++) {
            $avvikListingsMonthlyLabels[] = date('M', strtotime("-$i months"));
            $month = date('m', strtotime("-$i months"));
            $year = date('Y', strtotime("-$i months"));
            $avvikListingsMonthlyDeviation[] = $avvikListings->where('created_at', '>=', $year . '-' . $month . '-01 00:00:00')
                ->where('created_at', '<=', $year . '-' . $month . '-31 23:59:59')
                ->where('type', 'Avvik')
                ->count();

                $avvikListingsMonthlyUnwantedInnciednt[] = $avvikListings->where('created_at', '>=', $year . '-' . $month . '-01 00:00:00')
                ->where('created_at', '<=', $year . '-' . $month . '-31 23:59:59')
                ->where('type', 'Uønsket hendelse')
                ->count();


        }
        $avvikListingsMonthlyDeviation = array_reverse($avvikListingsMonthlyDeviation);
        $avvikListingsMonthlyUnwantedInnciednt = array_reverse($avvikListingsMonthlyUnwantedInnciednt);

        // generate labels for the last 6 months

        $avvikListingsMonthlyLabels = array_reverse($avvikListingsMonthlyLabels);


        return response()->json([
            'avvikHendelse' => $avvikHendelse,
            'avvikListingsMonthlyDeviation' => $avvikListingsMonthlyDeviation,
            'avvikListingsMonthlyUnwantedInnciednt' => $avvikListingsMonthlyUnwantedInnciednt,
            'avvikListingsMonthlyLabels' => $avvikListingsMonthlyLabels,
            'avvik' => $avvik,
            'total' => $total,
            'avvikOpen' => $avvikOpen,
            'avvikCritic' => $avvikCritic,
        ], 200);
    }
}
