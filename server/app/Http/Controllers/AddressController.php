<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmAddressRequest;
use App\Http\Requests\PersistAddressRequest;
use App\Models\Address;
use App\Services\AddressService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Http;

class AddressController extends Controller {

    public function persist(PersistAddressRequest $request, AddressService $service) {
        $address = Address::where("city", $request->city)
            ->where("street", $request->street)
            ->where("address_number", $request->addressNumber)
            ->where("apartment_number", $request->apartmentNumber)
            ->first();

        if (isset($address)) {
            $service->updatePostalCode($address, $request);
            return new JsonResponse($address->id, Response::HTTP_OK);
        }

        return new JsonResponse($service->create($request), Response::HTTP_CREATED);
    }
}
