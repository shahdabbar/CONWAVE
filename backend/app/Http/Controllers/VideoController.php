<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Video;

class VideoController extends Controller
{
    public function store(Request $request)
    {

        // if($request->data['_parts'][0][1]){
        //     return "I am here";
        // }

        $data = request()->validate([
           'video_path' => 'required',
        ]);

        if (request('video_path')) {
            $imagePath = request('video_path')->store('videos', 'public');            
            $image = ['video_path' => "storage/{$imagePath}"];
        }
        Video::create($image);
        return response()->json('success', 200);
    }
}
