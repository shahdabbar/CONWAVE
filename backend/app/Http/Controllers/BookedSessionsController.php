<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booked_Sessions;
use App\Models\Timeslots;
use App\Http\Resources\BookedSessionsResources;


class BookedSessionsController extends Controller
{

    public function index(Request $request) {

        // $sessions = Booked_Sessions::with('timeslots', 'course')->where('user_id', $request->user_id)->get();
        // return $sessions;
        // $data = [];
        // foreach ($sessions as $key => $session) {
        //     $ss = $session['timeslots']->with('days', 'hours', 'users')
        //     ->where('id', $session['timeslots_id'])->get();

        //     $session['timeslots'] = $ss;
        //     $array = array($session);
        //     array_push($array, $ss);
        //     array_push($data, $array);
            
        // }
    
        // return response()->json($data);

        $sessions = Booked_Sessions::where('user_id', $request->user_id)->get();
        return BookedSessionsResources::collection($sessions);
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
