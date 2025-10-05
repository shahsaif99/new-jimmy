<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProjectShowResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'project_no' => $this->project_no,
            'name' => $this->name,
            'status' => $this->status,
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer?->name,
            'project_manager_id' => $this->project_manager_id,
            'project_manager_name' => $this->projectManager?->name,
            'project_hse_manager_id' => $this->project_hse_manager_id,
            'project_hse_manager_name' => $this->projectHseManager?->name,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'cost' => $this->cost,
            'hour' => $this->hour,
            'description' => $this->description,
            'task_count' => $this->resource->tasks()->count(), // Count of all tasks in this project
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}
