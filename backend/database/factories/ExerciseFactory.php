<?php

namespace Database\Factories;

use App\Models\BodyPart;
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
        ];
    }

    /**
     * Attach randomly generated body parts to the exercise after creation.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Exercise $exercise) {
            $bodyParts = BodyPart::inRandomOrder()->limit(2)->get();

            if ($bodyParts->count() < 2) {
                $names = collect(['legs', 'back', 'chest', 'shoulders', 'arms', 'core', 'glutes', 'calves'])
                    ->diff($bodyParts->pluck('name'))
                    ->shuffle()
                    ->take(2 - $bodyParts->count());

                $bodyParts = $bodyParts->merge(
                    $names->map(fn (string $name) => BodyPart::firstOrCreate(['name' => $name]))
                );
            }

            $exercise->bodyParts()->attach($bodyParts->pluck('id'));
        });
    }
}
