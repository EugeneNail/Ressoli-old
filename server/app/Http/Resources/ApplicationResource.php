<?php

namespace App\Http\Resources;

use App\Traits\HasApplicableSelect;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource {
    use HasApplicableSelect;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            "id" => $this->id,
            "user" => [
                "name" => $this->user->name,
                "surname" => $this->user->surname
            ],
            "client" => [
                "id" => $this->client->id,
                "name" => $this->client->name,
                "surname" => $this->client->surname,
                "phoneNumber" => $this->client->phone_number->id,
            ],
            "address" => [
                "id" => $this->address->id,
                "typeOfCity" => $this->address->type_of_city,
                "city" => $this->address->city,
                "typeOfStreet" => $this->address->type_of_street,
                "street" => $this->address->street,
                "houseNumber" => $this->address->house_number,
                "label" => $this->address->label,
                "position" => $this->address->position
            ],
            "applicable" => $this->selectApplicable(),
            "photos" => $this->photos,
            "contract" => [
                "hasVat" => $this->has_vat,
                "hasMortgage" => $this->has_mortgage,
                "price" => $this->price,
                "contract" => $this->contract,
            ],
            "date" => Carbon::createFromFormat("Y-m-d H:i:s", $this->created_at)->format("Y-m-d"),
        ];
    }
}
