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
        Schema::create('workout_day_template_exercises', function (Blueprint $table) {
            $table->id();
            
            $table->foreignId('workout_day_template_id')
                ->constrained('workout_day_templates')
                ->cascadeOnDelete();

            $table->foreignId('exercise_id')
                ->constrained('exercises')
                ->cascadeOnDelete();

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
        Schema::dropIfExists('workout_day_template_exercises');
    }
};
