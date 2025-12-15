<?php

namespace App\Http\Controllers\Api;

use App\Models\Document;
use App\Models\AvvikListing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AvvikListing\Store;
use App\Http\Requests\AvvikListing\Update;
use App\Http\Resources\AvvikListingsResource;
use Plank\Mediable\Facades\MediaUploader;
use Illuminate\Support\Facades\Storage;

class AvvikListingsController extends Controller
{
    //

    public function index(Request $request){
        $user = auth()->user();

        $avvikListings = AvvikListing::query()
        ->with(['user', 'project'])
        ->when(!$user->hasRole(['Admin', 'Super Admin']), function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->applyFilters($request)
        ->latest()
        ->get();

        return  AvvikListingsResource::collection($avvikListings);
    }

    public function store(Store $request){

        $data = $request->validated();
        $data['user_id'] = json_decode($request->validated()['user'], true)['id'];
        $data['project_id'] = json_decode($request->validated()['project'], true)['id'];

        // Handle supplier and equipment IDs
        if (isset($data['supplier']) && $data['supplier']) {
            $supplier = json_decode($data['supplier'], true);
            $data['supplier_id'] = $supplier['id'] ?? null;
        }
        if (isset($data['equipment']) && $data['equipment']) {
            $equipment = json_decode($data['equipment'], true);
            $data['equipment_id'] = $equipment['id'] ?? null;
        }

        // Handle closed_by ID
        if (isset($data['closed_by']) && $data['closed_by']) {
            $closedBy = json_decode($data['closed_by'], true);
            $data['closed_by_id'] = $closedBy['id'] ?? null;
        }

        $avvikListing = AvvikListing::create($data);

        // Handle file uploads
        if ($request->hasFile('files')) {
            $this->uploadDocuments($request, $avvikListing);
        }

        return response()->json([
            'message' => 'Avvik Ruh successfully created.',
        ], 200);
    }

    public function update(Update $request,  $avvikId){

        $data = $request->validated();
        $data['user_id'] = json_decode($request->validated()['user'], true)['id'];
        $data['project_id'] = json_decode($request->validated()['project'], true)['id'];

        // Handle supplier and equipment IDs
        if (isset($data['supplier']) && $data['supplier']) {
            $supplier = json_decode($data['supplier'], true);
            $data['supplier_id'] = $supplier['id'] ?? null;
        } else {
            $data['supplier_id'] = null;
        }
        if (isset($data['equipment']) && $data['equipment']) {
            $equipment = json_decode($data['equipment'], true);
            $data['equipment_id'] = $equipment['id'] ?? null;
        } else {
            $data['equipment_id'] = null;
        }

        // Handle closed_by ID
        if (isset($data['closed_by']) && $data['closed_by']) {
            $closedBy = json_decode($data['closed_by'], true);
            $data['closed_by_id'] = $closedBy['id'] ?? null;
        } else {
            $data['closed_by_id'] = null;
        }

        $avvikData = AvvikListing::findOrFail($avvikId);

        $avvikData->update($data);

        // Handle file deletions
        if ($request->has('files_to_delete') && is_array($request->files_to_delete)) {
            foreach ($request->files_to_delete as $fileName) {
                $media = $avvikData->getMedia('avvik_documents')->where('filename', $fileName)->first();
                if ($media) {
                    $media->delete();
                }
            }
        }

        // Handle file uploads
        if ($request->hasFile('files')) {
            $this->uploadDocuments($request, $avvikData);
        }

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
        $avvikData = AvvikListing::query()->with(['user', 'project', 'supplier', 'equipment', 'closedBy', 'media'])->findOrFail($avvikId);

        // Add URLs to media files
        if ($avvikData->media) {
            $avvikData->media->each(function ($media) {
                $media->url = Storage::disk($media->disk)->url($media->directory . '/' . $media->filename . '.' . $media->extension);
            });
        }

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

        $avvikCritic = $avvikListings->where('severity', 'Critical')->count();


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

    /**
     * Upload documents for an avvik listing.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AvvikListing  $avvikListing
     * @return void
     */
    public function uploadDocuments(Request $request, AvvikListing $avvikListing)
    {
        foreach ($request->file('files') as $file) {
            // Save the file to the specified disk
            $media = MediaUploader::fromSource($file)
                ->useOriginalFilename()
                ->toDirectory('avvik_listings/' . $avvikListing->id)
                ->upload();

            $avvikListing->attachMedia($media, 'avvik_documents');
        }
    }
}
