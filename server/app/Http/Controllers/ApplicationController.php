<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\EditableApplicationResource;
use App\Http\Resources\ShortApplicationResource;
use App\Models\Address;
use App\Models\Application;
use App\Models\Client;
use App\Models\House;
use App\Models\Photo;
use App\Models\Plot;
use App\Services\DropOptionsService;
use Illuminate\Database\Eloquent\Model;
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

    private function findApplicable(string $type, int $id): Model {
        if ($type === "plot") {
            return Plot::find($id);
        } else {
            return House::find($id);
        }
    }

    public function persist(PersistApplicationRequest $request) {
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

        $applicable = $this->findApplicable($request->type, $request->applicableId);

        $application->user()->associate($request->user());
        $application->client()->associate($client);
        $application->address()->associate($address);
        $application->applicable()->associate($applicable);

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
