<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;
use Illuminate\Support\Facades\Redis;

class RatingController extends Controller
{
    public function index(Request $request) {
        $ratings = Rating::with('users')->where('tutor_id', $request->tutor_id)->where('course_id', $request->course_id)
        ->orderBy('created_at', 'DESC')->get();

        $sum = Rating::groupBy('rating')->selectRaw('rating, count(rating)')
        ->where('tutor_id', $request->tutor_id)->where('course_id', $request->course_id)->get();
        
        return response()->json(array($ratings, $sum));
    }

    public function ratings(Request $request) {
        
        $sum = Rating::groupBy('rating')->selectRaw('rating, count(rating)')
        ->where('tutor_id', $request->tutor_id)->where('course_id', $request->course_id)->get();

        return response()->json($sum);
    }

    public function store(Request $request) {

        request()->validate([
            'user_id' => "required",
            'tutor_id' => "required",
            'course_id' => "required",
            'rating' =>  "required",
            'comment' => 'required'
        ]);
   
        Rating::firstOrCreate([
            'user_id' => $request->user_id,
            'tutor_id' => $request->tutor_id,
            'course_id' => $request->course_id,
        ],
        [
            'user_id' => $request->user_id,
            'tutor_id' => $request->tutor_id,
            'course_id' => $request->course_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json("success");
       
    }
}
