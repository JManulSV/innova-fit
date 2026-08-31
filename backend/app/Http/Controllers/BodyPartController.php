<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BodyPart;
use App\Http\Resources\BodyPartResource;

class BodyPartController extends Controller
{
    public function index(Request $request){
        $user = $request->user();

        $bodyParts = BodyPart::orderBy('name', 'asc')->paginate(10);
        
        return response()->json([
            "success" => true,
            "data" => BodyPartResource::collection($bodyParts),
            "message" => "Body parts retrieved successfully",
            "meta" => [
                "current_page" => $bodyParts->currentPage(),
                "last_page" => $bodyParts->lastPage(),
                "per_page" => $bodyParts->perPage(),
                "total" => $bodyParts->total(),
            ]
        ]);
    }
}
