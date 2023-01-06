<?php

namespace App\Http\Requests\Lending;

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
            'lending_date' => ['required', 'date'],
            'returned_date' => ['required','date'],
            'loaned_to' => ['required','max:150'],
            'equipment_id' => ['required'],
        ];
    }
}
