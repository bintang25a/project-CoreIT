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
            'nim' => '22040700020',
            'prodi' => 'Teknik Informatika',
            'email' => 'bintangalfizar25@gmail.com',
            'phone_number' => '082111710709',
            'division_id' => 1,
            'role' => 'bph'
        ]);

        User::create([
            'name' => 'member1',
            'nim' => '201001',
            'prodi' => 'Teknik Informatika',
            'email' => 'member1@gmail.com',
            'phone_number' => '082111710709',
            'division_id' => 2,
            'role' => 'member'
        ]);
        
        User::create([
            'name' => 'member2',
            'nim' => '201002',
            'prodi' => 'Teknik Informatika',
            'email' => 'member2@gmail.com',
            'phone_number' => '082111710708',
            'division_id' => 2,
            'role' => 'member'
        ]);
    }
}
