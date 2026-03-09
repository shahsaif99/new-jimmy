<?php

namespace App\Http\Requests\Weld;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'weld_log_id' => ['required', 'exists:weld_logs,id'],
            'weld_no' => ['required', 'integer', 'min:1'],
            'wps_id' => ['nullable', 'exists:wps,id'],
            'welder_id' => ['required', 'string', 'max:4'],
            'weld_date' => ['required', 'date'],
            'visual_inspection' => ['required', Rule::in(['ok', 'not_ok'])],
            'ndt_rt' => ['nullable', 'boolean'],
            'ndt_mt' => ['nullable', 'boolean'],
            'ndt_pt' => ['nullable', 'boolean'],
            'ndt_vt' => ['nullable', 'boolean'],
            'ndt_accepted' => ['nullable', Rule::in(['accepted', 'rejected'])],
        ];
    }
}
