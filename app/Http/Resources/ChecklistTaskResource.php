<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\TaskCheckListAnswer;

class ChecklistTaskResource extends JsonResource
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
       $answer = TaskCheckListAnswer::where('main_task_id',$this->additional)->where('checklist_task_id',$this->id)->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'param' => $this->param,
            'is_img_required' => (bool) $this->is_img_required,
            'img' => $this->img ? asset($this->img) : null,
            'answer' => $answer ? TaskAnswerResource::make($answer) : null
        ];
    }
}
