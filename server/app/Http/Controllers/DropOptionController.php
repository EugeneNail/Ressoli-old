<?php

namespace App\Http\Controllers;

use App\Services\DropOptionsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class DropOptionController extends Controller {

    private DropOptionsService $options;

    public function __construct(DropOptionsService $dropOptionsService) {
        $this->options = $dropOptionsService;
    }

    public function forAddress() {
        return new JsonResponse($this->options->forAddress(), Response::HTTP_OK);
    }

    public function forContract() {
        return new JsonResponse($this->options->forContract(), Response::HTTP_OK);
    }

    public function forPlot() {
        return new JsonResponse($this->options->forPlot(), Response::HTTP_OK);
    }

    public function forHouse() {
        return new JsonResponse($this->options->forHouse(), Response::HTTP_OK);
    }

    public function forApartment() {
        return new JsonResponse($this->options->forApartment(), Response::HTTP_OK);
    }
}
