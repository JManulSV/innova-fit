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
        Schema::create('assigned_workouts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('template_id')
                ->nullable()
                ->constrained('workout_day_templates')
                ->nullOnDelete();

            $table->string('name');
            $table->text('notes')->nullable();
            $table->date('assigned_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assigned_workouts');
    }
};
