<?php

namespace App\Http\Controllers;

use App\Http\Requests\PersistClientRequest;
use App\Models\Client;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\MessageBag;

class ClientController extends Controller {

    public function persist(PersistClientRequest $request) {
        $client = Client::where("phone_number", $request->phoneNumber)->first();

        if (is_null($client)) {
            $client = Client::create([
                "name" => $request->name,
                "surname" => $request->surname,
                "phone_number" => $request->phoneNumber
            ]);

            return response($client->id, Response::HTTP_CREATED);
        }

        if ($client->name === $request->name && $client->surname === $request->surname) {
            return response($client->id, Response::HTTP_OK);
        }

        $errors = ["errors" => (new MessageBag())->add("phoneNumber", "Номер телефона уже принадлежит другому клиенту.")];
        return response($errors, Response::HTTP_CONFLICT);
    }
}
