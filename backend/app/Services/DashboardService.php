<?php 

namespace App\Services;

use App\Models\User;

class DashboardService {
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