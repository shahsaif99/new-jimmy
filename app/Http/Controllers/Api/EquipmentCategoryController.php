<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\EquipmentCategory\Store;
use App\Http\Requests\EquipmentCategory\Update;
use App\Http\Requests\EquipmentCategory\Get;
use App\Http\Resources\EquipmentCategoryResource;
use App\Models\EquipmentCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EquipmentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */ public function index(Get $request)
    {
        // Get validated query parameters
        $validated = $request->validated();

        $query = EquipmentCategory::query();

        // If search parameter exists, filter by category name
        if (isset($validated['search']) && $validated['search'] !== '') {
            $query->where('name', 'like', '%' . $validated['search'] . '%');
        }

        // Apply pagination with a maximum limit for per_page
        $perPage = min($validated['per_page'] ?? 10, 100); // Max per page: 100
        $categories = $query->orderBy('created_at', 'desc')->paginate($perPage);

        // Return paginated categories using a resource collection
        return EquipmentCategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        EquipmentCategory::create($data);

        return response()->json([
            'message' => 'Category successfully created.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Update $request, EquipmentCategory $equipment_category)
    {
        $data = $request->validated();
        $equipment_category->update($data);

        return response()->json([
            'message' => 'Category successfully updated.'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(EquipmentCategory $equipment_category)
    {
        $equipment_category->delete();

        return response()->json([
            'message' => 'Category successfully deleted.'
        ], 200);
    }
}
