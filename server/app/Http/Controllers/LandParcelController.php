<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistLandParcelRequest;
use App\Models\LandParcel;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LandParcelController extends Controller {

    public function persist(PersistLandParcelRequest $request) {
        $landParcel = LandParcel::find($request->id);

        if (is_null($landParcel)) {
            $landParcel = LandParcel::create($request->all());

            return new JsonResponse($landParcel->id, Response::HTTP_CREATED);
        }
        $landParcel->fill($request->all());
        $landParcel->save();

        return response($landParcel->id, Response::HTTP_OK);
    }
}
