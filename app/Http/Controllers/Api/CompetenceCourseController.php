<?php

namespace App\Http\Controllers\Api;

use App\Models\CompetenceCourse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompetenceCourseResource;

class CompetenceCourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $competenceCourses = CompetenceCourse::query()
        ->with('category')
        ->search($request->q)
        ->when($request->perPage, function ($query, $perPage) {
            return $query->paginate($perPage);
        }, function ($query) {
            return $query->get();
        });

        return CompetenceCourseResource::collection($competenceCourses);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'unique:competence_courses'],
            'category_id' => ['required', 'exists:competence_categories,id']
        ]);

        CompetenceCourse::create($data);

        return response()->json([
            'message' => 'Competence Course successfully created.',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CompetenceCourse  $competenceCourse
     * @return \Illuminate\Http\Response
     */
    public function show(CompetenceCourse $competenceCourse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CompetenceCourse  $competenceCourse
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CompetenceCourse $competenceCourse)
    {
        $data = $request->validate([
            'name' => ['required', 'unique:competence_courses,name,'.$competenceCourse->id],
            'category_id' => ['required', 'exists:competence_categories,id']
        ]);

        $competenceCourse->update($data);

        return response()->json([
            'message' => 'Competence Course successfully updated.',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CompetenceCourse  $competenceCourse
     * @return \Illuminate\Http\Response
     */
    public function destroy(CompetenceCourse $competenceCourse)
    {
        $competenceCourse->delete();

        return response()->json([
            'message' => 'Competence Course successfully updated.',
        ], 200);
    }
}
