<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Days extends Model
{
    use HasFactory;

    public function Dtimeslots()
    {
        return $this->hasMany(Timeslots::class);
    }

    public function sessionDays()
    {
        return $this->hasMany(Booked_Sessions::class);
    }
}
