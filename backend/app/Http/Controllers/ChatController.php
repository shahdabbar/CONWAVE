<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{

    public function index(Request $request) {
        if(request('user_id')){
            $chats = Chat::with('tutors')->where('users_id', $request->user_id)->get();
            // return response()->json($chats);
        }
        else if(request('tutor_id')){
            $chats = Chat::with('users')->where('tutor_id', $request->tutor_id)->get();
            // return response()->json($chats);
        }
        return response()->json($chats);
    }

    public function store(Request $request) {

        $data = request()->validate([
            'users_id' => "required",
            'tutor_id' => "required"
        ]);
        
        $session = Chat::firstOrCreate([
            'users_id' => $request->users_id,
            'tutor_id' => $request->tutor_id,
        ]);

        return response()->json("success");
       
    }
}
