<?php

namespace Database\Factories;

use App\Models\AssignedWorkoutExercise;
use App\Models\WorkoutExerciseLog;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<WorkoutExerciseLog>
 */
class WorkoutExerciseLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assigned_workout_exercise_id' => AssignedWorkoutExercise::factory(),
            'completed_sets' => fake()->numberBetween(1, 5),
            'completed_reps' => fake()->numberBetween(5, 15),
            'performed_weight' => fake()->randomFloat(2, 20, 120),
            'notes' => fake()->optional()->sentence(),
            'completed_at' => fake()->dateTimeBetween('-3 days', 'now'),
        ];
    }
}
