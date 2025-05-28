<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Staff extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $table = 'staffs';

    protected $fillable = ['position', 'nim', 'photo_id', 'password'];

    protected $hidden = ['password'];

    public function user() {
        return $this->belongsTo(User::class, 'nim', 'nim');
    }

    public function gallery() {
        return $this->belongsTo(Gallery::class, 'photo_id');
    }
 
    public function getJWTIdentifier() {
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }
}
