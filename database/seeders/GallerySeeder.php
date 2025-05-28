<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Gallery::create([
            'name' => 'Roblox',
            'category' => 'showcase',
            'image_path' => 'galleries/jsadlfjajdjklf.png',
            'slug' => 'jsadlfjajdjklf'
        ]);

        Gallery::create([
            'name' => 'Minecraft',
            'category' => 'showcase',
            'image_path' => 'galleries/jsadlfjsdfhgfds.png',
            'slug' => 'jsadlfjsdfhgfds'
        ]);
    }
}
