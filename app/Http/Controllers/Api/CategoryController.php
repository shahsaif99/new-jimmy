<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\Store;
use App\Http\Requests\Category\Update;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // $categories = Category::query()
        //     ->search($request->q)
        //     // ->applyFilters($request)
        //     ->when($request->perPage, function ($query, $perPage) {
        //         return $query->paginate($perPage);
        //     }, function ($query) {
        //         return $query->get();
        //     });

            $categories = Category::query()
            ->search($request->q)
            ->with('parent')
            ->whereNull('category_id')
            // ->applyFilters($request)
            ->get()
            ->when($request->group, function($query){
                $query->transform(function($item, $key){
                     return [
                         'mode' => 'span',
                         'label' => $item->number.' '.$item->name,
                         'category_id' => $item->category_id,
                         'id' => $item->id,
                         'name' => $item->name,
                         'number' => $item->number,
                         'children' => $item->childrens
                     ];
                 });

             });


        return CategoryResource::collection($categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Store $request)
    {
        $data = $request->validated();
        Category::create($data);

        return response()->json([
            'message' => 'Category successfully created.'
        ], 200);
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\Models\User  $user
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(User $user)
    // {
    //     return new UserResource($user);
    // }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Update $request, Category $category)
    {
        $data = $request->validated();
        $category->update($data);

        return response()->json(['message' => 'Category successfully updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $user
     * @return \Illuminate\Http\Response
     */

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json([
            'message' => 'Category successfully deleted.',
        ], 200);
    }
}
