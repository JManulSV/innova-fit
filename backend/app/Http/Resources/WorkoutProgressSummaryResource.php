<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkoutProgressSummaryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'total_exercises' => $this['total_exercises'] ?? 0,
            'completed_exercises' => $this['completed_exercises'] ?? 0,
            'last_completed_exercise' => $this['last_completed_exercise'] ?? null,
        ];
    }
}
