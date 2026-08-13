<?php

namespace App\Http\Controllers;

use App\Http\Resources\DashboardResource;
use Illuminate\Http\Request;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function __invoke(DashboardService $service)
    {
        $data = $service->getDashboardData();

        return response()->json([
            'success' => true,
            'data' => new DashboardResource($data),
            'message' => 'Dashboard retrieved successfully',
        ]);
    }
}
