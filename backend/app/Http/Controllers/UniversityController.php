<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\University;
use Illuminate\Http\Request;

class UniversityController extends Controller
{
    public function index(Request $request) {
        $universities = University::all();
        $majors = Major::all();
        return response()->json(array($universities, $majors));
    }

}
