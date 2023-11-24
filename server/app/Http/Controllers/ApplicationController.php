<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\EditableApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Address;
use App\Models\Application;
use App\Models\Client;
use App\Models\Photo;
use App\Models\Plot;
use App\Services\DropOptionsService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ApplicationController extends Controller {

    public function checkValidity(Request $request, DropOptionsService $options) {
        $request->validate([
            "contract" => ["required", Rule::in($options->forContract())],
            "price" => ["required", "numeric", "min:1", "max: 100000000"],
            "hasVat" => "boolean",
            "hasMortgage" => "boolean"
        ]);

        return response()->noContent();
    }

    public function get(Request $request, int $id) {
        $application = Application::find($id);
        return new ApplicationResource($application);
    }

    public function getForEdit(Request $request, int $id) {
        $application = Application::find($id);
        return new EditableApplicationResource($application);
    }

    public function indexShort(Request $request) {
        return ShortApplicationResource::collection(Application::all());
    }

    public function persist(StoreApplicationRequest $request) {
        $status = 204;
        $application = Application::find($request->id);

        if (is_null($application)) {
            $application = new Application();
            $status = 201;
        }

        $application->fill([
            "price" => $request->contract["price"],
            "contract" => $request->contract["contract"],
            "has_vat" => $request->contract["hasVat"],
            "has_mortgage" => $request->contract["hasMortgage"],
        ]);

        $client = Client::find($request->clientId);
        $address = Address::find($request->addressId);
        $plot = Plot::find($request->applicableId);

        $application->user()->associate($request->user());
        $application->client()->associate($client);
        $application->address()->associate($address);
        $application->applicable()->associate($plot);

        $application->save();

        if (!empty($request->photoIds)) {
            $photos = Photo::findMany($request->photoIds);

            foreach ($photos as $photo) {
                $oldPath = $photo->path;
                $newPath = str_replace("temp/", "", $oldPath);
                Storage::disk("public")->move($oldPath, $newPath);
                $photo->path = $newPath;
                $photo->save();
            }

            $application->photos()->saveMany($photos);
            $application->save();
        }

        return response($application->id, $status);
    }
}
