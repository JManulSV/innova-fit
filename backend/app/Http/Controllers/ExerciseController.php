<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExerciseRequest;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UpdateExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function index()
    {
        $query = Exercise::with('bodyParts')->orderBy('created_at', 'desc');
        $exercisesPaginated = $query->paginate(10);
        
        return response()->json([
            'success' => true,
            'data' => ExerciseResource::collection($exercisesPaginated),
            'message' => 'Exercises retrieved successfully',
        ]);
    }

    public function show(int $id)
    {
        $exercise = Exercise::with('bodyParts')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => new ExerciseResource($exercise),
            'message' => 'Exercise retrieved successfully',
        ]);
    }

    public function store(StoreExerciseRequest $request)
    {
        $this->authorize('create', Exercise::class);
        $coach = $request->user();

        $exercise = DB::transaction(function () use ($request, $coach) {
            $validated = $request->validated();

            $data = collect($validated);
            $bodyPartsIds = $data->pull('body_parts_ids', []);

            $exercise = Exercise::create([
                ...$data->all(),
                'coach_id' => $coach->id,
            ]);

            $exercise->bodyParts()->sync($bodyPartsIds);

            return $exercise;
        });

        $exercise->load('bodyParts');

        return response()->json([
            'success' => true,
            'data' => new ExerciseResource($exercise),
            'message' => 'Exercise created successfully',
        ], 201);
    }

    public function update(UpdateExerciseRequest $request, int $id)
    {
        $exercise = Exercise::findOrFail($id);

        $this->authorize('update', $exercise);

        $exercise = DB::transaction(function () use ($request, $exercise) {
            $validated = $request->validated();

            $data = collect($validated);
            $bodyPartsIds = $data->pull('body_parts_ids', null);

            $exercise->update($data->all());

            if ($bodyPartsIds !== null) {
                $exercise->bodyParts()->sync($bodyPartsIds);
            }

            return $exercise;
        });

        $exercise->load('bodyParts');

        return response()->json([
            'success' => true,
            'data' => new ExerciseResource($exercise),
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
