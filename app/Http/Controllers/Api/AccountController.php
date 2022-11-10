<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AccountUpdateRequest;
use App\Http\Resources\AccountResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AccountController extends Controller
{
    public function account(Request $request)
    {
        $user = auth()->user();

        return new AccountResource($user);
    }

    // update account password
    public function updateAccountPassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['string', 'confirmed', Password::min(6)
            ->letters()
            ->numbers()
            ->uncompromised(), ],
        ], [
            'current_password.current_password' => 'Current password is incorrect.',
            'new_password.confirmed' => 'New password and confirm password do not match',
            'new_password.min' => 'New password must be at least 6 characters',
            'new_password.letters' => 'New password must contain at least one letter',
            'new_password.numbers' => 'New password must contain at least one number',
            'new_password.uncompromised' => 'New password must not be a commonly used password',
        ]);
        // password hasing is in the user model
        $user = auth()->user();
        $user->password = $request->password;
        $user->save();

        return response()->json([
            'message' => 'Password successfully updated',
        ]);
    }

    public function updateAccountGeneral(AccountUpdateRequest $request)
    {
        $user = auth()->user();

        // update user profile image
        $data = [
            'first_name' => $request->validated()['first_name'],
            'last_name' => $request->validated()['last_name'],
        ];
        if ($request->avatar_new) {
            $fileName = $this->uploadAvatar($request);
            $data['avatar'] = $fileName;
            // array_merge($data, ['avatar' => $fileName]);
        }

        $user->update($data);

        return response()->json([
            'data' => $user,
            'message' => 'Account Information successfully updated',
        ]);
    }

    public function uploadAvatar(Request $request)
    {
        $image_64 = $request->avatar_new;  // your base64 encoded
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf
        $replace = substr($image_64, 0, strpos($image_64, ',') + 1);
        // find substring fro replace here eg: data:image/png;base64,
        $image = str_replace($replace, '', $image_64);
        $image = str_replace(' ', '+', $image);
        $imageName = \Str::random(10).'.'.$extension;
        \Storage::disk('public')->put($imageName, base64_decode($image));
        return $imageName;
    }
}
