<?php

namespace App\Http\Controllers;

use App\Models\WorkoutDayTemplate;
use App\Http\Requests\StoreWorkoutDayTemplateRequest;
use App\Http\Requests\UpdateWorkoutDayTemplateRequest;
use Illuminate\Http\Request;

class WorkoutDayTemplateController extends Controller
{
    public function index(Request $request)
    {
        $query = WorkoutDayTemplate::where(
            'coach_id', 
            $request->user()->id
        )->orderBy('name');
        $workoutDayTemplates = $query->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $workoutDayTemplates,
            'message' => 'Workout day templates retrieved successfully',
        ]);
    }

    public function show(int $id)
    {
        $workoutDayTemplate = WorkoutDayTemplate::with('exercises.exercise')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $workoutDayTemplate,
            'message' => 'Workout day template retrieved successfully',
        ]);
    }

    public function store(StoreWorkoutDayTemplateRequest $request)
    {        
        $this->authorize('create', WorkoutDayTemplate::class);
        $validated = $request->validated();

        $workoutDayTemplate = WorkoutDayTemplate::create(
            array_merge($validated, [
                'coach_id' => $request->user()->id,
            ])
        );

        return response()->json([
            'success' => true,
            'data' => $workoutDayTemplate,
            'message' => 'Workout day template created successfully',
        ], 201);
    }

    public function update(UpdateWorkoutDayTemplateRequest $request, int $id)
    {
        $workoutDayTemplate = WorkoutDayTemplate::findOrFail($id);
        $this->authorize('update', $workoutDayTemplate);
        
        $validated = $request->validated();
        $workoutDayTemplate->update($validated);

        return response()->json([
            'success' => true,
            'data' => $workoutDayTemplate,
            'message' => 'Workout day template updated successfully',
        ]);
    }

    public function destroy(int $id)
    {
        $workoutDayTemplate = WorkoutDayTemplate::findOrFail($id);
        $this->authorize('delete', $workoutDayTemplate);
        $workoutDayTemplate->delete();

        return response()->json([
            'success' => true,
            'message' => 'Workout day template deleted successfully',
        ]);
    }
}