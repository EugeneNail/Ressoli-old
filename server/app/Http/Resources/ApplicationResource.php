<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource {
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
                "name" => $this->client->name,
                "surname" => $this->client->surname,
                "phoneNumber" => $this->client->phone_number->id,
            ],
            "address" => [
                "city" => $this->address->city,
                "street" => $this->address->street,
                "houseNumber" => $this->address->house_number,
            ],
            "applicable" => [
                "gas" => $this->applicable->gas,
                "sewer" => $this->applicable->sewer,
                "water" => $this->applicable->water,
                "electricity" => $this->applicable->electricity,
                "area" => $this->applicable->area,
            ],
            "photos" => $this->photos->map(fn ($photo) => $photo->path),
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
