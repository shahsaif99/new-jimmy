<?php

namespace App\Http\Requests\StorageLocation;

use Illuminate\Foundation\Http\FormRequest;

class Get extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        // If needed, you can add specific authorization logic, e.g., checking user roles
        return true;  // Allow the request by default
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules()
    {
        return [
            // 'page' can be an integer or omitted (defaults to 1 if missing)
            'page' => 'nullable|integer|min:1',

            // 'per_page' must be an integer and within an acceptable range (e.g., 10, 25, 50, 100)
            'per_page' => 'nullable|integer|in:10,25,50,100',

            // 'search' can be a string for searching storage location by name
            'search' => 'nullable|string|max:100',
        ];
    }

    /**
     * Get custom error messages for validation.
     */
    public function messages()
    {
        return [
            'page.integer' => 'The page must be an integer.',
            'page.min' => 'The page number must be at least 1.',
            'per_page.integer' => 'The per page value must be an integer.',
            'per_page.in' => 'The per page value must be one of the following: 10, 25, 50, 100.',
            'search.string' => 'The search query must be a string.',
            'search.max' => 'The search query may not be greater than 100 characters.',
        ];
    }
}
