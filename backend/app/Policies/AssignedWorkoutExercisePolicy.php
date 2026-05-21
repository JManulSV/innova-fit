<?php

namespace App\Policies;

use App\Models\AssignedWorkoutExercise;
use App\Models\User;
use Illuminate\Support\Facades\Response;

class AssignedWorkoutExercisePolicy
{
    public function update(
        User $coach,
        AssignedWorkoutExercise $exercise
    )
    {
        return
            $exercise
                ->assignedWorkout
                ->client
                ->coach_id === $coach->id
                    ? Response::allow()
                    : Response::deny('You are not the coach of this client');
    }
}
