<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutExerciseLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'completed_sets' => $this->completed_sets,
        'completed_reps' => $this->completed_reps,
        'performed_weight' => $this->performed_weight,
        'completed_at' => $this->completed_at,
    ];
}
}
