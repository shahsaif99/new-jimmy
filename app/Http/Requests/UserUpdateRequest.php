<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'string', 'max:50'],
            'last_name' => ['required', 'string', 'max:50'],
            'email' => ['required', 'email', 'max:100', 'unique:users,email,'.$this->id],
            'phone' => ['nullable', 'max:30'],
            'address' => ['nullable', 'max:150'],
            'post_address' => ['nullable', 'max:150'],
            'postal_code' => ['nullable', 'max:30'],
            'gender' => ['nullable', 'max:30'],
            'citizen_country' => ['nullable', 'max:50'],
            'position_percentage' => ['nullable', 'max:30'],
            'employement_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'dob' => ['nullable', 'date'],
            'description' => ['nullable'],
            'status' => ['required'],
            'password' => ['nullable', 'string', 'confirmed', Password::min(6)
            ->letters()
            ->numbers()
            ->uncompromised(), ],
        ];
    }
}
