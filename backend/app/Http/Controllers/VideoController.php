<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;

class VideoController extends Controller
{
    public function index(Request $request)
    {
        $videos = Video::where('user_id', 1)->get();
        return response()->json($videos);
    }
}


