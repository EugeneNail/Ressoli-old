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

    public function store(StorePlotApplicationRequest $request, ApplicationService $applicationService) {
        $application = new Application();
        $applicationService->fill($application, $request);
        $plot = Plot::find($request->applicableId);
        $applicationService->associateDependencies($application, $request, $plot);
        $application->save();
        $applicationService->savePhotos($application, $request->photos);

        return new JsonResponse($application->id, Response::HTTP_CREATED);
    }

    public function show(Request $request, int $id) {
        $application = Application::find($id);
        return new ApplicationResource($application);
    }

    public function index() {
        $plotApplications = Application::with(["address", "applicable"])
            ->where("applicable_type", Plot::class)->get();

        return ShortApplicationResource::collection($plotApplications);
    }

    public function update(UpdatePlotApplicationRequest $request, int $id, ApplicationService $applicationService) {
        $application = Application::find($id);
        $applicationService->fill($application, $request);
        $plot = Plot::find($request->applicableId);
        $applicationService->associateDependencies($application, $request, $plot);
        $application->save();
        $applicationService->savePhotos($application, $request->photos);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
