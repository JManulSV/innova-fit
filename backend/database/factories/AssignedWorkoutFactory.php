<?php

namespace Database\Factories;

use App\Models\AssignedWorkout;
use App\Models\User;
use App\Models\WorkoutDayTemplate;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AssignedWorkout>
 */
class AssignedWorkoutFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start = fake()->dateTimeBetween('-7 days', 'now');
        $end = (clone $start)->modify('+7 days');

        return [
            'client_id' => User::factory(),
            'template_id' => WorkoutDayTemplate::factory(),
            'name' => fake()->sentence(4),
            'notes' => fake()->optional()->paragraph(),
            'assigned_date' => $start->format('Y-m-d'),
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end->format('Y-m-d'),
            'status' => fake()->randomElement(['active', 'completed']),
        ];
    }
}
