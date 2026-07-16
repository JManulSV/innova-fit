<?php

namespace Database\Factories;

use App\Models\AssignedWorkout;
use App\Models\AssignedWorkoutExercise;
use App\Models\Exercise;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AssignedWorkoutExercise>
 */
class AssignedWorkoutExerciseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assigned_workout_id' => AssignedWorkout::factory(),
            'exercise_id' => Exercise::factory(),
            'exercise_name' => fake()->words(3, true),
            'sets' => fake()->numberBetween(3, 5),
            'reps' => fake()->numberBetween(6, 15),
            'rest_seconds' => fake()->optional()->numberBetween(30, 90),
            'exercise_order' => fake()->numberBetween(1, 5),
            'weight' => fake()->optional()->randomFloat(2, 20, 120),
        ];
    }
}
