<?php

namespace App\Http\Requests\Equipment;

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
            'project_id' => ['nullable', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'valid_until' => ['nullable', 'date'],
            'supplier' => ['required', 'string', 'max:150'], 
            'category_id' => ['nullable', 'integer', 'exists:equipment_categories,id'],
            'serial_number' => ['nullable', 'string', 'max:150'],
            'certificate_number' => ['nullable', 'string', 'max:150'],
            'storage_location_id' => ['integer', 'exists:storage_locations,id'],
            'checklist_id' => ['nullable', 'integer', 'exists:checklists,id'],
            'procedure_id' => ['nullable', 'integer', 'exists:documents,id'],
            'level_of_training' => ['nullable', 'string', 'max:150'],
            'qr_code' => ['required', 'boolean'],
            'tool_id' => ['required', 'string'],
        ];
    }
}
