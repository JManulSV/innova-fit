<?php

namespace App\Services;

use App\Models\AssignedWorkout;
use App\Models\AssignedWorkoutExercise;
use App\Models\Exercise;
use App\Models\User;
use App\Models\WorkoutDayTemplate;
use Illuminate\Support\Facades\DB;

class AssignWorkoutService {

    public function duplicateTemplate(
    User $client,
    WorkoutDayTemplate $template,
    ?string $notes = null,
    ?string $name = null,
    ?string $startDate = null,
    ?string $endDate = null
    ) {
        return DB::transaction(function () use ($client, $template, $notes, $name, $startDate, $endDate) {

            $assignedWorkoutCreated = AssignedWorkout::create([
                'client_id' => $client->id,
                'template_id' => $template->id,
                'name' => $name ?? $template->name,
                'notes' => $notes,
                'assigned_date' => now()->toDateString(),
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'active',
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

    public function AssignedWorkout(
        User $client,
        WorkoutDayTemplate $template,
        ?string $notes = null,
        ?string $name = null,
        ?string $startDate = null,
        ?string $endDate = null,
        array $exercises = []
    ){
        return DB::transaction(function () use ($client, $template, $notes, $name, $startDate, $endDate, $exercises) {
            $assignedWorkoutCreated = AssignedWorkout::create([
                'client_id' => $client->id,
                'template_id' => $template?->id,
                'name' => $name ?? $template?->name ?? 'Nueva rutina',
                'notes' => $notes,
                'assigned_date' => now()->toDateString(),
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => 'active',
            ]);

            foreach ($exercises as $exercise) {
                $exerciseModel = Exercise::findOrFail($exercise['exercise_id']);

                if ($exerciseModel) {
                    AssignedWorkoutExercise::create([
                        'assigned_workout_id' => $assignedWorkoutCreated->id,
                        'exercise_id' => $exerciseModel->id,
                        'exercise_name' => $exerciseModel->name,
                        'sets' => $exercise['sets'],
                        'reps' => $exercise['reps'],
                        'rest_seconds' => $exercise['rest_seconds'],
                        'exercise_order' => $exercise['exercise_order'],
                    ]);
                }

            }
            
            return $assignedWorkoutCreated;
        });
    }
}
