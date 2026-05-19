<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkoutExerciseLog extends Model
{
    protected $fillable = [
        'assigned_workout_exercise_id',
        'completed_sets',
        'completed_reps',
        'completed_weight',
        'notes',
        'completed_at',
    ];

    public function assignedWorkoutExercise()
    {
        return $this->belongsTo(AssignedWorkoutExercise::class);
    }
}
