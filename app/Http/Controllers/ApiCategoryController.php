<?php

namespace App\Http\Controllers;

use App\Http\Requests\ApiCategory\Store;
use App\Http\Requests\ApiCategory\Update;
use App\Http\Resources\CategoryResource;
use App\Models\ApiCategory;
use Illuminate\Http\Request;

class ApiCategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = ApiCategory::all();
        return CategoryResource::collection($categories);
    }
    public function store(Store $request)
    {
        $data = $request->validated();
        ApiCategory::create($data);

        return response()->json([
            'message' => 'Category successfully created.'
        ], 200);
    }
    public function update(Update $request, ApiCategory $api_category)
    {
        $data = $request->validated();
        $api_category->update($data);

        return response()->json(['message' => 'Category successfully updated.'], 200);
    }

    public function destroy(ApiCategory $api_category)
    {
        $api_category->delete();
        return response()->json([
            'message' => 'Category successfully deleted.',
        ], 200);
    }
}
