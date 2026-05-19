<?php

namespace App\Http\Controllers;

use App\Models\AssignedWorkoutExercise;
use Illuminate\Http\Request;

class AssignedWorkoutExerciseController extends Controller
{
    public function update(Request $request, int $id) 
    {
        $validated = $request->validate([
            'sets' => 'sometimes|integer|min:1',
            'reps' => 'sometimes|integer|min:1',
            'rest_seconds' => 'sometimes|integer|min:0',
            'weight' => 'sometimes|numeric|min:0',
        ]);

        $assignedWorkoutExercise = AssignedWorkoutExercise::findOrFail($id);
        $assignedWorkoutExercise->update($validated);

        return response()->json([
            'success' => true,
            'data' => $assignedWorkoutExercise,
            'message' => 'Assigned workout exercise updated successfully',
        ], 200);
    }
}
