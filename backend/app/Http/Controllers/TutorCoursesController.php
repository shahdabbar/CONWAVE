<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tutor_Courses;

class TutorCoursesController extends Controller
{
    public function index(Request $request) {
        $courses = Tutor_Courses::where('user_id', Auth()->user()->id)->with('course')->get();
        return response()->json($courses);
    }

    public function getTutorCourses(Request $request) {
          $courses = Tutor_Courses::where('user_id',$request->user_id)->with('course')->get();
          return response()->json($courses);
    }

    public function store(Request $request) {

        $courses = $request->all();
        foreach ($courses as $course) {
            $data = Tutor_Courses::create([
                'course_id' => $course['id'],
                'course_description' => $course['course_description'],
                'rate' => $course['rate'],
                'user_id' => Auth()->user()->id
               
            ]);
        }

        return response()->json('success');
    }

    public function courses(Request $request) {
        $courses = Tutor_Courses::with('tutor', 'course')->where('course_id', $request->course_id)->get();
        return response()->json($courses);
    }
}
