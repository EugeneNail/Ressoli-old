<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHouseApplicationRequest;
use App\Http\Requests\UpdateHouseApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Application;
use App\Models\House;
use App\Services\ApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class HouseApplicationController extends Controller {
    public function store(StoreHouseApplicationRequest $request, ApplicationService $service) {
        $application = new Application();
        $service->fill($application, $request);
        $house = House::find($request->applicableId);
        $service->associateDependencies($application, $request, $house);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse($application->id, Response::HTTP_CREATED);
    }

    public function index() {
        $houseApplications = Application::with(["address", "applicable"])
            ->where("applicable_type", House::class)->get();

        return new JsonResponse(ShortApplicationResource::collection($houseApplications), Response::HTTP_OK);
    }

    public function show(int $id) {
        $application = Application::find($id);

        return new JsonResponse(new ApplicationResource($application), Response::HTTP_OK);
    }

    public function update(UpdateHouseApplicationRequest $request, int $id, ApplicationService $service) {
        $application = Application::find($id);
        $service->fill($application, $request);
        $house = House::find($request->applicableId);
        $service->associateDependencies($application, $request, $house);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
