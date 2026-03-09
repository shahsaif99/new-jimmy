<?php

namespace App\Http\Requests\Wps;

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
            'name' => ['required', 'string', 'max:255'],
            'wpqr' => ['nullable', 'string', 'max:255'],
            'welding_process' => ['required', 'string', Rule::in([
                '111 – MMA',
                '131 - MIG',
                '135 – MAG',
                '136 / 138 – Flux/Metal cored',
                '141 – TIG',
            ])],
            'material_group' => ['required', 'string', Rule::in(['2.1', '8.1', '10.1'])],
            'welding_position' => ['nullable', 'array'],
            'welding_position.*' => ['string', Rule::in([
                'All, except PG and J-L045',
                'PA', 'PB', 'PC', 'PF', 'PG', 'PH', 'PJ',
            ])],
            'joint_type' => ['nullable', 'array'],
            'joint_type.*' => ['string', Rule::in(['BW', 'FW'])],
            'thickness_min' => ['nullable', 'string', 'max:20'],
            'thickness_max' => ['nullable', 'string', 'max:20'],
            'diameter_min' => ['nullable', 'string', 'max:20'],
            'diameter_max' => ['nullable', 'string', 'max:20'],
            'layer' => ['nullable', 'string', Rule::in(['Multi layer', 'Single layer'])],
            'sides' => ['nullable', 'string', Rule::in(['bs', 'ss'])],
            'standard' => ['nullable', 'array'],
            'standard.*' => ['string', Rule::in([
                'EN ISO 15614-1',
                'EN ISO 15609-1',
                'EN ISO 15612',
                'EN ISO 15613',
                'EN 10025-2',
            ])],
            'ref_spec' => ['nullable', 'array'],
            'ref_spec.*' => ['string', Rule::in([
                'Norsok M601',
                'EN-13480-4',
                'EN 13445-4',
                'TR ISO 15608',
            ])],
            'prepared_date' => ['nullable', 'date'],
            'prepared_by' => ['nullable', 'exists:users,id'],
            'project_id' => ['nullable', 'exists:projects,id'],
        ];
    }
}
