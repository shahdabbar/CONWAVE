<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Days;

class DayController extends Controller
{
    public function index(Request $request)
    {
        $days = Days::all();
        return response()->json($days);
    }
}
