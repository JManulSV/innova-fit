<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AssignedWorkoutResource extends JsonResource
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
            'name' => $this->workout->name,
            'notes' => $this->notes,
            'assigned_date' => $this->assigned_date,
            'client' => [
                'id' => $this->assignedWorkout->client->id,
                'name' => $this->assignedWorkout->client->name,
            ],
            'exercises' => $this->exercises,
        ];
    }
}
