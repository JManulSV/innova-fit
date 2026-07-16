<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignedWorkoutExercise extends Model
{
    use HasFactory;
    protected $fillable = [
        'assigned_workout_id',
        'exercise_id',
        'exercise_name',
        'sets',
        'reps',
        'rest_seconds',
        'exercise_order',
        'weight',
    ];

    public function assignedWorkout()
    {
        return $this->belongsTo(AssignedWorkout::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }

    public function logs(){
        return $this->hasMany(WorkoutExerciseLog::class);
    }
}
