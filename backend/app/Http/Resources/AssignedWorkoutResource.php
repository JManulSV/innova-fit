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
            'name' => $this->template->name,
            'notes' => $this->notes,
            'assigned_date' => $this->assigned_date,

            'client' => [
                'id' => $this->client->id,
                'name' => $this->client->name,
            ],

            'exercises' => $this->exercises,
        ];
    }
}
