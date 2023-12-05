<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistClientRequest;
use App\Models\Client;
use App\Models\PhoneNumber;
use App\Services\ClientService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\MessageBag;

class ClientController extends Controller {

    public function persist(PersistClientRequest $request, ClientService $service) {
        $client = Client::where("phone_number", $request->phoneNumber)->first();

        if (is_null($client)) {
            return new JsonResponse($service->create($request), Response::HTTP_CREATED);
        }

        if ($client->name === $request->name && $client->surname === $request->surname) {
            return new JsonResponse($client->id, Response::HTTP_OK);
        }

        $errors = ["errors" => (new MessageBag())->add("phoneNumber", "Номер телефона уже принадлежит другому клиенту.")];
        return new JsonResponse($errors, Response::HTTP_CONFLICT);
    }
}
