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
            "address" => $options->forAddress(),
            "applicable" => $options->forPlot(),
            "contract" => $options->forContract()
        ];

        return new JsonResponse($applicationOptions);
    }
}
