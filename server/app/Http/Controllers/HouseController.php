<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistHouseRequest;
use App\Models\House;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HouseController extends Controller {
    public function persist(PersistHouseRequest $request) {
        $house = House::find($request->id);
        $fields = [
            "water" => $request->water,
            "gas" => $request->gas,
            "sewer" => $request->sewer,
            "electricity" => $request->electricity,
            "level_count" => $request->levelCount,
            "room_count" => $request->roomCount,
            "area" => $request->area,
            "land_area" => $request->landArea,
            "ceiling" => $request->ceiling,
            "walls" => $request->walls,
            "hot_water" => $request->hotWater,
            "condition" => $request->condition,
            "heating" => $request->heating,
            "bath" => $request->bath,
            "toilet" => $request->toilet,
            "has_garage" => $request->hasGarage,
            "construction_time" => $request->constructionTime,
            "roof" => $request->roof
        ];

        if (is_null($house)) {
            $house = House::create($fields);

            return new JsonResponse($house->id, Response::HTTP_CREATED);
        }
        $house->fill($fields);
        $house->save();

        return new JsonResponse($house->id, 200);
    }
}
