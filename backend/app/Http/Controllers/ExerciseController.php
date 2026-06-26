<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExerciseRequest;
use App\Http\Requests\UpdateExerciseRequest;
use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function index()
    {
        $query = Exercise::orderBy('created_at', 'desc');
        $exercisesPaginated = $query->paginate(10);
        
        return response()->json([
            'success' => true,
            'data' => $exercisesPaginated,
            'message' => 'Exercises retrieved successfully',
        ]);
    }

    public function show(int $id)
    {
        $exercise = Exercise::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $exercise,
            'message' => 'Exercise retrieved successfully',
        ]);
    }

    public function store(StoreExerciseRequest $request)
    {
        $coach = $request->user();
        $this->authorize('create', Exercise::class);
        
        $validatedExercise = $request->validated();

        $exercise = Exercise::create([
            ...$validatedExercise,
            'coach_id' => $coach->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $exercise,
            'message' => 'Exercise created successfully',
        ], 201);
    }

    public function update(UpdateExerciseRequest $request, int $id)
    {
        $exercise = Exercise::findOrFail($id);

        $this->authorize('update', $exercise);

        $validated = $request->validated();

        $exercise->update($validated);

        return response()->json([
            'success' => true,
            'data' => $exercise,
            'message' => 'Exercise updated successfully',
        ]);
    }

    public function destroy(Request $request, int $id)
    {
        $exercise = Exercise::findOrFail($id);

        $this->authorize('delete', $exercise);

        $exercise->delete();

        return response()->json([
            'success' => true,
            'message' => 'Exercise deleted successfully',
        ]);
    }
}
