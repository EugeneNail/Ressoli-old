<?php

namespace App\Http\Controllers;

use App\Services\DropOptionsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DropOptionController extends Controller {

    public function getForApplication(DropOptionsService $options) {
        $applicationOptions = [
            "address" => $options->collectAddress(),
            "applicable" => $options->collectPlot(),
            "contract" => $options->collectApplication()
        ];

        return new JsonResponse($applicationOptions);
    }
}
