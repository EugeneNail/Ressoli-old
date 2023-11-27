<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApartmentApplicationRequest;
use App\Http\Requests\UpdateApartmentApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Apartment;
use App\Models\Application;
use App\Models\House;
use App\Services\ApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ApartmentApplicationController extends Controller {
    public function index() {
        $applications = Application::with(["address", "applicable"])
            ->where("applicable_type", Apartment::class)
            ->get();
        return new JsonResponse(ShortApplicationResource::collection($applications), Response::HTTP_OK);
    }

    public function show(int $id) {
        $application = Application::find($id);

        return new JsonResponse(new ApplicationResource($application), Response::HTTP_OK);
    }

    public function store(StoreApartmentApplicationRequest $request, ApplicationService $service) {
        $application = new Application();
        $service->fill($application, $request);
        $apartment = Apartment::find($request->applicableId);
        $service->associateDependencies($application, $request, $apartment);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse($application->id, Response::HTTP_CREATED);
    }

    public function update(UpdateApartmentApplicationRequest $request, int $id, ApplicationService $service) {
        $application = Application::find($id);
        $service->fill($application, $request);
        $apartment = Apartment::find($request->applicableId);
        $service->associateDependencies($application, $request, $apartment);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
