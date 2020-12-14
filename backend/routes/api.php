<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/categories', [CategoryController::class, 'index']);
Route::middleware('auth:sanctum')->get('/courses', [CourseController::class, 'index']);

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->tokens()->delete();

    return response()->json('Loggedout', 200);
});


Route::get('/test', function (Request $request) {
    return response()->json(array('response' => 'success', 'data' => $request));
});


Route::post('/sanctum/token', function (Request $request) {
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
});


Route::post('/signup', function (Request $request) {

    $request->validate([
        'name' => 'required',
        'email' => 'required|email',
        'type' => 'required',
        'location' => 'required',
        'password' => 'required',
        'confirm_password' => 'required',
        'device_name' => 'required'
    ]);
    
    $store = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'type' => $request->type,
        'location' => $request->location,
        'password' => Hash::make($request->password),
        'confirm_password' => $request->confirm_password
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

    
});




