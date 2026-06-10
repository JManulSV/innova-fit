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
            'template_id' => 'nullable|exists:workout_day_templates,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'notes' => 'nullable|string',
            'name' => 'nullable|string',    
        ]);

        //2. Search models
        $client = User::where('role', 'client')->findOrFail($validated['client_id']);
        $template = $validated['template_id'] ? WorkoutDayTemplate::findOrFail($validated['template_id']) : null;

        //3. Call service
        $assignedWorkout = $service->assignWorkoutToClient(
            $client,
            $template,
            $validated['notes'] ?? null,
            $validated['name'] ?? null,
            $validated['start_date'],
            $validated['end_date'],
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
        $assignedWorkout = AssignedWorkout::with([
            'template',
            'client',
            'exercises' => function ($query) {
                $query->orderBy('exercise_order');
            },
            'exercises.exercise'
        ])->findOrFail($id);

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

    public function myAssignedWorkouts(Request $request)
    {
        $client = $request->user();
        
        $workouts = AssignedWorkout::with([
            'template',
            'exercises.exercise',
        ])
        ->where('client_id', $client->id)
        ->orderBy('start_date', 'asc')
        ->get();
        
        return response()->json([
            'success' => true,
            'data' => AssignedWorkoutResource::collection($workouts),
            'message' => 'My assigned workouts retrieved successfully',
        ]);
    }
}
