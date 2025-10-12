<?php

namespace App\Http\Requests\Competence;

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
            'name' => ['required','max:255'],
            'category_id' => ['nullable','exists:competence_categories,id'],
            'completed_date' => ['required','date'],
            'planned_date' => ['nullable','date'],
            'valid_until' => ['nullable','date'],
            'level' => ['nullable'],
        ];
    }
}
