<?php

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\CommitteeController;
use App\Http\Controllers\UserController;

Route::post('login', [UserController::class, 'login']);
Route::post('register',[UserController::class,'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('games', GameController::class);
    Route::apiResource('committees', UserController::class);
    Route::post('games/{game}/committees/{committee}', [GameController::class, 'assignCommittee']);
});


