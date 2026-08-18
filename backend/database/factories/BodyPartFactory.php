<?php

namespace Database\Factories;

use App\Models\BodyPart;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BodyPart>
 */
class BodyPartFactory extends Factory
{
    protected $model = BodyPart::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->randomElement([
                'legs', 'back', 'chest', 'shoulders', 'arms', 'core', 'glutes', 'calves',
            ]),
        ];
    }
}
