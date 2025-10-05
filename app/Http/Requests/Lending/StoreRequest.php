<?php

namespace App\Http\Requests\Lending;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'loaned_to' => ['nullable', 'max:150'], // Nullable to handle "self-loan" cases
            'equipment_id' => ['required', 'exists:equipment,id'], // Ensure the equipment exists
        ];
    }

    /**
     * Custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages()
    {
        return [
            'equipment_id.required' => 'Equipment is required.',
            'equipment_id.exists' => 'The selected equipment does not exist.',
        ];
    }
}
