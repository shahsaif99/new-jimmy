<?php

namespace App\Http\Requests\WeldLog;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'ndt_required' => filter_var($this->ndt_required, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
        ]);
    }

    public function rules(): array
    {
        return [
            'drawing_no' => [
                'required',
                'string',
                'max:255',
                Rule::unique('weld_logs')->where(function ($query) {
                    return $query->where('project_id', $this->project_id);
                }),
            ],
            'project_id' => ['required', 'exists:projects,id'],
            'status' => ['required', Rule::in(['in_progress', 'completed'])],
            'ndt_required' => ['required', 'boolean'],
            'ndt_rt' => ['nullable', 'integer', 'min:0'],
            'ndt_mt' => ['nullable', 'integer', 'min:0'],
            'ndt_pt' => ['nullable', 'integer', 'min:0'],
            'ndt_vt' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'drawing_no.unique' => 'This drawing number already exists for the selected project.',
        ];
    }
}
