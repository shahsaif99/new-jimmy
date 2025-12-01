<?php

namespace App\Http\Requests\AvvikListing;

use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
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
            'title' => ['required'],
            'date' => ['required'],
            'registered_by' => ['required'],
            'location' => ['required'],
            'project' => ['required'],
            'user' => ['required'],
            'event_type' => ['required'],
            'casual_action' => ['nullable'],
            'casual_analysis' => ['nullable'],
            'time_of_incident' => ['nullable', 'date'],
            'close_date' => ['nullable'],
            'closing_deadline' => ['nullable'],
            'corrective_actions' => ['nullable'],
            'cost' => ['nullable'],
            'days_of_absence' => ['nullable'],
            'department' => ['nullable'],
            'description' => ['nullable'],
            'immediate_action' => ['nullable'],
            'responsible_person' => ['nullable'],
            'severity' => ['nullable'],
            'supplier' => ['nullable'],
            'equipment' => ['nullable'],
            'economic_consequences' => ['nullable', 'boolean'],
            'resulted_in_absence' => ['nullable', 'boolean'],
            'medical_treatment_needed' => ['nullable', 'boolean'],
            'status' => ['nullable', 'string'],
            'closed_by' => ['nullable'],
            'close_comment' => ['nullable', 'string'],
            'files' => ['nullable', 'array'],
            'files.*' => ['nullable', 'file', 'max:10240'],
        ];
    }
}
