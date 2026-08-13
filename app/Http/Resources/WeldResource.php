<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WeldResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'weld_log_id' => $this->weld_log_id,
            'weld_no' => $this->weld_no,
            'weld_label' => $this->weld_label,
            'type' => $this->type,
            'original_weld_id' => $this->original_weld_id,
            'repair_no' => $this->repair_no,
            'repair_reason' => $this->repair_reason,
            'repair_reason_label' => $this->repair_reason_label,
            'wps_id' => $this->wps_id,
            'wps_name' => $this->wps?->name,
            'welder_id' => $this->welder_id,
            'weld_date' => $this->weld_date?->format('Y-m-d'),
            'visual_inspection' => $this->visual_inspection,
            'ndt_rt' => $this->ndt_rt,
            'ndt_mt' => $this->ndt_mt,
            'ndt_pt' => $this->ndt_pt,
            'ndt_vt' => $this->ndt_vt,
            'ndt_accepted' => $this->ndt_accepted,
            'ndt_rt_result' => $this->ndt_rt_result,
            'ndt_mt_result' => $this->ndt_mt_result,
            'ndt_pt_result' => $this->ndt_pt_result,
            'ndt_vt_result' => $this->ndt_vt_result,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
