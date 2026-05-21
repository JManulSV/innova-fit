<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAssignedWorkoutExerciseRequest;
use App\Models\AssignedWorkoutExercise;
use Illuminate\Http\Request;

class AssignedWorkoutExerciseController extends Controller
{
    public function update(UpdateAssignedWorkoutExerciseRequest $request, int $id) 
    {
        
        $assignedWorkoutExercise = AssignedWorkoutExercise::with(
            'assignedWorkout.client'
        )->findOrFail($id);
        
        //$client = $assignedWorkoutExercise->assignedWorkout->client;

        $this->authorize(
            'update', 
            $assignedWorkoutExercise);

        $assignedWorkoutExercise->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => $assignedWorkoutExercise,
            'message' => 'Assigned workout exercise updated successfully',
        ], 200);
    }
}
