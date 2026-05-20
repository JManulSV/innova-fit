<?php

namespace App\Http\Controllers;

use App\Http\Resources\AssignedWorkoutResource;
use App\Models\AssignedWorkout;
use App\Models\User;
use App\Models\WorkoutDayTemplate;
use App\Services\AssignWorkoutService;
use Illuminate\Http\Request;

class AssignedWorkoutController extends Controller
{
    public function store(Request $request, AssignWorkoutService $service)
    {
        //1. Validate request
        $validated = $request->validate([
            'client_id' => 'required|exists:users,id',
            'template_id' => 'required|exists:workout_day_templates,id',
            'notes' => 'nullable|string',
            'name' => 'nullable|string',    
        ]);

        //2. Search models
        $client = User::where('role', 'client')->findOrFail($validated['client_id']);
        $template = WorkoutDayTemplate::findOrFail($validated['template_id']);

        //3. Call service
        $assignedWorkout = $service->assignWorkoutToClient(
            $client,
            $template,
            $validated['notes'] ?? null,
            $validated['name'] ?? null
        );

        $assignedWorkout->load('exercises.exercise', 'template', 'client');

        //4. Return response
        return response()->json([
            'success' => true,
            'data' => new AssignedWorkoutResource($assignedWorkout),
            'message' => 'Workout assigned successfully',
        ], 201);
        
    }

    public function show(int $id)
    {
        $assignedWorkout = AssignedWorkout::with(
            'exercises.exercise',
            'template',
            'client'
        )->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new AssignedWorkoutResource($assignedWorkout),
            'message' => 'Assigned workout retrieved successfully',
        ]);
    }

    public function clientWorkouts(int $id)
    {
        $client = User::where('role', 'client')->findOrFail($id);
                
        $clientWorkouts = $client->assignedWorkouts()
            ->with('exercises')
            ->get();
                        
        return response()->json([
            'success' => true,
            'data' => AssignedWorkoutResource::collection($clientWorkouts),
            'message' => 'Client workouts retrieved successfully',
        ]);
    }
}
