<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutDayTemplateResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'exercises' => ExerciseResource::collection($this->whenLoaded('exercises') ? $this->exercises->take(3) : collect()),
            'total_exercises' => $this->exercises_count ?? $this->exercises->count(),
            'has_more_exercises' => ($this->exercises_count ?? $this->exercises->count()) > 3,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
