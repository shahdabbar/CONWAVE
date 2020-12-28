<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timeslots;

class TimeslotsController extends Controller
{

    public function index(Request $request) {

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)->with(['days', 'hours'])->get();
        // $timeslots = Timeslots::where('user_id', Auth()->user()->id)->get();

        $result = collect($timeslots)->groupBy('days_id');
        // ->map(function ($item) {
        //         return array_merge(...$item->toArray());
        //     });
            // ->values()
            // ->toArray();
        return response()->json($timeslots);
    }

    public function sunday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 1)
        ->with('hours')->get();

        return response()->json($timeslots);
    }
   
    public function monday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 2)
        ->with('hours')->get();

        return response()->json($timeslots);
    }
    
    public function tuesday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 3)
        ->with('hours')->get();

        return response()->json($timeslots);
    }
    
    public function wednesday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 4)
        ->with('hours')->get();

        return response()->json($timeslots);
    }
    
    public function thursday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 5)
        ->with('hours')->get();

        return response()->json($timeslots);
    }
    
    public function friday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 6)
        ->with('hours')->get();

        return response()->json($timeslots);
    }

    public function saturday(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', 7)
        ->with('hours')->get();

        return response()->json($timeslots);
    }

    public function hours(Request $request){

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)
        ->where('days_id', $request->days_id)
        ->with('hours')->get();

        return response()->json($timeslots);
    }

    public function update(Request $request) {

        $data = request()->validate([
            'days_id' => 'required',
            'hours_id' => 'required',
            'isSelected' => 'required',
        ]);

        $timeslots = Timeslots::where('user_id', Auth()->user()->id)->where('days_id', $request->days_id)
            ->where('hours_id', $request->hours_id)->update(['isSelected' => $request->isSelected]);
        
        return response()->json('success');
    }

    public function store(Request $request) {

        $timeslots = $request->all();
        foreach ($timeslots as $time) {
            $data = Timeslots::create([
                'user_id' => Auth()->user()->id,
                'days_id' => $time['day_id'],
                'hours_id' => $time['hour_id'],
                'isSelected' => false
            ]);

        }
        return response()->json('success');

    }
}
