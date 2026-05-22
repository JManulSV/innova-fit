<?php

namespace App\Http\Controllers;

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

    public function store(Request $request)
    {
        $coach = $request->user();
        $this->authorize('create', Exercise::class);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'muscle_group' => 'nullable|string|max:255',
        ]);


        $exercise = Exercise::create([
            ...$validated,
            'coach_id' => $coach->id,
        ]);

        return response()->json([
            'success' => true,
            'data' => $exercise,
            'message' => 'Exercise created successfully',
        ], 201);
    }

    public function update(Request $request, int $id)
    {
        $exercise = Exercise::findOrFail($id);

        $coach = $request->user();

        $this->authorize('update', $exercise);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
            'muscle_group' => 'sometimes|nullable|string|max:255',
        ]);

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
