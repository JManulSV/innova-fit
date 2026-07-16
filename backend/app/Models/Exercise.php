<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Exercise extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'coach_id',
        'name',
        'description',
        'instructions',
        'muscle_groups',
    ];

    protected function casts():array
    {
        return [
            'muscle_groups' => 'array',
        ];
    }

    public function coach()
    {
        return $this->belongsTo(User::class, 'coach_id');
    }

    public function workoutDayTemplates()
    {
        return $this->belongsToMany(WorkoutDayTemplate::class, 'workout_day_template_exercises')
            ->withPivot('sets', 'reps', 'rest_seconds', 'exercise_order')
            ->withTimestamps();
    }
}
