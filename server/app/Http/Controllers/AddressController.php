<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmAddressRequest;
use App\Http\Requests\PersistAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class AddressController extends Controller {

    public function persist(PersistAddressRequest $request) {
        $address = Address::where("city", $request->city)
            ->where("street", $request->street)
            ->where("address_number", $request->addressNumber)
            ->where("apartment_number", $request->apartmentNumber)
            ->first();

        if (isset($address)) {
            if ($address->postal_code === null) {
                $address->postal_code = $request->postalCode;
                $address->save();
            }

            return response($address->id, Response::HTTP_OK);
        }

        $response = Http::get("https://geocode-maps.yandex.ru/1.x/", [
            "apikey" => $_ENV["YANDEX_API_KEY"],
            "format" => "json",
            "geocode" => "$request->city, $request->typeOfStreet $request->street, $request->houseNumber"
        ]);
        $geoObject = $response->object()->response->GeoObjectCollection->featureMember[0]->GeoObject;
        $address = Address::create([
            "city" => $request->city,
            "street" => $request->street,
            "address_number" => $request->addressNumber,
            "label" => $geoObject->metaDataProperty->GeocoderMetaData->text,
            "position" => implode(" ", array_reverse(explode(" ", $geoObject->Point->pos))),
            "postal_code" => $request->postalCode

        ]);

        return response($address->id, Response::HTTP_CREATED);
    }
}
