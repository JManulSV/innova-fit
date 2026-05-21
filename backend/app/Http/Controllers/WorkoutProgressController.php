<?php

namespace App\Http\Controllers;

use App\Models\AssignedWorkoutExercise;
use Illuminate\Http\Request;

class WorkoutProgressController extends Controller
{
    public function exerciseLogs(Request $request, int $id){
       $client = $request->user();

       $assignedWorkoutExercise =
            AssignedWorkoutExercise::with([
                'assignedWorkout',
                'logs',
            ])->findOrFail($id);

        if ($assignedWorkoutExercise->assignedWorkout->client_id !== $client->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $query = $assignedWorkoutExercise
            ->logs()
            ->latest('completed_at');

        if ($request->filled('from')) {
            $query->whereDate(
                'completed_at',
                '>=',
                $request->from
            );
        }

        if ($request->filled('to')) {
            $query->whereDate(
                'completed_at',
                '<=',
                $request->to
            );
        }

        $exerciseLogs = $query->paginate(10);

        return response()->json([
            'success' => true,
            'exercise_logs' => $exerciseLogs,
            'message' => 'Exercise logs retrieved successfully',
        ]);
    }

    public function progressSummary(Request $request)
{
    $client = $request->user();

    // 1. Get all assigned exercises for the client
    $assignedExercises = AssignedWorkoutExercise::with('logs')
        ->whereHas('assignedWorkout', function ($query) use ($client) {
            $query->where('client_id', $client->id);
        })
        ->get();

    // 2. Total assigned exercises
    $totalExercises = $assignedExercises->count();

    // 3. Completed exercises (has at least one log)
    $completedExercises = $assignedExercises->filter(
        fn ($exercise) => $exercise->logs->isNotEmpty()
    );

    $totalCompletedExercises = $completedExercises->count();

    // 4. Last completed exercise
    $lastCompletedExercise = $completedExercises
        ->sortByDesc(function ($exercise) {
            return $exercise->logs->max('completed_at');
        })
        ->first();

    return response()->json([
        'success' => true,
        'data' => [
            'total_exercises' => $totalExercises,
            'completed_exercises' => $totalCompletedExercises,

            'last_completed_exercise' => $lastCompletedExercise
                ? [
                    'id' => $lastCompletedExercise->id,
                    'exercise_name' => $lastCompletedExercise->exercise_name,
                    'completed_at' => $lastCompletedExercise
                        ->logs
                        ->max('completed_at'),
                ]
                : null,
        ],
        'message' => 'Progress summary retrieved successfully',
    ]);
}
}
