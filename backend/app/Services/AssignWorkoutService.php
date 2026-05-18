<?php

namespace App\Services;

use App\Models\AssignedWorkout;
use App\Models\User;
use App\Models\WorkoutDayTemplate;
use Illuminate\Support\Facades\DB;

class AssignWorkoutService {

    public function assignWorkoutToClient(
    User $client,
    WorkoutDayTemplate $template,
    ?string $notes = null,
    ?string $name = null
    ) {
        return DB::transaction(function () use ($client, $template, $notes, $name) {

            $assignedWorkoutCreated = AssignedWorkout::create([
                'client_id' => $client->id,
                'template_id' => $template->id,
                'name' => $name ?? $template->name,
                'notes' => $notes,
                'assigned_date' => now()->toDateString(),
            ]);

            $exercises = $template->exercises()
                ->orderBy('exercise_order')
                ->get();

            foreach ($exercises as $exercise) {

                $assignedWorkoutCreated->exercises()->create([
                    'exercise_id' => $exercise->id,
                    'exercise_name' => $exercise->name,
                    'sets' => $exercise->pivot->sets,
                    'reps' => $exercise->pivot->reps,
                    'rest_seconds' => $exercise->pivot->rest_seconds,
                    'exercise_order' => $exercise->pivot->exercise_order,
                ]);
            }

            return $assignedWorkoutCreated;
        });
    }
}