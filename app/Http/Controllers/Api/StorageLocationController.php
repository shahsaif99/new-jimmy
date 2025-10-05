<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\StorageLocation\Get;
use App\Http\Requests\StorageLocation\Store;
use App\Http\Requests\StorageLocation\Update;
use App\Http\Resources\StorageLocationResource;
use App\Models\StorageLocation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StorageLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Get $request)
    {
        // Get validated query parameters
        $validated = $request->validated();

        $query = StorageLocation::query();

        // If search parameter exists, filter by location name
        if (!empty($validated['search'])) {
            $query->where('name', 'like', '%' . $validated['search'] . '%');
        }

        // Apply pagination
        $perPage = $validated['per_page'] ?? 10;
        $locations = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Return paginated storage locations using a resource collection
        return StorageLocationResource::collection($locations);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        StorageLocation::create($data);

        return response()->json([
            'message' => 'Storage location successfully created.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Update $request, StorageLocation $storageLocation)
    {
        $data = $request->validated();
        $storageLocation->update($data);

        return response()->json([
            'message' => 'Storage location successfully updated.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StorageLocation $storageLocation)
    {
        $storageLocation->delete();

        return response()->json([
            'message' => 'Storage location successfully deleted.'
        ], 200);
    }
}
