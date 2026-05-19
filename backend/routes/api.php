<?php

use App\Http\Controllers\AssignedWorkoutController;
use App\Http\Controllers\AssignedWorkoutExerciseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/assign-workout', [AssignedWorkoutController::class, 'store']);
Route::get('/assigned-workouts/{id}', [AssignedWorkoutController::class, 'clientWorkouts']);
Route::get('/assigned-workout/{id}', [AssignedWorkoutController::class, 'show']);

Route::patch('/assigned-workout-exercise/{id}', [AssignedWorkoutExerciseController::class, 'update']);