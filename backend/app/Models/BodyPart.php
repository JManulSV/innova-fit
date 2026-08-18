<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use App\Models\Exercise;

class BodyPart extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($bodyPart) {
            $bodyPart->slug = Str::slug($bodyPart->name);
        });
    }

    public function exercises()
    {
        return $this->belongsToMany(Exercise::class, 'exercise_body_part');
    }
}