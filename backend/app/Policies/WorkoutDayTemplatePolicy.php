<?php

namespace App\Policies;

use App\Models\User;
use App\Models\WorkoutDayTemplate;
use Illuminate\Auth\Access\Response;

class WorkoutDayTemplatePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, WorkoutDayTemplate $workoutDayTemplate): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->role === 'coach'
            ? Response::allow()
            : Response::deny('Only coaches can create workout day templates');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, WorkoutDayTemplate $workoutDayTemplate): Response
    {
        return $workoutDayTemplate->coach_id === $user->id
            ? Response::allow()
            : Response::deny('You do not own this workout day template');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, WorkoutDayTemplate $workoutDayTemplate): Response
    {
        return $workoutDayTemplate->coach_id === $user->id
            ? Response::allow()
            : Response::deny('You do not own this workout day template');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, WorkoutDayTemplate $workoutDayTemplate): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, WorkoutDayTemplate $workoutDayTemplate): bool
    {
        return false;
    }
}
