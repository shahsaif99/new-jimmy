<?php

namespace App\Http\Requests\Absence;

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
            'type' => ['required'],
            'user_id' => ['required'],
            'from_date' => ['required', 'date'],
            'to_date' => ['required', 'date'],
            'days' => ['required'],
            'comments' => ['nullable'],
        ];
    }
}
