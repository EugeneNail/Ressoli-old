<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmClientRequest;
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

    public function confirm(ConfirmClientRequest $request) {
        $phoneNumber = PhoneNumber::find($request->phoneNumber);
        if (!$phoneNumber) {
            return response()->noContent();
        }
        $client = $phoneNumber->numberable;
        $hasConfirmedClient = $client->name === $request->name && $client->surname === $request->surname;
        if (!$hasConfirmedClient) {
            return response(["errors" => (new MessageBag())->add("phoneNumber", "Этот номер уже принадлежит другому клиенту.")], Response::HTTP_CONFLICT);
        }
        return response($client->id, Response::HTTP_OK);
    }

    public function index() {
        //
    }

    public function store(Request $request) {
        //
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
