<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ChecklistResource extends JsonResource
{
    public $additional;

    public function __construct($resource, $additional = null)
    {
        parent::__construct($resource);
        $this->additional = $additional;
    }

    public function toArray($request)
    {
        $sectionsCount = $this->sections_count ?? $this->sections->count();
        $tasksCount = $this->tasks_count ?? $this->sections->sum(fn ($s) => $s->checklistTasks->count());

        return [
            'id' => $this->id,
            'code' => 'SJ-' . str_pad((string) $this->id, 2, '0', STR_PAD_LEFT),
            'name' => $this->name,
            'icon' => $this->icon,
            'color' => $this->color,
            'title_img' => $this->title_img ? \asset($this->title_img) : null,
            'category_id' => $this->category_id,
            'category' => $this->whenLoaded('category', fn () => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ]),
            'sections' => new SectionCollection($this->sections, $this->additional),
            'sections_count' => $sectionsCount,
            'tasks_count' => $tasksCount,
            'created_at' => Carbon::parse($this->created_at)->diffForHumans(),
            'user_name' => $this->user?->name,
        ];
    }
}
