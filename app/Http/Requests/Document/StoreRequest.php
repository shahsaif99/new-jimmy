<?php

namespace App\Http\Requests\Document;

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
            'title' => ['required','max:255'],
            'category_id' => ['required','max:255'],
            'subcategory_id' => ['required','max:255'],
            'created_date' => ['nullable','date'],
            'document_number' => ['nullable','max:255'],
            'revised_date' => ['nullable','date'],
            'revision_number' => ['nullable','max:255'],
            'author' => ['nullable','max:255'],
            'approved_by' => ['nullable','max:255'],
            'content' => ['required'],
            'approved_date' => ['nullable', 'date'],
            'type' => ['required','max:255'],
        ];
    }
}
