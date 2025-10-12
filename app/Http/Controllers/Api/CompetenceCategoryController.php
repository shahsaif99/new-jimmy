<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompetenceCategory;
use Illuminate\Http\Request;

class CompetenceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = CompetenceCategory::orderBy('name')->get();
        return response()->json(['data' => $categories], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:competence_categories,name',
        ]);

        $category = CompetenceCategory::create($request->only('name'));

        return response()->json([
            'message' => 'Category successfully created.',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = CompetenceCategory::findOrFail($id);
        return response()->json(['data' => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $category = CompetenceCategory::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255|unique:competence_categories,name,' . $id,
        ]);

        $category->update($request->only('name'));

        return response()->json([
            'message' => 'Category successfully updated.',
            'data' => $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category = CompetenceCategory::findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Category successfully deleted.',
        ], 200);
    }
}
