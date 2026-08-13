<?php

namespace App\Http\Requests\Weld;

use App\Models\Weld;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function isRepair(): bool
    {
        return $this->input('type') === Weld::TYPE_REPAIR;
    }

    public function rules(): array
    {
        $rules = [
            'type' => ['nullable', Rule::in([Weld::TYPE_WELD, Weld::TYPE_REPAIR])],
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

        foreach (Weld::NDT_METHODS as $method) {
            $rules["ndt_{$method}_result"] = ['nullable', Rule::in(['accepted', 'rejected'])];
        }

        if ($this->isRepair()) {
            // weld_log_id, weld_no and repair_no are all derived from the original
            // weld server-side, so the client only names which weld it is repairing.
            $rules['original_weld_id'] = ['required', 'exists:welds,id'];
            $rules['repair_reason'] = ['required', Rule::in(array_keys(Weld::REPAIR_REASONS))];

            return $rules;
        }

        $rules['weld_log_id'] = ['required', 'exists:weld_logs,id'];
        $rules['weld_no'] = [
            'required', 'integer', 'min:1',
            Rule::unique('welds')
                ->where('weld_log_id', $this->weld_log_id)
                ->where('repair_no', 0),
        ];

        return $rules;
    }

    public function messages(): array
    {
        return [
            'weld_no.unique' => 'This weld number already exists in this weld log.',
        ];
    }
}
