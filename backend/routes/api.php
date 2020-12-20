<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;

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

Route::post('/sanctum/token', [UserController::class, 'signin']);
Route::post('/signup', [UserController::class, 'signup']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/profile', [ProfileController::class, 'index'] );
Route::middleware('auth:sanctum')->post('/profile/update', [ProfileController::class, 'update'] );

Route::middleware('auth:sanctum')->post('/user/photo', [UserController::class, 'storeImage']);
Route::middleware('auth:sanctum')->post('/user/update', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->get('/user_profile', [UserController::class, 'getAll'] );
\
Route::middleware('auth:sanctum')->get('/categories', [CategoryController::class, 'index']);
Route::middleware('auth:sanctum')->get('/courses', [CourseController::class, 'index']);










