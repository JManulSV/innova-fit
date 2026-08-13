<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('workout_exercise_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assigned_workout_exercise_id')->constrained('assigned_workout_exercises')->cascadeOnDelete();
            $table->integer('completed_sets');
            $table->integer('completed_reps');
            $table->decimal('performed_weight', 8, 2)->nullable();
            $table->string('notes', 255)->nullable();
            $table->timestamp('completed_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('workout_exercise_logs');
    }
};
