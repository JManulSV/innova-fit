<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use App\Models\AssignedWorkout;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $coach = $request->user();
        
        $users = QueryBuilder::for(User::class)
            ->where('role', 'client')
            ->where('coach_id', $coach->id)
            ->allowedFilters(
                AllowedFilter::callback('search', function ($query, $value) {
                    $search = '%' . strtolower(trim((string) $value)) . '%';
                    $query->where(function ($query) use ($search) {
                        $query->whereRaw('LOWER(name) like ?', [$search])
                              ->orWhereRaw('LOWER(email) like ?', [$search]);
                    });
                })
            )
            ->defaultSort('name')
            ->paginate(10);

        return response()->json([
            'success' => true,
            'data' => ClientResource::collection($users),
            'pagination' => [
                'current_page' => $users->currentPage(),
                'last_page' => $users->lastPage(),
                'per_page' => $users->perPage(),
                'total' => $users->total(),
            ],
            'message' => 'Clients retrieved successfully',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
       $coach = $request->user();

       $validated = $request->validated();
       
       $client = User::create([
           ...$validated,
           'password' => bcrypt($validated['password']),
           'coach_id' => $coach->id,
           'role' => 'client',
       ]);

       return response()->json([
           'success' => true,
           'data' => new ClientResource($client),
           'message' => 'Client created successfully',
       ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $client = User::findOrFail($id);
        $this->authorize('view', $client);

        return response()->json([
            'success' => true,
            'data' => new ClientResource($client),
            'message' => 'Client retrieved successfully',
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, string $id)
    {
        $client = User::findOrFail($id);
        $this->authorize('update', $client);
        $validated = $request->validated();
        
        if (isset($validated['password'])) {
            $validated['password'] = bcrypt($validated['password']);
        }
        
        $client->update($validated);
        
        return response()->json([
            'success' => true,
            'data' => new ClientResource($client),
            'message' => 'Client updated successfully',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = User::findOrFail($id);
        $this->authorize('delete', $client);
        $client->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Client deleted successfully',
        ]);
    }

}
