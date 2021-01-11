<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BookedSessionsResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'date' => $this->date,
            'payment' => $this->payment,
            'meeting_type' => $this->meeting_type,
            'student_firstname' => $this->user->firstname,
            'student_lastname' => $this->user->lastname,
            'student_profile_photo_path' => $this->user->profile_photo_path,
            'address' => $this->tutor->address,
            'tutor_id' => $this->tutor->id,
            'tutor_firstname' => $this->tutor->firstname,
            'tutor_lastname' => $this->tutor->lastname,
            'tutor_profile_photo_path' => $this->tutor->profile_photo_path,
            'course_name' => $this->course->name,
            'course_description' => $this->course->tutorCourses->where('user_id', $this->tutor->id),
            'review' => $this->course->ratings->where('user_id', $this->user->id)->where('tutor_id', $this->tutor->id),
            'course_id' => $this->course->id,
            'note' => $this->note,
            'day' => $this->timeslots->days->day,
            'hour' => $this->timeslots->hours->hour,
        ];
    }
}
