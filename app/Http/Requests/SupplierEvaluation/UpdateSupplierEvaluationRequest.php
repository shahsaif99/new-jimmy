<?php

namespace App\Http\Requests\SupplierEvaluation;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSupplierEvaluationRequest extends FormRequest
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
            'supplier_id' => 'required|exists:customers_suppliers,id', // Supplier must exist
            'evaluation_date' => 'required|date', // Must have a valid date
            'total_score' => 'required|numeric|min:0|max:5', // Numeric score between 0 and 5
            'status' => 'required|in:meets_requirements,not_meet_requirements', // Valid status values
            'evaluation_criteria' => 'nullable|json', // Optional criteria, can be empty or valid JSON
        ];
    }
}
