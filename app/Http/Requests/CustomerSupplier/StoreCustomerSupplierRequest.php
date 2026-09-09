<?php

namespace App\Http\Requests\CustomerSupplier;

use App\Models\CustomerSupplier;
use App\Models\SupplierEvaluation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCustomerSupplierRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    /**
     * Checkboxes and toggles arrive as "1"/"0"/"true" over multipart, which
     * would otherwise fail a boolean rule.
     */
    protected function prepareForValidation(): void
    {
        foreach (['is_active', 'should_be_evaluated'] as $flag) {
            if ($this->has($flag)) {
                $this->merge([
                    $flag => filter_var($this->input($flag), FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE) ?? false,
                ]);
            }
        }
    }

    public function rules()
    {
        return [
            'type' => ['required', Rule::in([
                CustomerSupplier::TYPE_CUSTOMER,
                CustomerSupplier::TYPE_SUPPLIER,
                CustomerSupplier::TYPE_BOTH,
            ])],
            'name' => 'required|string|max:255',
            'is_active' => 'nullable|boolean',
            // Address and customer manager are not marked as required on the
            // client's form, and insisting on a manager blocks adding a
            // supplier before one has been assigned.
            'address' => 'nullable|string',
            'postal_code' => 'nullable|string',
            'place' => 'nullable|string',
            'contact_person' => 'nullable|string',
            'email' => 'nullable|email',
            'telephone_number' => 'nullable|string',
            'website' => 'nullable|string',
            'customer_manager_id' => 'nullable|exists:users,id',
            'organization_number' => 'nullable|string',
            'status' => 'nullable|in:approved,not_approved',

            'should_be_evaluated' => 'nullable|boolean',
            'evaluation_interval_months' => [
                'nullable',
                'integer',
                Rule::in(CustomerSupplier::EVALUATION_INTERVALS),
                // An interval is what drives the next-evaluation date, so a
                // supplier flagged for evaluation has to carry one.
                Rule::requiredIf(fn () => $this->boolean('should_be_evaluated')),
            ],

            'management_systems' => 'nullable|array',
            'management_systems.*' => 'string',
            'supplier_of' => 'nullable|array',
            'supplier_of.*' => 'string',
            'total_evaluation' => 'nullable|in:under_evaluation,preferred,acceptable,not_acceptable',

            // Evaluations staged in the create form, before the record exists.
            'supplier_evaluation' => 'nullable|array',
            'supplier_evaluation.*.evaluation_date' => 'required|date',
            'supplier_evaluation.*.performed_by' => 'nullable|exists:users,id',
            'supplier_evaluation.*.total_score' => 'required|numeric|min:0|max:100',
            'supplier_evaluation.*.status' => ['required', Rule::in(array_keys(SupplierEvaluation::STATUSES))],
            'supplier_evaluation.*.evaluation_criteria' => 'nullable',
        ];
    }

    public function messages(): array
    {
        return [
            'evaluation_interval_months.required' => 'Choose an evaluation interval for a supplier that should be evaluated.',
        ];
    }
}
