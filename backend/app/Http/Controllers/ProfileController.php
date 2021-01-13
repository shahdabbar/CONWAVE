<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;


class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $profile = Profile::with('university', 'major', 'degree')->where('user_id', Auth()->user()->id)->get();
        return response()->json($profile);
    }

    public function update(Request $request)
    {

        if (request("bio")){
            $data = request()->validate([
                'bio' => 'required',
            ]);

            Profile::updateOrCreate(['user_id' => Auth()->user()->id],
            [
                'user_id' => Auth()->user()->id,
                'bio' => $data['bio'],
            ]);

        } else if (request("university_id")){
            $data = request()->validate([
            'university_id' => 'required',
            'major_id' => 'required',
            'degree_id' => 'required',
            'graduation_date' => 'required',
        ]);

            Profile::updateOrCreate(['user_id' => Auth()->user()->id],
            [
                'user_id' => Auth()->user()->id,
                'university_id' => $data['university_id'],
                'major_id' =>  $data['major_id'],
                'degree_id' =>  $data['degree_id'],
                'graduation_date' =>  $data['graduation_date'],
            ]);
        } 

       
        return response()->json('success', 200);

    }

   
}
