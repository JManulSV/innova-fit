<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\DashboardService;

class DashboardController extends Controller
{
    public function __invoke(DashboardService $service)
    {
        $data = $service->getDashboardData();

        return response()->json($data);
    }
}
