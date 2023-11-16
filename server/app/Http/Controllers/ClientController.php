<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Models\Client;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\MessageBag;

class ClientController extends Controller {

    public function store(StoreClientRequest $request) {
        $number = PhoneNumber::find($request->phoneNumber);

        if (is_null($number)) {
            $client = Client::create($request->all());
            $newNumber = new PhoneNumber(["id" => $request->phoneNumber]);
            $client->phone_number()->save($newNumber);
            $newNumber->save();
            return response($client->id, Response::HTTP_CREATED);
        }

        $client = $number->numberable;

        if ($client->name === $request->name && $client->surname === $request->surname) {
            return response($client->id, Response::HTTP_OK);
        }

        $errors = ["errors" => (new MessageBag())->add("phoneNumber", "Номер телефона уже принадлежит другому клиенту.")];
        return response($errors, Response::HTTP_CONFLICT);
    }
}
