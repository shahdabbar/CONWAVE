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
use App\Http\Controllers\TutorCoursesController;
use App\Http\Controllers\DayController;
use App\Http\Controllers\HourController;
use App\Http\Controllers\TimeslotsController;
use App\Http\Controllers\MeetingTypeController;
use App\Http\Controllers\BookedSessionsController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\RatingController;


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

Route::get('/days', [DayController::class, 'index'] );
Route::get('/hours', [HourController::class, 'index'] );

Route::middleware('auth:sanctum')->post('/timeslots', [TimeslotsController::class, 'store'] );
Route::middleware('auth:sanctum')->get('/timeslots', [TimeslotsController::class, 'index']);

Route::middleware('auth:sanctum')->get('/timeslots/sunday', [TimeslotsController::class, 'sunday']);
Route::middleware('auth:sanctum')->get('/timeslots/monday', [TimeslotsController::class, 'monday']);
Route::middleware('auth:sanctum')->get('/timeslots/tuesday', [TimeslotsController::class, 'tuesday']);
Route::middleware('auth:sanctum')->get('/timeslots/wednesday', [TimeslotsController::class, 'wednesday']);
Route::middleware('auth:sanctum')->get('/timeslots/thursday', [TimeslotsController::class, 'thursday']);
Route::middleware('auth:sanctum')->get('/timeslots/friday', [TimeslotsController::class, 'friday']);
Route::middleware('auth:sanctum')->get('/timeslots/saturday', [TimeslotsController::class, 'saturday']);
Route::middleware('auth:sanctum')->get('/timeslots/hours', [TimeslotsController::class, 'hours']);
Route::middleware('auth:sanctum')->post('/timeslots/hours/update', [TimeslotsController::class, 'update']);

Route::middleware('auth:sanctum')->post('/meetingtype', [MeetingTypeController::class, 'updateOrCreate'] );
Route::middleware('auth:sanctum')->get('/meetingtype', [MeetingTypeController::class, 'index'] );
Route::middleware('auth:sanctum')->get('/meetingtype/tutors', [MeetingTypeController::class, 'meetingType'] );


Route::middleware('auth:sanctum')->get('/profile', [ProfileController::class, 'index'] );
Route::middleware('auth:sanctum')->post('/profile/update', [ProfileController::class, 'update'] );

Route::middleware('auth:sanctum')->get('/user/tutor', [UserController::class, 'getTutor']);
Route::middleware('auth:sanctum')->post('/user/photo', [UserController::class, 'storeImage']);
Route::middleware('auth:sanctum')->post('/user/update', [UserController::class, 'update']);
Route::middleware('auth:sanctum')->get('/user_profile', [UserController::class, 'tutors'] );

Route::middleware('auth:sanctum')->post('/user/video', [VideoController::class, 'store'] );
Route::middleware('auth:sanctum')->get('/user/videos', [VideoController::class, 'index'] );

Route::middleware('auth:sanctum')->post('/user/address', [AddressController::class, 'store']);
Route::middleware('auth:sanctum')->get('/user/address', [AddressController::class, 'index']);

Route::middleware('auth:sanctum')->get('/categories', [CategoryController::class, 'index']);
Route::middleware('auth:sanctum')->get('/courses', [CourseController::class, 'index']);

Route::middleware('auth:sanctum')->post('/tutor/courses', [TutorCoursesController::class, 'store']);
Route::middleware('auth:sanctum')->get('/tutor/courses', [TutorCoursesController::class, 'index']);
Route::middleware('auth:sanctum')->get('/course/tutors', [TutorCoursesController::class, 'courses'] );
Route::middleware('auth:sanctum')->get('/user/tutor/courses', [TutorCoursesController::class, 'getTutorCourses']);

Route::middleware('auth:sanctum')->post('/book/session', [BookedSessionsController::class, 'store']);
Route::middleware('auth:sanctum')->get('/user/sessions', [BookedSessionsController::class, 'index']);
Route::middleware('auth:sanctum')->post('/cancel/session', [BookedSessionsController::class, 'delete']);
Route::middleware('auth:sanctum')->post('/update/session', [BookedSessionsController::class, 'update']);

Route::middleware('auth:sanctum')->post('/chat/users', [ChatController::class, 'store']);
Route::middleware('auth:sanctum')->get('/chat/users', [ChatController::class, 'index']);

Route::middleware('auth:sanctum')->post('/user/rating', [RatingController::class, 'store']);
Route::middleware('auth:sanctum')->get('/user/rating', [RatingController::class, 'index']);
Route::middleware('auth:sanctum')->get('/tutor/ratings', [RatingController::class, 'ratings']);










