<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function index(Request $request, DashboardService $service){
        $coach = $request->user();
        $dashboardData = $service->coachDashboard($coach);
        

        return response()->json([
            'success' => 'true',
            'data' => $dashboardData,
        ]);
    }
}
