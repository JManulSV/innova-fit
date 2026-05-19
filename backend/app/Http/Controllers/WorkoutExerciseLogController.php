<?php

namespace App\Http\Controllers;

use App\Models\AssignedWorkoutExercise;
use App\Models\WorkoutExerciseLog;
use Illuminate\Http\Request;

class WorkoutExerciseLogController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'assigned_workout_exercise_id' => 'required|exists:assigned_workout_exercises,id',
            'completed_sets' => 'required|integer|min:0',
            'completed_reps' => 'required|integer|min:0',
            'performed_weight' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:255',
        ]);

        $assignedWorkoutExercise = AssignedWorkoutExercise::with(
            'assignedWorkout.client'
        )->findOrFail($validated['assigned_workout_exercise_id']);

        $client = $request->user();

        if ($client->id !== $assignedWorkoutExercise->assignedWorkout->client_id) {
            return response()->json([
                'success' => false,
                'message' => 'You are not the client of this workout exercise',
            ], 403);
        }

        $log = WorkoutExerciseLog::create([
            ...$validated,
            'completed_at' => now()
        ]);

        return response()->json([
            'success' => true,
            'data' => $log,
            'message' => 'Workout exercise log created successfully',
        ], 201);
    }
}
