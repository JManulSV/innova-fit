<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Exercise>
 */
class ExerciseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'coach_id' => User::factory(),
            'name' => fake()->unique()->words(3, true),
            'description' => fake()->paragraph(),
            'instructions' => fake()->sentences(2, true),
            'muscle_groups' => [fake()->randomElement(['legs', 'back', 'chest', 'shoulders', 'arms', 'core'])],
        ];
    }
}
