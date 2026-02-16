<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\InformationBoard;
use App\Http\Controllers\Controller;
use App\Http\Resources\BoardInformationResource;
use Carbon\Carbon;

class BoardInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Promote scheduled items whose publish_at has passed
        InformationBoard::where('status', 'scheduled')
            ->whereNotNull('publish_at')
            ->where('publish_at', '<=', Carbon::now())
            ->update(['status' => 'published']);

        $user = auth()->user();
        $userRole = $user->getRoleNames()->first();

        $query = InformationBoard::query()
            ->with('user:id,first_name,last_name')
            ->search($request->q)
            ->filterStatus($request->status)
            ->filterVisibleTo($request->visible_to)
            ->when(!$user->hasRole('Admin'), function ($q) use ($userRole) {
                $q->whereJsonContains('visible_to', $userRole);
            })
            ->orderBy('created_at', 'desc');

        if ($request->perPage) {
            $items = $query->paginate($request->perPage);

            return response()->json([
                'data' => BoardInformationResource::collection($items),
                'pagination' => [
                    'total' => $items->total(),
                    'count' => $items->count(),
                    'per_page' => $items->perPage(),
                    'current_page' => $items->currentPage(),
                    'total_pages' => $items->lastPage(),
                    'has_more_pages' => $items->hasMorePages(),
                ],
            ]);
        }

        $items = $query->get();

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
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'visible_to' => 'required|array|min:1',
            'visible_to.*' => 'string|in:Admin,Employee,User',
            'status' => 'required|in:published,draft,scheduled',
            'publish_at' => 'nullable|date',
            'push_notification' => 'nullable|boolean',
        ]);

        $item = InformationBoard::create(array_merge($request->all(), ['user_id' => auth()->id()]));

        return response()->json([
            'message' => 'Information successfully added.',
            'data' => new BoardInformationResource($item->load('user:id,first_name,last_name')),
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
        $item = InformationBoard::with('user:id,first_name,last_name')->findOrFail($id);

        return response()->json([
            'data' => new BoardInformationResource($item),
        ]);
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
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'visible_to' => 'required|array|min:1',
            'visible_to.*' => 'string|in:Admin,Employee,User',
            'status' => 'required|in:published,draft,scheduled',
            'publish_at' => 'nullable|date',
            'push_notification' => 'nullable|boolean',
        ]);

        $item = InformationBoard::findOrFail($id);
        $item->update($request->all());

        return response()->json([
            'message' => 'Information successfully updated.',
            'data' => new BoardInformationResource($item->load('user:id,first_name,last_name')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = InformationBoard::findOrFail($id);
        $item->delete();

        return response()->json([
            'message' => 'Information successfully deleted.',
        ]);
    }
}
