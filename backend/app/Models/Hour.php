<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hour extends Model
{
    use HasFactory;

    public function Htimeslots()
    {
        return $this->hasMany(Timeslots::class);
    }

    public function sessionHours()
    {
        return $this->hasMany(Booked_Sessions::class);
    }
}
