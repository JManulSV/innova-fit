<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assigned_workout_exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assigned_workout_id')->constrained('assigned_workouts')->cascadeOnDelete();
            $table->foreignId('exercise_id')->nullable()->constrained('exercises')->nullOnDelete();
            $table->string('exercise_name');
            $table->integer('sets');
            $table->integer('reps');
            $table->integer('rest_seconds')->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->integer('exercise_order');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assigned_workout_exercises');
    }
};
