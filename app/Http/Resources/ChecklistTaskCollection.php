<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ChecklistTaskCollection extends ResourceCollection
{
    public $additional;

    public function __construct($resource, $additional = null)
    {
        parent::__construct($resource);
        $this->additional = $additional;
    }

    public function toArray($request)
    {
       return $this->collection->map(function ($resource) use($request) {
            return (new ChecklistTaskResource($resource, $this->additional))->toArray($request);
        })->all();
    }
}
