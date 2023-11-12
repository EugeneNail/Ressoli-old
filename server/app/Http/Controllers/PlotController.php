<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmPlotRequest;
use App\Models\NonORM\PlotOptions;
use App\Models\Plot;
use Illuminate\Http\Request;

class PlotController extends Controller {

    public function confirm(ConfirmPlotRequest $request) {
        return response()->noContent();
    }
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Plot $plot) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plot $plot) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plot $plot) {
        //
    }
}
