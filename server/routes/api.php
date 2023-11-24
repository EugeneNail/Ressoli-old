<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DropOptionController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\PlotController;
use App\Services\DropOptionsService;
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
Route::post("/login", [AuthController::class, "login"]);
Route::post("/signup", [AuthController::class, "signup"]);

Route::group(["middleware" => "auth:sanctum"], function () {
    Route::post("/authenticate", [AuthController::class, "authenticate"])->middleware("auth:sanctum");
    Route::post("/logout", [AuthController::class, "logout"])->middleware("auth:sanctum");

    Route::post("/clients", [ClientController::class, "persist"]);

    Route::post("/addresses", [AddressController::class, "persist"]);

    Route::post("/plots", [PlotController::class, "persist"]);

    Route::post("applications", [ApplicationController::class, "persist"]);
    Route::get("applications", [ApplicationController::class, "indexShort"]);
    Route::get("applications/{id}", [ApplicationController::class, "get"]);
    Route::get("applications/{id}/edit", [ApplicationController::class, "getForEdit"]);
    Route::post("applications/check-validity", [ApplicationController::class, "checkValidity"]);

    Route::get("/options/application", [DropOptionController::class, "getForApplication"]);

    Route::group(["prefix" => "photos"], function () {
        Route::post("/upload-temp", [PhotoController::class, "uploadTemp"]);
        Route::delete("/{id}", [PhotoController::class, "delete"]);
    });
});
