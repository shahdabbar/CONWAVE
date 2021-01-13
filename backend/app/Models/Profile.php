<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    protected $guarded = [];  

    public function user()
    {
        return $this->belongsTo(User::class)->where("type", "tutor");
    }

    public function university()
    {
        return $this->belongsTo(University::class);
    }

    public function major()
    {
        return $this->belongsTo(Major::class);
    }

    public function degree()
    {
        return $this->belongsTo(Degree::class);
    }
}
