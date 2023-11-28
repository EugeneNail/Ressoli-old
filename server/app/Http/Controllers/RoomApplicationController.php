<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoomApplicationRequest;
use App\Http\Requests\UpdateRoomApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Application;
use App\Models\Room;
use App\Services\ApplicationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RoomApplicationController extends Controller {
    public function index() {
        $applications = Application::with(["address", "applicable"])
            ->where("applicable_type", Room::class)
            ->get();

        return new JsonResponse(ShortApplicationResource::collection($applications), Response::HTTP_OK);
    }

    public function store(StoreRoomApplicationRequest $request, ApplicationService $service) {
        $application = new Application();
        $service->fill($application, $request);
        $room = Room::find($request->applicableId);
        $service->associateDependencies($application, $request, $room);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse($application->id, Response::HTTP_CREATED);
    }

    public function show(int $id) {
        $application = Application::find($id);

        return new JsonResponse(new ApplicationResource($application), Response::HTTP_OK);
    }

    public function update(UpdateRoomApplicationRequest $request, ApplicationService $service) {
        $application = Application::find($request->id);
        $service->fill($application, $request);
        $room = Room::find($request->applicableId);
        $service->associateDependencies($application, $request, $room);
        $application->save();
        $service->savePhotos($application, $request->photos);

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
