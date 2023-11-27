<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\ApartmentApplicationController;
use App\Http\Controllers\ApartmentController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DropOptionController;
use App\Http\Controllers\HouseApplicationController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\PlotApplicationController;
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

    Route::group(["prefix" => "applications"], function () {
        Route::group(["prefix" => "plots"], function () {
            Route::post("/", [PlotApplicationController::class, "store"]);
            Route::get("/", [PlotApplicationController::class, "index"]);
            Route::put("/{id}", [PlotApplicationController::class, "update"]);
            Route::get("/{id}", [PlotApplicationController::class, "show"]);
        });

        Route::group(["prefix" => "houses"], function () {
            Route::post("/", [HouseApplicationController::class, "store"]);
            Route::get("/", [HouseApplicationController::class, "index"]);
            Route::put("/{id}", [HouseApplicationController::class, "update"]);
            Route::get("/{id}", [HouseApplicationController::class, "show"]);
        });

        Route::group(["prefix" => "apartments"], function () {
            Route::post("/", [ApartmentApplicationController::class, "store"]);
            Route::get("/", [ApartmentApplicationController::class, "index"]);
            Route::put("/{id}", [ApartmentApplicationController::class, "update"]);
            Route::get("/{id}", [ApartmentApplicationController::class, "show"]);
        });
    });

    Route::post("/addresses", [AddressController::class, "persist"]);

    Route::post("/plots", [PlotController::class, "persist"]);

    Route::post("/houses", [HouseController::class, "persist"]);

    Route::post("/apartments", [ApartmentController::class, "persist"]);

    Route::post("applications/check-validity", [ApplicationController::class, "checkValidity"]);

    Route::group(["prefix" => "options"], function () {
        Route::get("/address", [DropOptionController::class, "forAddress"]);
        Route::get("/contract", [DropOptionController::class, "forContract"]);
        Route::get("/plot", [DropOptionController::class, "forPlot"]);
        Route::get("/house", [DropOptionController::class, "forHouse"]);
        Route::get("/apartments", [DropOptionController::class, "forApartment"]);
    });

    Route::group(["prefix" => "photos"], function () {
        Route::post("/upload-temp", [PhotoController::class, "uploadTemp"]);
        Route::delete("/{id}", [PhotoController::class, "delete"]);
    });
});
