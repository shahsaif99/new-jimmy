<?php

namespace App\Http\Resources;

use App\Models\CustomerSupplier;
use Illuminate\Http\Resources\Json\JsonResource;

class CustomerSupplierResource extends JsonResource
{
    public function toArray($request)
    {
        // The overview joins the latest evaluation in SQL; the detail page loads
        // the relation. Prefer whichever is present so both paths report the
        // same score and date without a second query.
        $latest = $this->relationLoaded('latestEvaluation') ? $this->latestEvaluation : null;
        $latestScore = $this->latest_score ?? optional($latest)->total_score;
        $latestDate = $this->latest_evaluation_date ?? optional(optional($latest)->evaluation_date)->toDateString();
        $status = $this->evaluation_status_sql ?? $this->evaluation_status;

        return [
            'id' => $this->id,
            'type' => $this->type,
            'type_label' => $this->typeLabel(),
            'name' => $this->name,
            'is_active' => (bool) $this->is_active,
            'address' => $this->address,
            'postal_code' => $this->postal_code,
            'place' => $this->place,
            'contact_person' => $this->contact_person,
            'email' => $this->email,
            'telephone_number' => $this->telephone_number,
            'website' => $this->website,
            'customer_manager_id' => $this->customer_manager_id,
            'customer_manager_name' => optional($this->customerManager)->name,
            'organization_number' => $this->organization_number,

            'is_supplier' => $this->isSupplier(),
            'should_be_evaluated' => (bool) $this->should_be_evaluated,
            'evaluation_interval_months' => $this->evaluation_interval_months,
            'next_evaluation_date' => optional($this->next_evaluation_date)->toDateString(),

            'evaluation_status' => $status,
            'evaluation_status_label' => CustomerSupplier::EVALUATION_STATUSES[$status] ?? '',
            'latest_score' => $latestScore !== null ? (float) $latestScore : null,
            'latest_evaluation_date' => $latestDate,
            'latest_evaluation_result' => optional($latest)->status,

            'management_systems' => $this->management_systems ?? [],
            'supplier_of' => $this->supplier_of ?? [],

            'evaluations' => SupplierEvaluationResource::collection(
                $this->whenLoaded('evaluations')
            ),

            'documents' => $this->whenLoaded('documents', function () {
                return $this->documents->map(fn ($document) => [
                    'id' => $document->id,
                    'file_name' => $document->file_name,
                    'file_path' => $document->file_path,
                    'file_url' => $document->file_path ? asset('storage/' . $document->file_path) : null,
                    'file_type' => $document->file_type,
                    'file_size' => $document->file_size,
                    'created_at' => $document->created_at,
                ]);
            }, []),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    private function typeLabel(): string
    {
        return [
            CustomerSupplier::TYPE_CUSTOMER => 'Customer',
            CustomerSupplier::TYPE_SUPPLIER => 'Supplier',
            CustomerSupplier::TYPE_BOTH => 'Customer & Supplier',
        ][$this->type] ?? '';
    }
}
