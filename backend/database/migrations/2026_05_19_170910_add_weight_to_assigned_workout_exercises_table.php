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
        Schema::table('assigned_workout_exercises', function (Blueprint $table) {
            $table->decimal('weight', 5, 2)->nullable()->after('rest_seconds');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assigned_workout_exercises', function (Blueprint $table) {
            $table->dropColumn('weight');
        });
    }
};
