<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json(['message' => 'You are not authorized to access this endpoint.', 'success' => false], 401);
        }

        if ($user->role !== $role) {
            return response()->json(['message' => 'You are not authorized to access this endpoint.', 'success' => false], 403);
        }

        return $next($request);
    }
}
