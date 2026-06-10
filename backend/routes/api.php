<?php

use App\Http\Controllers\AssignedWorkoutController;
use App\Http\Controllers\AssignedWorkoutExerciseController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\WorkoutDayTemplateController;
use App\Http\Controllers\WorkoutExerciseLogController;
use App\Http\Controllers\WorkoutProgressController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::post('/assign-workout', [AssignedWorkoutController::class, 'store']);
    Route::get('/assigned-workouts/{id}', [AssignedWorkoutController::class, 'clientWorkouts']);
    Route::get('/assigned-workout/{id}', [AssignedWorkoutController::class, 'show']);
    Route::get('/my-workouts', [AssignedWorkoutController::class, 'myAssignedWorkouts']);
    Route::post('/assigned-workouts/{id}/logs', [WorkoutExerciseLogController::class, 'storeLogs']);

    Route::patch('/assigned-workout-exercise/{id}', [AssignedWorkoutExerciseController::class, 'update']);

    Route::post('/workout-exercise-log', [WorkoutExerciseLogController::class, 'store']);

    Route::apiResource('/exercises', ExerciseController::class);
    Route::apiResource('/workout-day-templates', WorkoutDayTemplateController::class);

    Route::get('/progress/summary', [WorkoutProgressController::class, 'progressSummary']);

    Route::apiResource('/clients', ClientController::class);
    Route::get('/clients/{id}/assigned-workouts', [ClientController::class, 'assignedWorkouts']);
});
