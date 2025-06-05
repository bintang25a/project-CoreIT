<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'name',
        'category',
        'path'
    ];

    public function staff()
    {
        return $this->hasMany(Staff::class, 'photo_id');
    }

    public function informationMainImage()
    {
        return $this->hasMany(Information::class, 'main_image_id');
    }

    public function informationBodyImage()
    {
        return $this->hasMany(Information::class, 'body_image_id');
    }
}
