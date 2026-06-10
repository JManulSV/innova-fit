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
        'start_date',
        'end_date',
        'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
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

    public function getComputedStatusAttribute()
    {
        if ($this->status === 'completed') {
            return 'completed';
        }

        if(
            $this->status === 'active'
            && $this->end_date
            && now()->gt($this->end_date)
        ) {
            return 'expired';
        }

        return 'active';
    }
}
