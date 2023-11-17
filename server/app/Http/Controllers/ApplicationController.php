<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePlotApplicationRequest;
use App\Http\Requests\ValidateContractRequest;
use App\Models\Address;
use App\Models\Application;
use App\Models\Client;
use App\Models\Photo;
use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller {

    public function storePlotApplication(StorePlotApplicationRequest $request) {
        $application = new Application([
            "price" => $request->price,
            "has_vat" => $request->hasVat,
            "has_mortgage" => $request->hasMortgage,
        ]);

        $client = Client::find($request->clientId);
        $address = Address::find($request->addressId);
        $plot = Plot::find($request->applicableId);

        $application->user()->associate($request->user());
        $application->client()->associate($client);
        $application->address()->associate($address);
        $application->applicable()->associate($plot);
        $application->preview()->associate(Photo::find(1));

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
            $application->preview()->associate($photos[0]);
            $application->save();
        }

        return response($application->id, Response::HTTP_CREATED);
    }
}
