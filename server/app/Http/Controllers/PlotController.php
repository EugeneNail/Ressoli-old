<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlotRequest;
use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PlotController extends Controller {

    public function store(StorePlotRequest $request) {
        $plot = Plot::create($request->all());
        return response($plot->id, Response::HTTP_CREATED);
    }
}
