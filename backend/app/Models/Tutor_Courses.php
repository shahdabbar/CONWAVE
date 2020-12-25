<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tutor_Courses extends Model
{
    use HasFactory;
    protected $guarded = [];  

    public function tutor()
    {
        return $this->belongsToMany(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
