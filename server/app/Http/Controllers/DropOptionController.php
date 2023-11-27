<?php

namespace App\Http\Controllers;

use App\Services\DropOptionsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DropOptionController extends Controller {

    public function getForApplication(Request $request, DropOptionsService $options) {
        $applicableType = $request->input("type");
        $applicableOptions = null;

        if ($applicableType === "house") {
            $applicableOptions = $options->forHouse();
        } else if ($applicableType === "plot") {
            $applicableOptions = $options->forPlot();
        } else if ($applicableType === "apartment") {
            $applicableOptions = $options->forApartment();
        }
        $applicationOptions = [
            "address" => $options->forAddress(),
            "applicable" => $applicableOptions,
            "contract" => $options->forContract()
        ];

        return new JsonResponse($applicationOptions);
    }
}
