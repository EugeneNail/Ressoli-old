<?php

namespace App\Http\Controllers;

use App\Http\Requests\IndexApplicationsRequest;
use App\Http\Requests\PersistApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\CardApplicationResource;
use App\Http\Resources\EditableApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Address;
use App\Models\Apartment;
use App\Models\Application;
use App\Models\Client;
use App\Models\House;
use App\Models\Photo;
use App\Models\LandParcel;
use App\Models\Room;
use App\Models\Support\Rules;
use App\Services\ApplicationService;
use App\Services\DropOptionsService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\MessageBag;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller {

    private readonly ApplicationService $service;

    public function __construct(ApplicationService $applicationService) {
        $this->service = $applicationService;
    }

    private function typeToClassName(array $types): array {
        $map = [
            "land-parcel" => LandParcel::class,
            "house" => House::class,
            "room" => Room::class,
            "apartment" => Apartment::class
        ];
        return collect($types)->map(fn ($type) => $map[$type])->toArray();
    }

    public function show(int $id) {
        $application = Application::with("client", "address", "applicable", "terms")->find($id);
        $resource = new ApplicationResource($application);
        return new JsonResponse($resource);
    }

    public function index(IndexApplicationsRequest $request) {
        $applicableTypes = $this->typeToClassName($request->types);
        $applications = Application::query()->with([
            "client:clients.id,name",
            "address",
            "applicable",
            "photos",
        ])
            ->whereIn("applicable_type", $applicableTypes)
            ->get();
        $resources = CardApplicationResource::collection($applications);

        return new JsonResponse($resources, Response::HTTP_OK);
    }

    public function persistWithLandParcel(PersistApplicationRequest $request) {
        $errors = new MessageBag();

        $landParcel = LandParcel::find($request->applicableId);
        if (is_null($landParcel)) {
            $errors->add("applicableId", "No land parcel with this id was found");
        }

        if ($errors->isNotEmpty()) {
            return new JsonResponse(["errors" => $errors], Response::HTTP_CONFLICT);
        }

        $application = new Application();
        $application->is_active = isset($request->isActive);
        $this->service->associateDependencies($application, $request, $landParcel);
        $application->save();
        $this->service->savePhotos($application, $request->photoIds);

        return new JsonResponse($application->id, Response::HTTP_CREATED);
    }
}
