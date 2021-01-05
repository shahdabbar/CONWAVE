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
        return $this->belongsTo(User::class);
    }

    public function day()
    {
        return $this->belongsTo(Days::class);
    }

    public function hour()
    {
        return $this->belongsTo(Hour::class);    }

    public function timeslots()
    {
        return $this->belongsTo(Timeslots::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

}
