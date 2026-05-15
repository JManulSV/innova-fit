<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssignedWorkout extends Model
{
    protected $fillable = [
        'client_id',
        'template_id',
        'name',
        'notes',
        'assigned_date',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'client_id');
    }

    public function template()
    {
        return $this->belongsTo(WorkoutDayTemplate::class, 'template_id');
    }

    public function exercises()
    {
        return $this->hasMany(AssignedWorkoutExercise::class);
    }
}
