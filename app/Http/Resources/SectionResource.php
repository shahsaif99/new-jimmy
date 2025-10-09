<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public $additional;

    public function __construct($resource, $additional = null)
    {
        parent::__construct($resource);
        $this->additional = $additional;
    }
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'tasks' => new ChecklistTaskCollection($this->checklistTasks, $this->additional),
        ];
    }
}
