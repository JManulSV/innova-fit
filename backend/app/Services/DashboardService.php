<?php 

namespace App\Services;

use App\Models\User;

class DashboardService {

    public function getDashboardData(User $user = null) {
        $user = $user ?? auth()->user();

        if (! $user) {
            return [];
        }

        if ($user->isCoach()) {
            return $this->coachDashboard($user);
        }

        return $this->clientDashboard($user);
    }

    public function clientDashboard(User $client) {
        $currentWorkout = $client->assignedWorkouts()->where('status', 'active')->first();
        $lastActivity = $client->assignedWorkouts()->where('status', 'completed')->orderBy('updated_at', 'desc')->first();

        return [
            'current_workout' => $currentWorkout ? $currentWorkout : null,
            'last_activity' => $lastActivity ? $lastActivity : null,
        ];
    }

    public function coachDashboard(User $coach) {
        $totalClients = $coach->clients()->count();
        $totalActiveWorkouts = $coach->assignedWorkouts()->where('status', 'active')->count();
        $totalExercises = $coach->exercises()->count();
        $totalTemplates = $coach->workoutDayTemplates()->count();
        $recentClients = $coach->clients()->orderBy('created_at', 'desc')->take(5)->get();

        return [
            "stats" => [
                'total_clients' => $totalClients,
                'total_active_workouts' => $totalActiveWorkouts,
                'total_exercises' => $totalExercises,
                'total_templates' => $totalTemplates,
            ],
            "recent" => $recentClients

        ];
    }
}