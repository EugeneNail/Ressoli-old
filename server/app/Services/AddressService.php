<?php

namespace App\Services;

use App\Models\Address;
use App\Rules\AddressNumberRule;
use App\Rules\StreetRule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AddressService {

    public function updatePostalCode(Address $address, Request $request): void {
        if ($address->postal_code === null) {
            $address->postal_code = $request->postalCode;
            $address->save();
        }
    }

    public function create(Request $request): int {
        return Address::create([
            "city" => $request->city,
            "street" => $request->street,
            "address_number" => $request->addressNumber,
            "label" => "No data",
            "position" => $this->performGeocoding($request),
            "postal_code" => $request->postalCode
        ])->id;
    }

    public function performGeocoding(Request $request): string {
        $response = Http::get("https://geocode-maps.yandex.ru/1.x/", [
            "apikey" => $_ENV["YANDEX_API_KEY"],
            "format" => "json",
            "geocode" => "$request->city, $request->typeOfStreet $request->street, $request->houseNumber"
        ]);
        $geoObject = $response->object()->response->GeoObjectCollection->featureMember[0]->GeoObject;

        return implode(" ", array_reverse(explode(" ", $geoObject->Point->pos)));
    }

    public function rules(string $prefix = null, bool $isFull = false): array {
        $rules = [
            $prefix . "city" => ["required", "alpha"],
            $prefix . "street" => ["required", new StreetRule()],
            $prefix . "addressNumber" => ["required", new AddressNumberRule()],
        ];

        if ($isFull) {
            $rules[$prefix . "apartmentNumber"] = ["required", new AddressNumberRule()];
        }

        return $rules;
    }
}
