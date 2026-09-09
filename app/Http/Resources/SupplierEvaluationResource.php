<?php

namespace App\Http\Resources;

use App\Models\SupplierEvaluation;
use Illuminate\Http\Resources\Json\JsonResource;

class SupplierEvaluationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'supplier_id' => $this->supplier_id,
            'performed_by' => $this->performed_by,
            'performed_by_name' => optional($this->performedByUser)->name,
            'evaluation_date' => optional($this->evaluation_date)->toDateString(),
            'total_score' => $this->total_score !== null ? (float) $this->total_score : null,
            'status' => $this->status,
            'status_label' => SupplierEvaluation::STATUSES[$this->status] ?? '',
            'evaluation_criteria' => $this->evaluation_criteria,
            'created_at' => $this->created_at,
        ];
    }
}
