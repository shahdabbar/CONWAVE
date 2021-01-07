<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;


class UserController extends Controller
{
    public function signin(Request $request) {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken($request->device_name)->plainTextToken;
        $response = [
            'user' => $user,
            'token' => $token,
        ];
        return response()->json($response, 201);
    }

    public function signup(Request $request) {

        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'gender' => 'required',
            'email' => 'required|email',
            'type' => 'required',
            'location' => 'required',
            'phone_number' => 'required',
            'password' => 'required',
            'confirm_password' => 'required',
            'device_name' => 'required'
        ]);
        
        $store = User::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'gender' => $request->gender,
            'email' => $request->email,
            'type' => $request->type,
            'location' => $request->location,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            // 'confirm_password' => $request->confirm_password
        ]);


        if($store) {
            $user = User::where('email', $request->email)->first();

            $token = $user->createToken($request->device_name)->plainTextToken;
            $response = [
                'user' => $user,
                'token' => $token,
            ];
            return response()->json($response, 201);

        }

    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json('Loggedout', 200);
    }


    public function storeImage(Request $request)
    {
        $data = request()->validate([
           'profile_photo_path' => 'required',
        ]);

        if (request('profile_photo_path')) {
            $imagePath = request('profile_photo_path')->store('profile', 'public');            
            $image = ['profile_photo_path' => "storage/{$imagePath}"];
        }
        Auth()->user()->update($image);

        return response()->json(Auth()->user());
    }

    public function update(Request $request)
    {
        if (request("firstname")){
            $data = request()->validate([
                'firstname' => 'required',
            ]);
        } else if (request("lastname")){
            $data = request()->validate([
                'lastname' => 'required',
            ]);
        } else if (request("gender")){
            $data = request()->validate([
                'gender' => 'required',
            ]);
        } else if (request("phone_number")){
            $data = request()->validate([
                'phone_number' => 'required',
            ]);
        } else if (request("location")){
            $data = request()->validate([
                'location' => 'required',
            ]);
        }

        Auth()->user()->update($data);
        return response()->json('success', 200);

    }

    public function getAll(Request $request)
    {
        return response()->json('success', 200);
        // $users = User::all()->where(type, "tutor");
        // return respose()->json($users);
    }

    public function getTutor(Request $request) {
        $tutor = User::with('profile')->where('id', $request->user_id)->get();
        return response()->json($tutor);
    }
}       
