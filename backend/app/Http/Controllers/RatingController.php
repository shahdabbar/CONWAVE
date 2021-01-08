<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;

class RatingController extends Controller
{

    public function index(Request $request) {
        $ratings = Rating::with('users')->where('tutor_id', $request->tutor_id)->orderBy('created_at', 'DESC')->get();
        return response()->json($ratings);
    }

    public function store(Request $request) {

        request()->validate([
            'user_id' => "required",
            'tutor_id' => "required",
            'rating' =>  "required"
        ]);
   
        Rating::firstOrCreate([
            'user_id' => $request->user_id,
            'tutor_id' => $request->tutor_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json("success");
       
    }
}
