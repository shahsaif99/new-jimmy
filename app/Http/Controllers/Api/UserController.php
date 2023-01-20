<?php

namespace App\Http\Controllers\Api;

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
            ->with('roles:id,name')
            ->search($request->q)
            ->applyFilters($request)
            ->withSum(['vacations' => function ($query) {
                $query->whereStatus('approved');
            }], 'days')
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

        // upload base64 image
        if ($request->avatar) {
            $avatar = Upload::uploadBase64AvatarAndResize($request->avatar);
            $data['avatar'] = $avatar;
        }

        $user = User::create($data);
        if ($request->role) {
            $user->assignRole($request->role);
        }
        if ($request->permissions) {
            $user->givePermissionTo($request->permissions);
        }

        return response()->json(['message' => 'User successfully created.'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {

        $user = User::with(['permissions', 'roles.permissions'])->withSum(['vacations' => function ($query) {
            $query->whereStatus('approved');
        }], 'days')
        ->findOrFail($userId);

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
        $user->update($request->validated());

        $data = $request->except(['password', 'password_confirmation']);

        if ($request->filled('password')) {
            $data = array_merge($data, $request->only(['password', 'password_confirmation']));
        }
        if ($request->avatar_new) {
            $avatar = Upload::uploadBase64AvatarAndResize($request->avatar_new);
            $data['avatar'] = $avatar;
        }
        $user->update($data);
        if ($request->role) {
            $user->syncRoles($request->role);
        }
        if ($request->permissions_list) {
            $user->syncPermissions($request->permissions_list);
        }

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

        return response()->json([
            'message' => 'User successfully deleted.',
        ], 200);
    }

    // public function export(Request $request)
    // {
    //     return (new UsersExport($request))->download('users.'.$request->extension, ucwords($request->extension));
    // }

    // update user status
    public function updateStatus(Request $request)
    {
        $user = User::find($request->id);
        $user->status = $request->status;
        $user->save();

        return response()->json(['message' => 'User status successfully updated.'], 200);
    }

    public function getAllPermissions($user)
    {
        return $user->getAllPermissions()
            ->flatten()
            ->pluck('name')
            ->toArray();
    }

}
