<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Staff;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Staff::create([
            'position' => 'Ketua Product Publishing',
            'nim' => '22040700020',
            'photo_id' => 1,
            'password' => bcrypt('admin123')
        ]);
    }
}
