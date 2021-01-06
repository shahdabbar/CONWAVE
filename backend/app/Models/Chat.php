<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    use HasFactory;
    protected $guarded = [];  

    public function users()
    {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function tutors()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}
