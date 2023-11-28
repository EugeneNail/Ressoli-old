<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistRoomRequest;
use App\Models\Room;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RoomController extends Controller {

    public function persist(PersistRoomRequest $request) {
        $room = Room::find($request->id);
        $fields = [
            "has_water" => $request->hasWater,
            "has_gas" => $request->hasGas,
            "has_electricity" => $request->hasElectricity,
            "has_sewer" => $request->hasSewer,
            "has_hot_water" => $request->hasHotWater,
            "has_heating" => $request->hasHeating,
            "has_elevator" => $request->hasElevator,
            "has_garbage_chute" => $request->hasGarbageChute,
            "walls" => $request->walls,
            "condition" => $request->condition,
            "bath" => $request->bath,
            "toilet" => $request->toilet,
            "level_count" => $request->levelCount,
            "level" => $request->level,
            "area" => $request->area,
            "ceiling" => $request->ceiling
        ];

        if (is_null($room)) {
            $room = Room::create($fields);

            return new JsonResponse($room->id, Response::HTTP_CREATED);
        }
        $room->fill($fields);
        $room->save();

        return new JsonResponse($room->id, Response::HTTP_OK);
    }
}
