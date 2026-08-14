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
        Schema::create('exercise_body_part', function (Blueprint $table) {
            $table->foreignId('exercise_id')->constrained()->onDelete('cascade');
            $table->foreignId('body_part_id')->constrained()->onDelete('cascade');
            $table->unique(['exercise_id', 'body_part_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercise_body_part');
    }
};
