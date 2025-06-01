<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Information extends Model
{
    use HasFactory;

    protected $table = 'informations';

    protected $fillable = [
        'title',
        'main_image_id',
        'body_image_id',
        'paragraph_1',
        'paragraph_2',
        'paragraph_3',
        'views'
    ];

    public function mainImage() {
        return $this->belongsTo(Gallery::class, 'main_image_id');
    }

    public function bodyImage() {
        return $this->belongsTo(Gallery::class, 'body_image_id');
    }
}
