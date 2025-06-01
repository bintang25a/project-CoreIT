<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Bintang Al Fizar',
            'nim' => '01062025',
            'prodi' => 'Teknik Informatika',
            'email' => 'bintangalfizar25@gmail.com',
            'phone_number' => '082111710709',
            'division_id' => 1,
            'role' => 'admin'
        ]);
    }
}
