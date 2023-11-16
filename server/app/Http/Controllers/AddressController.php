<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmAddressRequest;
use App\Http\Requests\StoreAddressRequest;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


class AddressController extends Controller {

    public function store(StoreAddressRequest $request) {
        $address = Address::where("city", $request->city)
            ->where("street", $request->street)
            ->where("house_number", $request->houseNumber)
            ->first();

        if (isset($address)) {
            return response($address->id, Response::HTTP_OK);
        }

        $address = Address::create([
            "city" => $request->city,
            "street" => $request->street,
            "house_number" => $request->houseNumber
        ]);

        return response($address->id, Response::HTTP_CREATED);
    }
}
