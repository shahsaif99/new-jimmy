<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WeldLogResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'drawing_no' => $this->drawing_no,
            'project_id' => $this->project_id,
            'project_name' => $this->project?->name,
            'project_no' => $this->project?->project_no,
            'customer_name' => $this->project?->customer?->name,
            'status' => $this->status,
            'ndt_required' => $this->ndt_required,
            'ndt_rt' => $this->ndt_rt,
            'ndt_mt' => $this->ndt_mt,
            'ndt_pt' => $this->ndt_pt,
            'ndt_vt' => $this->ndt_vt,
            'welds_count' => $this->whenCounted('welds'),
            'welds' => WeldResource::collection($this->whenLoaded('welds')),
            'media' => $this->getMedia('attachment')->map(fn($m) => [
                'id' => $m->id,
                'filename' => $m->filename . '.' . $m->extension,
                'size' => $m->size,
                'url' => $m->getUrl(),
            ]),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
