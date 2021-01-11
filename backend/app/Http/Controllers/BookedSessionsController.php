<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booked_Sessions;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\BookingMail;
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

        $booked = Booked_Sessions::create([
            'user_id' => $request->user_id,
            'tutor_id' => $request->tutor_id,
            'date' => $request->date,
            'timeslots_id' => $request->timeslots_id,
            'course_id' => $request->course_id,
            'meeting_type' => $request->meeting_type,
            'payment' => $request->payment,
        ]);

        $student_email = User::where('id', $request->user_id)->pluck('email');
        $tutor_email = User::where('id', $request->tutor_id)->pluck('email');

        $data = array(
            'date' => $request->date,
            'course_name' => $booked->course->name,
            'course_description' => $booked->course->tutorCourses->where('user_id', $booked->tutor_id),
            'tutor_firstname' => $booked->tutor->firstname,
            'tutor_lastname' => $booked->tutor->lastname,
            'student_firstname' => $booked->user->firstname,
            'student_lastname' => $booked->user->lastname,
            'hour' => $booked->timeslots->hours->hour,
            'day' => $booked->timeslots->days->day,

        );

        Mail::to($student_email)->send(new BookingMail($data));
        Mail::to($tutor_email)->send(new BookingMail($data));

        return response()->json("success");
    }

    public function delete(Request $request) {

        Booked_Sessions::where('user_id', $request->user_id)->where('tutor_id', $request->tutor_id)
        ->where('course_id', $request->course_id)->delete();
        return response()->json("success");
    }

    public function update(Request $request) {

        Booked_Sessions::where('user_id', $request->user_id)->where('tutor_id', $request->tutor_id)
        ->where('course_id', $request->course_id)->update([ 'note' => $request->note ]);
        return response()->json("success");
    }
}
