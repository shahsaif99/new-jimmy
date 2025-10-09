<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 403);
        }

        if ($user->isDeactive()) {
            return response()->json([
                'message' => 'Account is deactivated, Please contact admin for further assistance.',
            ], 403);
        }
        $token = $user->createToken('AdminPortalToken')->plainTextToken;

        $permissions = $this->getAllPermissions($user);
        $role = $user->getRoleNames()[0];

        $userData = array_merge($user->only(['id', 'first_name', 'last_name','name','avatar_url']), ['role' => $role]);

        $user->last_login_at = date('Y-m-d H:i:s');
        $user->save();
        return response()->json([
            'status' => true,
            'token' => $token,
            'userData' => $userData,
            'abilities' => $permissions,
        ]);
    }

    public function getAllPermissions($user)
    {
        return $user->getAllPermissions()
            ->flatten()
            ->pluck('name')
            ->toArray();
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }

    public function userRolePermissions($role)
    {
        switch ($role) {
            case 'superadmin':
                return [
                    'role' => $role,
                    'abilities' => [
                        'dashboard-view',
                        'my-profile-view',
                        'password-view',
                        'my-account-view',
                        'overview-view',
                        'employee-overview',
                        'competence-overview',
                        'document-center',
                        'manage-categories',
                        'avvik-edit',
                        'avvik-delete',
                        'avvik-add',
                        'equipment-view'
                    ],
                ];
                break;
            case 'admin':
                return [
                    'role' => $role,
                    'abilities' => [
                        'dashboard-view',
                        'my-profile-view',
                        'password-view',
                        'my-account-view',
                        'overview-view',
                        'employee-overview',
                        'competence-overview',
                        'document-center',
                        'manage-categories',
                        'avvik-edit',
                        'avvik-delete',
                        'avvik-add',
                        'equipment-view'
                    ],
                ];
                break;
            case 'user':
                return [
                    'role' => $role,
                    'abilities' => [
                        'dashboard-view',
                        'my-profile-view',
                        'password-view',
                        'my-account-view',
                        'overview-view',
                        'competence-overview',
                        'document-center',
                        'equipment-view'
                    ],
                ];
                break;
            default:
                return [
                    'role' => $role,
                    'abilities' => [
                        'dashboard-view',
                    ],
                ];
                break;
        }
    }
}
