<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\InformationController;
use App\Http\Controllers\StaffController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('/divisions', DivisionController::class)->only(['index', 'show', 'store', 'destroy']);
Route::post('/divisions/{id}', [DivisionController::class, 'update']);
Route::get('/divisions/image/{name}', [DivisionController::class, 'showLogo']);

Route::apiResource('/galleries', GalleryController::class)->only(['index', 'show', 'store', 'destroy']);
Route::get('/galleries/image/{name}', [GalleryController::class, 'showImage']);

Route::apiResource('/members', UserController::class)->only(['index', 'show', 'store', 'destroy']);
Route::post('/members/{id}', [UserController::class, 'update']);

Route::apiResource('/staffs', StaffController::class)->only(['index', 'show', 'store', 'destroy']);
Route::post('/staffs/{id}', [StaffController::class, 'update']);

Route::apiResource('/news', InformationController::class)->only(['index', 'show', 'store', 'destroy']);
Route::post('/news/{id}', [InformationController::class, 'update']);

Route::post('/staffreg', [AuthController::class, 'staffreg']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api_staff')->group(function () {
    // Route::apiResource('/divisions', DivisionController::class)->only(['store', 'destroy']);
    // Route::post('/divisions/{id}', [DivisionController::class, 'update']);

    // Route::apiResource('/galleries', GalleryController::class)->only(['store', 'destroy']);

    // Route::apiResource('/members', UserController::class)->only('destroy');
    // Route::post('/members/{id}', [UserController::class, 'update']);

    // Route::apiResource('/staffs', StaffController::class)->only(['destroy']);
    // Route::post('/staffs/{id}', [StaffController::class, 'update']);

    // Route::apiResource('/news', InformationController::class)->only(['store', 'destroy']);
    // Route::post('/news/{id}', [InformationController::class, 'update']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
