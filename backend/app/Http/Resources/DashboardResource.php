<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $currentWorkout = data_get($this->resource, 'current_workout');
        $lastActivity = data_get($this->resource, 'last_activity');
        $weekWorkouts = data_get($this->resource, 'week_workouts');
        $stats = data_get($this->resource, 'stats');
        $recent = data_get($this->resource, 'recent');

        return [
            'current_workout' => $currentWorkout
                ? new AssignedWorkoutResource($currentWorkout)
                : null,
            'last_activity' => $lastActivity
                ? new AssignedWorkoutResource($lastActivity)
                : null,
            'week_workouts' => $weekWorkouts
                ? AssignedWorkoutResource::collection($weekWorkouts)
                : [],
            'stats' => $stats ?? null,
            'recent' => $recent
                ? UserResource::collection($recent)
                : null,
        ];
    }
}
