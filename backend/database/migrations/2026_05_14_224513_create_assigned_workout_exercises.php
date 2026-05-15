<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('assigned_workout_exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assigned_workout_id')
                ->constrained('assigned_workouts')
                ->onDelete('cascade');

            $table->foreignId('exercise_id')
                ->nullable()
                ->constrained('exercises')
                ->nullOnDelete();

            $table->string('exercise_name');
            $table->integer('sets');
            $table->integer('reps');
            $table->integer('rest_seconds')->nullable();
            $table->integer('exercise_order');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assigned_workout_exercises');
    }
};
