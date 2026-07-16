<?php

namespace Database\Seeders;

use App\Models\AssignedWorkout;
use App\Models\AssignedWorkoutExercise;
use App\Models\Exercise;
use App\Models\User;
use App\Models\WorkoutDayTemplate;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DevelopmentSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $coach = User::factory()->create([
            'name' => 'Dev Coach',
            'email' => 'coach@example.com',
            'password' => bcrypt('12345678'),
            'role' => 'coach',
        ]);

        $clients = User::factory(3)->create([
            'password' => bcrypt('12345678'),
            'role' => 'client',
            'coach_id' => $coach->id,
        ]);

        $exercises = Exercise::factory(5)->create([
            'coach_id' => $coach->id,
        ]);

        $templates = WorkoutDayTemplate::factory(2)->create([
            'coach_id' => $coach->id,
        ]);

        foreach ($templates as $template) {
            foreach ($exercises->take(3) as $index => $exercise) {
                $template->exercises()->attach($exercise->id, [
                    'sets' => 3,
                    'reps' => 10 + $index * 2,
                    'rest_seconds' => 60,
                    'exercise_order' => $index + 1,
                ]);
            }
        }

        foreach ($clients as $client) {
            $assignedWorkout = AssignedWorkout::factory()->create([
                'client_id' => $client->id,
                'template_id' => $templates->random()->id,
                'assigned_date' => now()->subDays(1)->format('Y-m-d'),
                'start_date' => now()->format('Y-m-d'),
                'end_date' => now()->addDays(7)->format('Y-m-d'),
                'status' => 'active',
            ]);

            foreach ($exercises->take(3) as $order => $exercise) {
                $assignedExercise = AssignedWorkoutExercise::factory()->create([
                    'assigned_workout_id' => $assignedWorkout->id,
                    'exercise_id' => $exercise->id,
                    'exercise_name' => $exercise->name,
                    'sets' => 4,
                    'reps' => 12,
                    'rest_seconds' => 60,
                    'exercise_order' => $order + 1,
                    'weight' => 40,
                ]);

                $assignedExercise->logs()->createMany([
                    [
                        'completed_sets' => 4,
                        'completed_reps' => 12,
                        'performed_weight' => 40.00,
                        'notes' => 'Buen progreso',
                        'completed_at' => now()->subDay(),
                    ],
                ]);
            }
        }
    }
}
