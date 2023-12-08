<?php

namespace App\Services;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientService {

    public function create(Request $request): int {
        $client = Client::create([
            "name" => $request->name,
            "surname" => $request->surname,
            "phone_number" => $request->phoneNumber
        ]);
        return $client->id();
    }

    public function rules(string $prefix = null): array {
        return [
            $prefix . "name" => "required|alpha",
            $prefix . "surname" => "required|alpha",
            $prefix . "phoneNumber" => "required|regex:/^\+{0,1}[0-9]{11}$/",
        ];
    }
}
