<?php

namespace App\Http\Requests\CustomerSupplier;

use Illuminate\Foundation\Http\FormRequest;

class StoreCustomerSupplierRequest extends FormRequest
{
    public function authorize()
    {
        return true;  // Adjust as needed for authorization
    }

    public function rules()
    {
        return [
            'type' => 'required|in:customer,supplier,both',
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'postal_code' => 'nullable|string',
            'place' => 'nullable|string',
            'contact_person' => 'nullable|string',
            'email' => 'nullable|email',
            'telephone_number' => 'nullable|string',
            'website' => 'nullable|string',
            'customer_manager_id' => 'required|exists:users,id',
            'organization_number' => 'nullable|string',
            'status' => 'nullable|in:approved,not_approved',
            'management_systems' => 'nullable|array',
            'management_systems.*' => 'string',
            'supplier_of' => 'nullable|array',
            'supplier_of.*' => 'string',
            'total_evaluation' => 'nullable|in:under_evaluation,preferred,acceptable,not_acceptable',

            // Validate multiple supplier evaluations
            'supplier_evaluation' => 'nullable|array',
            'supplier_evaluation.*.evaluation_date' => 'required|date',
            'supplier_evaluation.*.performed_by' => 'nullable|exists:users,id',
            'supplier_evaluation.*.total_score' => 'required|numeric|min:0|max:100',
            'supplier_evaluation.*.status' => 'required|in:meets_requirements,not_meet_requirements',
            'supplier_evaluation.*.evaluation_criteria' => 'nullable|json',
        ];
    }
}
