<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSupplierEvaluationRequest extends FormRequest
{
    public function authorize()
    {
        return true; // Adjust as needed for authorization
    }

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
