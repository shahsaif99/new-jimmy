<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = $this->validate($request, [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'The provided credentials are incorrect.'], 403);
        }
        if (!$user->status) {
            return response()->json(['message' => 'Your account is deactive, please contact site administrator.'], 403);
        }

        $token = $user->createToken('PortalToken')->plainTextToken;
        $userData = $user->only(['name', 'avatar', 'id', 'avatar_url', 'role', 'package_id']);
        return response()->json([
            'token' => $token,
            'userData' => $userData,
            'permissions' => $this->userRolePermissions($user->role),
        ]);
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
                        'employee',
                        'document-center',
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
