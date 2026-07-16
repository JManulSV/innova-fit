<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutExerciseLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'assigned_workout_exercise_id',
        'completed_sets',
        'completed_reps',
        'performed_weight',
        'notes',
        'completed_at',
    ];

    public function assignedWorkoutExercise()
    {
        return $this->belongsTo(AssignedWorkoutExercise::class);
    }
}
