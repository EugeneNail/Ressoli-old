<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AddressController extends Controller {
    public function store(StoreAddressRequest $request) {
        $existingAddress = Address
            ::where("city", $request->city)
            ->where("street", $request->street)
            ->where("house_number", $request->houseNumber)
            ->first();

        if ($existingAddress) {
            return response($existingAddress->id, Response::HTTP_OK);
        }

        $newAddress = Address::create([
            "city" => $request->city,
            "street" => $request->street,
            "house_number" => $request->houseNumber
        ]);
        return response($newAddress->id, Response::HTTP_CREATED);
    }
}
