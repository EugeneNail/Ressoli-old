<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PlotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get("/csrf", [CsrfCookieController::class, "show"])->middleware('web');
Route::post("/authenticate", [AuthController::class, "authenticate"])->middleware("auth:sanctum");
Route::post("/logout", [AuthController::class, "logout"])->middleware("auth:sanctum");
Route::post("/login", [AuthController::class, "login"]);
Route::post("/signup", [AuthController::class, "signup"]);

Route::group(["prefix" => "applications", "middleware" => "auth:sanctum"], function () {
    Route::apiResource("plots", PlotController::class);
});

Route::apiResource("clients", ClientController::class);
