<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hour;

class HourController extends Controller
{
    public function index(Request $request)
    {
        $days = Hour::all();
        return response()->json($days);
    }
}
