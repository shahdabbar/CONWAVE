<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VideoController extends Controller
{
    public function store(Request $request)
    {
        return response()->json($request);

        $data = request()->validate([
           'video_path' => 'required',
        ]);

        if (request('video_path')) {
            $videoPath = request('video_path')->store('videos', 'public');            
            $video = ['video_path' => "storage/{$videoPath}"];
        }
        Video::create([
            'video_path' => $video,
            'title' => "Introduction to Python",
            'user_id' => Auth()->user()->id,
        
        ]);
        return response()->json('video updated successfully', 200);
    }
}
