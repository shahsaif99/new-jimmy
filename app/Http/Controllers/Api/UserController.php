<?php

namespace App\Http\Controllers\Api;

use App\Exports\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\Upload;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $users = User::query()
            ->search($request->q)
            ->applyFilters($request)
            ->when($request->perPage, function ($query, $perPage) {
                return $query->paginate($perPage);
            }, function ($query) {
                return $query->get();
            });

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        $data = $request->validated();

        if ($request->avatar) {
            $avatar = Upload::uploadBase64AvatarAndResize($request->avatar);
            $data['avatar'] = $avatar;
        }
        $user = User::create($data);

        return response()->json([
            'message' => 'User successfully created.',
            'data' => $user,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $data = $request->validated();
        if ($request->avatar_new) {
            if ($user->avatar) {
                \Storage::delete($user->avatar);
            }
            $avatar = Upload::uploadBase64AvatarAndResize($request->avatar_new);
            $data['avatar'] = $avatar;
        }
        $user->update($data);

        return response()->json(['message' => 'User successfully updated.'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        if ($user->avatar) {
            \Storage::disk('public')->delete($user->avatar);
        }
        return response()->json([
            'message' => 'User successfully deleted.',
        ], 200);
    }

    public function export(Request $request)
    {
        return (new UsersExport($request))->download('users.' . $request->extension, ucwords($request->extension));
    }

    // update user status
    public function updateStatus(Request $request)
    {
        $user = User::find($request->id);
        $user->status = $request->status;
        $user->save();

        return response()->json(['message' => 'User status successfully updated.'], 200);
    }

    public function usersStats()
    {
        // $users = User::all()
        // ->groupBy('role')
        // ->toArray();

        $users =  User::all()
            ->groupBy('role_name')
            ->map(function($users, $role) {
                return [
                    'role'    => $role,
                    'records' => $users->count(),
                    'users'    => $users
                ];
            })
            ->values();

        return $users;
    }

}
