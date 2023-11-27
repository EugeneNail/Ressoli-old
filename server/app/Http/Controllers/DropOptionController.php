<?php

namespace App\Http\Controllers;

use App\Services\DropOptionsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DropOptionController extends Controller {

    public function forAddress(DropOptionsService $options) {
        return new JsonResponse($options->forAddress(), Response::HTTP_OK);
    }

    public function forPlot(DropOptionsService $options) {
        return new JsonResponse($options->forPlot(), Response::HTTP_OK);
    }

    public function forContract(DropOptionsService $options) {
        return new JsonResponse($options->forContract(), Response::HTTP_OK);
    }
}
