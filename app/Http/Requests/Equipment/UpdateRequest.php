<?php

namespace App\Http\Requests\Equipment;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'project_id' => ['required'],
            'name' => ['required','max:255'],
            'valid_until' => ['required','date'],
            'supplier' => ['nullable','max:150'],
            'category' => ['nullable','max:150'],
            'serial_number' => ['required', 'max:150'],
            'certificate_number' => ['nullable','max:150'],
        ];
    }
}
