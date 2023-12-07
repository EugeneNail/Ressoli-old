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
use App\Http\Controllers\LandParcelController;
use App\Http\Controllers\RoomApplicationController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\TermsController;
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
        Route::post("/land-parcels", [ApplicationController::class, "persistWithLandParcel"]);
        Route::get("/land-parcels", [ApplicationController::class, "index"]);
        Route::get("/land-parcels/{id}", [ApplicationController::class, "show"]);
        Route::post("/terms", [ApplicationController::class, "validateTerms"]);
    });

    Route::post("/addresses", [AddressController::class, "persist"]);

    Route::post("/land-parcels", [LandParcelController::class, "persist"]);

    Route::post("/houses", [HouseController::class, "persist"]);

    Route::post("/apartments", [ApartmentController::class, "persist"]);

    Route::post("/rooms", [RoomController::class, "persist"]);

    Route::post("/terms", [TermsController::class, "persist"]);

    Route::group(["prefix" => "options"], function () {
        Route::get("/address", [DropOptionController::class, "forAddress"]);
        Route::get("/terms", [DropOptionController::class, "forTerms"]);
        Route::get("/land-parcel", [DropOptionController::class, "forLandParcel"]);
        Route::get("/house", [DropOptionController::class, "forHouse"]);
        Route::get("/apartment", [DropOptionController::class, "forApartment"]);
        Route::get("/room", [DropOptionController::class, "forRoom"]);
    });

    Route::group(["prefix" => "photos"], function () {
        Route::post("/upload-temp", [PhotoController::class, "uploadTemp"]);
        Route::delete("/{id}", [PhotoController::class, "delete"]);
    });
});
