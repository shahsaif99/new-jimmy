<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
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
            'checklist'         => $this->whenLoaded('checklist', fn() => ChecklistResource::make($this->checklist)),
            'project'           => $this->whenLoaded('project', fn() => ProjectResource::make($this->project)),
            'description'       => $this->description,
            'img'               => $this->img ? asset($this->img) : null,
            'title'             => $this->title,
            'priority'          => $this->priority,
            'location'          => [
                'room'              => $this->room,
                'floor'             => $this->floor,
                'area'              => $this->area,
            ],
            'is_started'        => $this->is_started,
            'status'            => $this->status,
            'users'             => UserResource::collection($this->whenLoaded('assignedUsers')),
            'category'          => $this->category,
            'start_date'        => Carbon::parse($this->start_date)->format('Y-m-d'),
            'due_date'          => Carbon::parse($this->due_date)->format('Y-m-d'),
        ];
    }
}
