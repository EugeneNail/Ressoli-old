<?php

namespace App\Http\Controllers;

use App\Models\Plot;
use App\Http\Requests\StorePlotRequest;
use App\Http\Requests\UpdatePlotRequest;

class PlotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePlotRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Plot $plot)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePlotRequest $request, Plot $plot)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plot $plot)
    {
        //
    }
}
