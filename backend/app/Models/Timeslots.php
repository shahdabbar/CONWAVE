<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timeslots extends Model
{
    use HasFactory;
    protected $guarded = [];  

    public function hours()
    {
        return $this->belongsTo(Hour::class);
    }

    public function days()
    {
        return $this->belongsTo(Days::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }

}
