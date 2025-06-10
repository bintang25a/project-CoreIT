<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ini_set('upload_max_filesize', '10M');
        ini_set('post_max_size', '12M');

        DB::listen(function ($query) {
            Log::info("SQL Executed: " . $query->sql);
            Log::info("Bindings: " . json_encode($query->bindings));
            Log::info("Time: " . $query->time . "ms");
        });
    }
}
