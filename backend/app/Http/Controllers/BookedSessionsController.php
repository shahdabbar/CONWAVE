<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booked_Sessions;


class BookedSessionsController extends Controller
{

    public function index(Request $request) {
        $sessions = Booked_Sessions::where('user_id', $request->user_id)->get();

        return response()->json($sessions);

    }

    public function store(Request $request) {
         $session = Booked_Sessions::create([
              'user_id' => $request->user_id,
              'date' => $request->date,
              'timeslots_id' => $request->timeslots_id,
              'course_id' => $request->course_id,
              'meeting_type' => $request->meeting_type,
              'payment' => $request->payment,
              'location' => $request->location
        ]);

        return response()->json("success");
    }
}
