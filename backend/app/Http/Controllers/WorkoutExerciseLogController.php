<?php

namespace App\Http\Controllers;

use App\Http\Resources\WorkoutExerciseLogResource;
use App\Models\AssignedWorkout;
use App\Models\AssignedWorkoutExercise;
use App\Models\WorkoutExerciseLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
            'data' => new WorkoutExerciseLogResource($log),
            'message' => 'Workout exercise log created successfully',
        ], 201);
    }

    public function storeLogs(Request $request, int $id)
    {
        $client = $request->user();

        $validated = $request->validate([
            'completed_exercises' => 'required|array|min:1',
            'completed_exercises.*.assigned_workout_exercise_id' => [
                'required',
                'exists:assigned_workout_exercises,id',
            ],
            'completed_exercises.*.performed_weight' => [
                'nullable',
                'numeric',
                'min:0',
            ],
            'completed_exercises.*.notes' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        $assignedWorkout = AssignedWorkout::findOrFail($id);

        if ($assignedWorkout->client_id !== $client->id) {
            abort(403);
        }

        $createdLogs = DB::transaction(function () use (
            $validated,
            $assignedWorkout
        ) {
            $logs = [];

            foreach ($validated['completed_exercises'] as $logData) {

                $assignedExercise = AssignedWorkoutExercise::where(
                    'assigned_workout_id',
                    $assignedWorkout->id
                )->findOrFail(
                    $logData['assigned_workout_exercise_id']
                );

                $logs[] = WorkoutExerciseLog::create([
                    'assigned_workout_exercise_id' =>
                        $assignedExercise->id,

                    'completed_sets' =>
                        $assignedExercise->sets,

                    'completed_reps' =>
                        $assignedExercise->reps,

                    'performed_weight' =>
                        $logData['performed_weight'] ?? null,

                    'notes' =>
                        $logData['notes'] ?? null,

                    'completed_at' => now(),
                ]);
            }

            return $logs;
        });

        return response()->json([
            'success' => true,
            'data' => $createdLogs,
            'message' => 'Workout exercise logs created successfully',
        ], 201);
    }

}