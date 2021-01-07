<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booked_Sessions extends Model
{
    use HasFactory;
    protected $guarded = [];  

    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function timeslots()
    {
        return $this->belongsTo(Timeslots::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
