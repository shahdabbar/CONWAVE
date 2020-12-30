<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MeetingType;

class MeetingTypeController extends Controller
{
    public function updateOrCreate(Request $request) {
        $meetingtype = MeetingType::updateOrCreate(
            ['user_id' => Auth()->user()->id],
            ['type' => $request->type ]
        );

        return response()->json('success');
    }

    public function index(Request $request) {
        $meetingtype = MeetingType::where('user_id', Auth()->user()->id)->get();
        return response()->json($meetingtype);
    }

    public function meetingType(Request $request) {
        $meetingtype = MeetingType::with('user')->where('type', 'both')->orWhere('type', $request->type)->get();
        return response()->json($meetingtype);
    }
}
