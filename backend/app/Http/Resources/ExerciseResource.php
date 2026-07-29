<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseResource extends JsonResource
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
            'muscle_groups' => $this->muscle_groups,
            'instructions' => $this->when($request->query('include') === 'details', $this->instructions),
            'sets' => $this->when(isset($this->pivot), $this->pivot->sets ?? null),
            'reps' => $this->when(isset($this->pivot), $this->pivot->reps ?? null),
            'rest_seconds' => $this->when(isset($this->pivot), $this->pivot->rest_seconds ?? null),
            'exercise_order' => $this->when(isset($this->pivot), $this->pivot->exercise_order ?? null),
        ];
    }
}
