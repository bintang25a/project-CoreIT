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
            'category' => 'program',
            'path' => 'galleries/jsadlfjajdjklf.png',
        ]);

        Gallery::create([
            'name' => 'Minecraft',
            'category' => 'program',
            'path' => 'galleries/jsadlfjsdfhgfds.png',
        ]);
    }
}
