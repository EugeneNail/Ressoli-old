<?php

namespace App\Services;

use App\Models\Address;
use App\Models\Application;
use App\Models\Client;
use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationService {

    public function fill(Application $application, Request $request): void {
        $application->fill([
            "price" => $request->price,
            "contract" => $request->contract,
            "has_vat" => $request->hasVat,
            "has_mortgage" => $request->hasMortgage,
        ]);
    }

    public function associateDependencies(Application $application, Request $request, $applicable) {
        $application->user()->associate($request->user());
        $application->client()->associate(Client::find($request->clientId));
        $application->address()->associate(Address::find($request->addressId));
        $application->applicable()->associate($applicable);
    }

    public function savePhotos(Application $application, array $indices) {
        if (!empty($indices)) {
            $photos = Photo::findMany($indices);

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
    }
}
