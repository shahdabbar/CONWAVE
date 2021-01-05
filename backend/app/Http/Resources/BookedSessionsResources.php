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
            'location' => $this->location,
            'firstname' => $this->timeslots->users->firstname,
            'lastname' => $this->timeslots->users->firstname,
            'profile_photo_path' => $this->timeslots->users->profile_photo_path,
            'course_name' => $this->course->name,
            'day' => $this->timeslots->days->day,
            'hour' => $this->timeslots->hours->hour,
        ];
    }
}
