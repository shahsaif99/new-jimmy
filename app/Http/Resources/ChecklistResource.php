<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class ChecklistResource extends JsonResource
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
            'icon' => $this->icon,
            'color' => $this->color,
            'title_img' => $this->title_img ? \asset($this->title_img) : null,
            // 'user_checklists' => UserChecklistResource::collection($this->userChecklists),
            'sections' => new SectionCollection($this->sections, $this->additional), //SectionResource::collection($this->sections, $this->additional),
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'user_name' => $this->user?->name

        ];
    }
}
