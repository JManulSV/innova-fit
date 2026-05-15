<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignedWorkoutExercise extends Model
{
    protected $fillable = [
        'assigned_workout_id',
        'exercise_id',
        'exercise_name',
        'sets',
        'reps',
        'rest_seconds',
        'exercise_order',
    ];

    public function assignedWorkout()
    {
        return $this->belongsTo(AssignedWorkout::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
