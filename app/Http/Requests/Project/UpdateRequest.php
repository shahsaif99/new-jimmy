<?php

namespace App\Http\Requests\Project;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check(); // Ensure only authenticated users can update projects
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'status' => ['sometimes', 'required', Rule::in(['in_progress', 'completed'])],
            'customer_id' => ['sometimes', 'required', 'exists:customer_suppliers,id'],
            'project_no' => ['sometimes', 'nullable', 'string', 'max:50', Rule::unique('projects', 'project_no')->ignore($this->route('project'))],
            'start_date' => ['sometimes', 'required', 'date'],
            'end_date' => ['sometimes', 'nullable', 'date', 'after_or_equal:start_date'],
            'project_manager_id' => ['sometimes', 'required', 'exists:users,id'],
            'project_hse_manager_id' => ['sometimes', 'nullable', 'exists:users,id'],
            'description' => ['sometimes', 'nullable', 'string', 'max:500'],
            'cost' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'hour' => ['sometimes', 'nullable', 'numeric', 'min:0', 'max:10000'],
        ];
    }

    /**
     * Customize error messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Project name is required.',
            'status.required' => 'Project status is required.',
            'status.in' => 'Status must be either "in_progress" or "completed".',
            'customer_id.required' => 'Customer is required.',
            'customer_id.exists' => 'Selected customer does not exist.',
            'project_no.unique' => 'Project number must be unique.',
            'start_date.required' => 'Start date is required.',
            'end_date.after_or_equal' => 'End date must be after or equal to the start date.',
            'project_manager_id.required' => 'Project manager is required.',
            'project_manager_id.exists' => 'Selected project manager does not exist.',
            'cost.numeric' => 'Cost must be a valid number.',
            'cost.min' => 'Cost cannot be negative.',
            'hour.integer' => 'Hours must be a whole number.',
        ];
    }
}
