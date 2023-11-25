<?php

namespace App\Http\Resources;

use App\Models\House;
use App\Models\Plot;
use App\Traits\HasApplicableSelect;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditableApplicationResource extends JsonResource {

    use HasApplicableSelect;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {

        return [
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
            ],
            "applicable" => $this->selectApplicable(),
            "photos" => $this->photos,
            "contract" => [
                "hasVat" => $this->has_vat,
                "hasMortgage" => $this->has_mortgage,
                "price" => $this->price,
                "contract" => $this->contract,
            ],
        ];
    }
}
