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

        if ($assignedWorkoutExercise->client_id !== $client->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $exerciseLogs = $assignedWorkoutExercise->logs()->latest('completed_at')->get();
        return response()->json([
            'success' => true,
            'exercise_logs' => $exerciseLogs,
            'message' => 'Exercise logs retrieved successfully',
        ]);
    }
}
