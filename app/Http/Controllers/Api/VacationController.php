<?php

namespace App\Http\Controllers\Api;

use App\Models\Vacation;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Container\Container;
use App\Http\Controllers\Controller;
use Illuminate\Pagination\Paginator;
use App\Http\Resources\VacationResource;
use App\Http\Requests\Vacation\StoreRequest;
use Illuminate\Pagination\LengthAwarePaginator;

class VacationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        if ($request->filled('range') && !str_contains($request->range, 'to')) {
            return response()->json([
                'message' => 'Invalid date format. Please select date in range',
            ], 500);
        }
        $vacations = Vacation::query()
        ->with(['user:id,first_name,last_name,avatar'])
        ->applyFilters($request)
        ->when(!$request->group, function ($query) use($request) {
            return $query->paginate($request->perPage);
        }, function ($query) {
            return $query->get();
        })
        ->when($request->group, function($query){
           return $query->groupBy('user_id')
            ->map(function($item, $key){
                return [
                    'mode' => 'span',
                    'label' => $item->first()->user->name,
                    'children' => $item->toArray()
                ];
            });
        })

        ->when($request->group, function ($data) use($request){
            return $this->paginate($data, $request->perPage);
        });

        return VacationResource::collection($vacations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequest $request)
    {
       Vacation::create($request->validated());

       return response()->json(['message' => 'Vacation successfully created.'],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Vacation  $vacation
     * @return \Illuminate\Http\Response
     */
    public function show(Vacation $vacation)
    {
        $vacation->load('user');

        return new VacationResource($vacation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Vacation  $vacation
     * @return \Illuminate\Http\Response
     */
    public function update(StoreRequest $request, Vacation $vacation)
    {
        $vacation->update($request->validated());

        return response()->json(['message' => 'Vacation successfully updated.'],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Vacation  $vacation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vacation $vacation)
    {
        //
        $vacation->delete();

        return response()->json(['message' => 'Vacation request successfully deleted.'],200);

    }

    public function vacationStatistics()
    {
        $vacations = Vacation::query()
        ->whereUserId(auth()->id())
        ->select([DB::raw("SUM(days) as total_days")])
        ->whereStatus('approved')
        ->first();

        return new VacationResource([
            'vacations' => auth()->user()->holidays ?? 0,
            'usedVacations' => $vacations->total_days ?? 0,
            'remainingVacations' => auth()->user()->holidays - $vacations->total_days ?? 0
        ]);

    }

    public function vacationStatusUpdate(Request $request, Vacation $vacation){

        $vacation->update([
            'status' => $request->status,
            'approved_by' => auth()->user()->first_name. ' ' . auth()->user()->last_name,
            'approved_date' => date('Y-m-d')
        ]);

        return response()->json(['message' => 'Absence request successfully'. ucwords($request->status)],200);
    }

    public static function paginate(Collection $results, $pageSize)
    {
        $page = Paginator::resolveCurrentPage('page');

        $total = $results->count();

        return self::paginator($results->forPage($page, $pageSize), $total, $pageSize, $page, [
            'path' => Paginator::resolveCurrentPath(),
            'pageName' => 'page',
        ]);

    }

    /**
     * Create a new length-aware paginator instance.
     *
     * @param  \Illuminate\Support\Collection  $items
     * @param  int  $total
     * @param  int  $perPage
     * @param  int  $currentPage
     * @param  array  $options
     * @return LengthAwarePaginator
     */
    protected static function paginator($items, $total, $perPage, $currentPage, $options)
    {
        return Container::getInstance()->makeWith(LengthAwarePaginator::class, compact(
            'items', 'total', 'perPage', 'currentPage', 'options'
        ));
    }
}
