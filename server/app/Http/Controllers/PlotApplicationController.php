<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlotApplicationRequest;
use App\Http\Requests\UpdatePlotApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Application;
use App\Models\Plot;
use App\Services\ApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PlotApplicationController extends Controller {

    public function store(StorePlotApplicationRequest $request, ApplicationService $service) {
        $application = new Application();
        $service->fill($application, $request);
        $plot = Plot::find($request->applicableId);
        $service->associateDependencies($application, $request, $plot);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse($application->id, Response::HTTP_CREATED);
    }

    public function show(Request $request, int $id) {
        $application = Application::find($id);
        return new JsonResponse(new ApplicationResource($application), Response::HTTP_OK);
    }

    public function index() {
        $plotApplications = Application::with(["address", "applicable"])
            ->where("applicable_type", Plot::class)->get();

        return new JsonResponse(ShortApplicationResource::collection($plotApplications), Response::HTTP_OK);
    }

    public function update(UpdatePlotApplicationRequest $request, int $id, ApplicationService $service) {
        $application = Application::find($id);
        $service->fill($application, $request);
        $plot = Plot::find($request->applicableId);
        $service->associateDependencies($application, $request, $plot);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
