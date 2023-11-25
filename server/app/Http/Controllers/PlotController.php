<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistPlotRequest;
use App\Models\Plot;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PlotController extends Controller {

    public function persist(PersistPlotRequest $request) {
        $plot = Plot::find($request->id);

        if (is_null($plot)) {
            $plot = Plot::create($request->all());

            return new JsonResponse($plot->id, Response::HTTP_CREATED);
        }
        $plot->fill($request->all());
        $plot->save();

        return response($plot->id, Response::HTTP_OK);
    }
}
