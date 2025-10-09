<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserChecklistResource extends JsonResource
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
            'id'                => $this->id,
            'checklist'         => ChecklistResource::make($this->checklist),
            'description'       => $this->description,
            'files'             => UserChecklistFileResource::collection($this->files),
            'name'              => $this->name,
            'priority'          => $this->priority,
            'work_location'     => $this->work_location,
            'work_order'        => $this->work_order,
            'is_started'        => $this->is_started,
        ];
    }
}
