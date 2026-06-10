<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;

class ClientPolicy
{
    public function view(User $coach, User $client): Response
    {
        return
            $client->role === 'client'
            && $client->coach_id === $coach->id
                ? Response::allow()
                : Response::deny('You do not own this client');
    }

    public function create(User $coach): Response
    {
        return $coach->role === 'coach'
            ? Response::allow()
            : Response::deny('Only coaches can create clients');
    }

    public function update(User $coach, User $client): Response
    {
        return
            $client->role === 'client'
            && $client->coach_id === $coach->id
                ? Response::allow()
                : Response::deny('You do not own this client');
    }

    public function delete(User $coach, User $client): Response
    {
        return
            $client->role === 'client'
            && $client->coach_id === $coach->id
                ? Response::allow()
                : Response::deny('You do not own this client');
    }
}

