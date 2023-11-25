<?php

namespace App\Http\Resources;

use App\Models\House;
use App\Models\Plot;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EditableApplicationResource extends JsonResource {
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
            "applicable" => $this->chooseApplicable(),
            "photos" => $this->photos,
            "contract" => [
                "hasVat" => $this->has_vat,
                "hasMortgage" => $this->has_mortgage,
                "price" => $this->price,
                "contract" => $this->contract,
            ],
        ];
    }

    private function chooseApplicable(): array {
        if ($this->applicable_type === House::class) {
            return [
                "id" => $this->applicable->id,
                "levelCount" => $this->applicable->level_count,
                "ceiling" => $this->applicable->ceiling,
                "roomCount" => $this->applicable->room_count,
                "landArea" => $this->applicable->land_area,
                "area" => $this->applicable->area,
                "water" => $this->applicable->water,
                "gas" => $this->applicable->gas,
                "electricity" => $this->applicable->electricity,
                "sewer" => $this->applicable->sewer,
                "walls" => $this->applicable->walls,
                "hotWater" => $this->applicable->hot_water,
                "condition" => $this->applicable->condition,
                "heating" => $this->applicable->heating,
                "bath" => $this->applicable->bath,
                "toilet" => $this->applicable->toilet,
                "hasGarage" => $this->applicable->has_garage,
                "constructionTime" => $this->applicable->construction_time,
                "roof" => $this->applicable->roof
            ];
        }

        if ($this->applicable_type === Plot::class) {
            return [
                "id" => $this->applicable->id,
                "gas" => $this->applicable->gas,
                "sewer" => $this->applicable->sewer,
                "water" => $this->applicable->water,
                "electricity" => $this->applicable->electricity,
                "area" => $this->applicable->area,
            ];
        }
    }
}
