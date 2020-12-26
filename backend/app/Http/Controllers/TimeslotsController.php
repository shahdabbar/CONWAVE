<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timeslots;

class TimeslotsController extends Controller
{
    public function store(Request $request) {

        $timeslots = $request->all();
        foreach ($timeslots as $time) {
            $data = Timeslots::create([
                'user_id' => Auth()->user()->id,
                'day_id' => $time['day_id'],
                'hour_id' => $time['hour_id'],
                'isSelected' => false
            ]);

        }
        return response()->json('success');

    }
}
