<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CoreitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $files = [
            database_path('sql/1-galleries_import.sql'),
            database_path('sql/2-members_import.sql'),
            database_path('sql/3-staffs_import.sql'),
            database_path('sql/4-news_import.sql'),
        ];

        foreach ($files as $file) {
            $sql = file_get_contents($file);
            DB::unprepared($sql);
            echo "Imported: " . basename($file) . "\n";
        }
    }
}
