<?php

namespace App\Http\Requests\AvvikListing;

use Illuminate\Foundation\Http\FormRequest;

class Store extends FormRequest
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
           'responsible_person' => ['required'],
           'location' => ['required'],
           'project' => ['required'],
           'user' => ['required'],
           'event_type' => ['required'],
           'casual_action' => ['nullable'],
           'casual_analysis' => ['nullable'],
           'close_date' => ['nullable'],
           'closing_deadline' => ['nullable'],
           'corrective_actions' => ['nullable'],
           'cost' => ['nullable'],
           'date' => ['nullable'],
           'days_of_absence' => ['nullable'],
           'department' => ['nullable'],
           'description' => ['nullable'],
           'immediate_action' => ['nullable'],
           'location' => ['nullable'],
           'registered_by' => ['nullable'],
           'responsible_person' => ['nullable'],
           'serverity' => ['nullable'],
           'severity' => ['nullable'],
        ];
    }
}
