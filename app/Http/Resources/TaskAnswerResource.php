<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskAnswerResource extends JsonResource
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
            'answer' => $this->answer,
            'img' => $this->img ? asset($this->img) : null,
            'attachment' => $this->attachment ? asset($this->attachment) : null,
            'id' => $this->id,
            'updated_at' => Carbon::parse($this->updated_at)->format('Y-m-d'),
        ];
    }
}
