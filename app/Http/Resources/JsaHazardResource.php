<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class JsaHazardResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'work_type' => $this->work_type,
            'hazard' => $this->hazard,
            'control' => $this->control,
            'sort_order' => (int) $this->sort_order,
        ];
    }
}
