<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Information;

class InformationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Information::create([
            'title' => 'Exploring the Future of Technology',
            'main_image_id' => 1,
            'body_image_id' => 2,
            'paragraph_1' => 'Technology continues to evolve rapidly, shaping the way we live, work, and communicate in unprecedented ways.',
            'paragraph_2' => 'From artificial intelligence to quantum computing, each advancement pushes the boundaries of what is possible and opens new frontiers for exploration.',
            'paragraph_3' => 'In the near future, we can expect even greater integration of technology into our daily lives, creating both exciting opportunities and important ethical challenges to navigate.',
        ]);
    }
}
