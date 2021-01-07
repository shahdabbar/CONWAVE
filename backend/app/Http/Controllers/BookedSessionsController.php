<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booked_Sessions;
use App\Http\Resources\BookedSessionsResources;

class BookedSessionsController extends Controller
{
     public function index(Request $request) {

        if(request('user_id')){
            $sessions = Booked_Sessions::where('user_id', $request->user_id)->get();
        }
        else if(request('tutor_id')){
            $sessions = Booked_Sessions::where('tutor_id', $request->tutor_id)->get();
        }
        return BookedSessionsResources::collection($sessions);
    }

    public function store(Request $request) {
        Booked_Sessions::create([
            'user_id' => $request->user_id,
            'tutor_id' => $request->tutor_id,
            'date' => $request->date,
            'timeslots_id' => $request->timeslots_id,
            'course_id' => $request->course_id,
            'meeting_type' => $request->meeting_type,
            'payment' => $request->payment,
        ]);

        return response()->json("success");
    }
}
