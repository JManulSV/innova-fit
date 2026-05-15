<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkoutDayTemplate extends Model
{
    use SoftDeletes;    

    protected $fillable = [
        'coach_id',
        'name',
        'description',
    ];

    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_id');
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'workout_day_template_exercises')
            ->withPivot('sets', 'reps', 'rest_seconds', 'exercise_order')
            ->withTimestamps();
    }

    public function assignedWorkouts()
    {
        return $this->hasMany(AssignedWorkout::class, 'template_id');
    }
}
