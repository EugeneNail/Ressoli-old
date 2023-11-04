<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Models\Application;
use App\Models\Client;
use App\Models\PhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\MessageBag;
use Laravel\Prompts\Output\ConsoleOutput;

class ClientController extends Controller {
    public function index() {
        //
    }

    public function store(StoreClientRequest $request) {
        $phoneNumber = PhoneNumber::with("numberable")->find($request->phoneNumber);

        if (!$phoneNumber) {
            $newNumber = new PhoneNumber(["id" => $request->phoneNumber]);
            $client = Client::create($request->only("name", "surname"));
            $client->phone_number()->save($newNumber);
            return response($client->id, Response::HTTP_CREATED);
        }

        $oldClient = $phoneNumber->numberable;
        $clientExists = $oldClient->name === $request->name && $oldClient->surname === $request->surname;

        if (!$clientExists) {
            $errors = ["errors" => (new MessageBag())->add("phoneNumber", "Указанный номер уже принадлежит другому клиенту.")];
            return response($errors, Response::HTTP_CONFLICT);
        }

        return response($oldClient->id, Response::HTTP_OK);
    }

    public function show(string $id) {
        //
    }

    public function update(Request $request, string $id) {
        //
    }

    public function destroy(string $id) {
        //
    }
}
