<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TutorResources extends JsonResource
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
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'location' => $this->location, 
            'type' => $this->type,
            'profile_photo_path' => $this->profile_photo_path,
            'bio' => $this->profile->bio,
            'university' => $this->profile->university->name,
            'major' => $this->profile->major->name,
            'courses' => $this->courses,
            // 'tutored_students' => $this->sessions

        ];
    }
}
