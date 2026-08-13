<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignedWorkoutExerciseResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'assigned_workout_id' => $this->assigned_workout_id,
            'exercise_id' => $this->exercise_id,
            'exercise_name' => $this->exercise_name,
            'sets' => $this->sets,
            'reps' => $this->reps,
            'rest_seconds' => $this->rest_seconds,
            'exercise_order' => $this->exercise_order,
            'weight' => $this->weight,
            'exercise' => new ExerciseResource($this->whenLoaded('exercise')),
        ];
    }
}
