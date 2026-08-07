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
        $weekWorkouts = $client->assignedWorkouts()->where('status', 'active')->whereBetween('start_date', [now()->startOfWeek(), now()->endOfWeek()])->get();

        return [
            'current_workout' => $currentWorkout ? $currentWorkout : null,
            'last_activity' => $lastActivity ? $lastActivity : null,
            'week_workouts' => $weekWorkouts ? $weekWorkouts : [],
        ];
    }

    public function coachDashboard(User $coach) {
        $totalClients = $coach->clients()->count();
        $totalActiveWorkouts = $coach->assignedWorkoutsAsCoach()->where('status', 'active')->count();
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