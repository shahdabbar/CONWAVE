<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;


class ProfileController extends Controller
{
    public function index(Request $request)
    {
        // return response()->json("i am here, hola!");
        $profile = Auth::user()->profile;
        return response()->json($profile);
    }

    public function update(Request $request)
    {
        if (request("bio")){
            $data = request()->validate([
                'bio' => 'required',
            ]);
        } else if (request("university")){
            $data = request()->validate([
                'university' => 'required',
            ]);
        } else if (request("major")){
            $data = request()->validate([
                'major' => 'required',
            ]);
        } else if (request("graduation_date")){
            $data = request()->validate([
                'graduation_date' => 'required',
            ]);
        } 

        Auth()->user()->profile()->insertOrUpdate($data);
        return response()->json('success', 200);

    }

   
}
