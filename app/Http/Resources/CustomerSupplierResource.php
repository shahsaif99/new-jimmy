<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerSupplierResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'name' => $this->name,
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
            'status' => $this->status,
            'management_systems' => $this->management_systems,
            'supplier_of' => $this->supplier_of ? $this->supplier_of[0] : null,
            'total_evaluation' => $this->total_evaluation,
            'supplier_evaluation' => $this->evaluations
                ? $this->evaluations->map(function ($evaluation) {
                    return [
                        'performed_by' => $evaluation->performed_by,
                        'performed_by_name' => optional($evaluation->performedByUser)->name,
                        'total_score' => $evaluation->total_score,
                        'evaluation_date' => $evaluation->evaluation_date,
                        'status' => $evaluation->status,
                        'evaluation_criteria' => json_decode($evaluation->evaluation_criteria, true) ?? null, // Convert back to object
                    ];
                })
                : null,

            'documents' => $this->documents
                ? $this->documents->map(function ($document) {
                    return [
                        'id' => $document->id,
                        'file_name' => $document->file_name,
                        'file_path' => $document->file_path,
                        'file_type' => $document->file_type,
                        'file_size' => $document->file_size,
                        'created_at' => $document->created_at,
                    ];
                })
                : [],

            'created_at' => $this->created_at,
            'latest_evaluation' => $this->updated_at,
        ];
    }
}
