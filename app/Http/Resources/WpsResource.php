<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WpsResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'wpqr' => $this->wpqr,
            'welding_process' => $this->welding_process,
            'material_group' => $this->material_group,
            'welding_position' => $this->welding_position,
            'joint_type' => $this->joint_type,
            'thickness_min' => $this->thickness_min,
            'thickness_max' => $this->thickness_max,
            'diameter_min' => $this->diameter_min,
            'diameter_max' => $this->diameter_max,
            'thickness' => $this->formatRange($this->thickness_min, $this->thickness_max, ' mm'),
            'diameter' => $this->formatDiameter($this->diameter_min, $this->diameter_max),
            'layer' => $this->layer,
            'sides' => $this->sides,
            'standard' => $this->standard,
            'ref_spec' => $this->ref_spec,
            'prepared_date' => $this->prepared_date?->format('Y-m-d'),
            'prepared_by' => $this->prepared_by,
            'prepared_by_name' => $this->preparedByUser?->name,
            'project_id' => $this->project_id,
            'project_name' => $this->project?->name,
            'project_no' => $this->project?->project_no,
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

    private function formatRange($min, $max, $unit = '')
    {
        if ($min && $max) return $min . '-' . $max . $unit;
        if ($min) return $min . $unit;
        if ($max) return $max . $unit;
        return null;
    }

    private function formatDiameter($min, $max)
    {
        if ($min && $max) return $min . ' - ' . $max . ' mm';
        if ($min) return $min . ' mm';
        if ($max) return $max . ' mm';
        return null;
    }
}
