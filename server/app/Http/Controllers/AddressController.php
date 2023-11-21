<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmAddressRequest;
use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class AddressController extends Controller {

    public function store(StoreAddressRequest $request) {
        $address = Address::where("type_of_city", $request->typeOfCity)
            ->where("city", $request->city)
            ->where("type_of_street", $request->typeOfStreet)
            ->where("street", $request->street)
            ->where("house_number", $request->houseNumber)
            ->first();

        if (isset($address)) {
            return response($address->id, Response::HTTP_OK);
        }

        $response = Http::get("https://geocode-maps.yandex.ru/1.x/", [
            "apikey" => $_ENV["YANDEX_API_KEY"],
            "format" => "json",
            "geocode" => "$request->city, $request->typeOfStreet $request->street, $request->houseNumber"
        ]);
        $geoObject = $response->object()->response->GeoObjectCollection->featureMember[0]->GeoObject;
        $address = Address::create([
            "type_of_city" => $request->typeOfCity,
            "city" => $request->city,
            "type_of_street" => $request->typeOfStreet,
            "street" => $request->street,
            "house_number" => $request->houseNumber,
            "label" => $geoObject->metaDataProperty->GeocoderMetaData->text,
            "position" => implode(" ", array_reverse(explode(" ", $geoObject->Point->pos)))
        ]);

        return response($address->id, Response::HTTP_CREATED);
    }
}
