<?php

namespace App\Http\Controllers;

use App\Models\WorkoutDayTemplate;
use App\Http\Requests\StoreWorkoutDayTemplateRequest;
use App\Http\Requests\UpdateWorkoutDayTemplateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $workoutDayTemplate = WorkoutDayTemplate::with('exercises')->findOrFail($id);
        // $workoutDayTemplate = WorkoutDayTemplate::findOrFail($id);

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

        try {
            $workoutDayTemplate = DB::transaction(function () use ($validated, $request) {
                $workoutDayTemplate = WorkoutDayTemplate::create([
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                    'coach_id' => $request->user()->id,
                ]);

                $pivotData = [];
                foreach ($validated['exercises'] as $exercise) {
                    $pivotData[$exercise['exercise_id']] = [
                        'sets' => $exercise['sets'],
                        'reps' => $exercise['reps'],
                        'exercise_order' => $exercise['exercise_order'],
                        'rest_seconds' => $exercise['rest_seconds'],
                    ];
                }

                $workoutDayTemplate->exercises()->attach($pivotData);
                
                return $workoutDayTemplate;
            });
           
            return response()->json([
                'success' => true,
                'data' => $workoutDayTemplate,
                'message' => 'Workout day template created successfully',
            ], 201);
            
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error creating workout day template',
            ], 500);
        }
    }

    public function update(UpdateWorkoutDayTemplateRequest $request, int $id)
    {
        $workoutDayTemplate = WorkoutDayTemplate::findOrFail($id);
        $this->authorize('update', $workoutDayTemplate);
        
        $validated = $request->validated();
        try {
            $updateWorkoutDayTemplate = DB::transaction(function () use ($workoutDayTemplate, $validated) {
                
                $workoutDayTemplate->update([
                    'name' => $validated['name'],
                    'description' => $validated['description'],
                ]);

                $pivotData = [];
                foreach ($validated['exercises'] as $exercise) {
                    $pivotData[$exercise['exercise_id']] = [
                        'sets' => $exercise['sets'],
                        'reps' => $exercise['reps'],
                        'exercise_order' => $exercise['exercise_order'],
                        'rest_seconds' => $exercise['rest_seconds'],
                    ];
                }
                
                $workoutDayTemplate->exercises()->sync($pivotData);

                return $workoutDayTemplate;
            });

            return response()->json([
                'success' => true,
                'data' => $updateWorkoutDayTemplate,
                'message' => 'Workout day template updated successfully',
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating workout day template',
            ], 500);
        }

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