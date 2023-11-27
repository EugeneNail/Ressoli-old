<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistApartmentRequest;
use App\Models\Apartment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApartmentController extends Controller {
    public function persist(PersistApartmentRequest $request) {
        $apartment = Apartment::find($request->id);
        $fields = [
            "has_water"  => $request->hasWater,
            "has_gas"  => $request->hasGas,
            "has_electricity"  => $request->hasElectricity,
            "has_sewer"  => $request->hasSewer,
            "has_hot_water" => $request->hasHotWater,
            "has_garage"  => $request->hasGarage,
            "has_garbage_chute"  => $request->hasGarbageChute,
            "has_elevator"  => $request->hasElevator,
            "is_corner" => $request->isCorner,
            "has_heating" => $request->hasHeating,
            "has_loggia"  => $request->hasLoggia,
            "has_balcony"  => $request->hasBalcony,
            "condition" => $request->condition,
            "walls" => $request->walls,
            "bath" => $request->bath,
            "toilet" => $request->toilet,
            "construction_time" => $request->constructionTime,
            "area" => $request->area,
            "room_count" => $request->roomCount,
            "level_count" => $request->levelCount,
            "level" => $request->level,
            "ceiling" => $request->ceiling,
        ];

        if (is_null($apartment)) {
            $apartment = Apartment::create($fields);
            return new JsonResponse($apartment->id, Response::HTTP_CREATED);
        }
        $apartment->fill($fields);
        $apartment->save();

        return new JsonResponse($apartment->id, Response::HTTP_OK);
    }
}
