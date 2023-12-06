<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CardApplicationResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        return [
            "isActive" => $this->is_active !== null,
            "previewUrl" => count($this->photos) === 0 ? "blank-plot.jpg" : $this->photos[0]->path,
            "title" => $this->applicable->title ?? "Land Parcel",
            "address" => $this->getAddress(),
            "price" => $this->price,
            "type" => "land-parcel",
            "applicable" => [
                "hasWater" => $this->applicable->has_water != "None",
                "hasGas" => $this->applicable->has_gas != "None",
                "hasElectricity" => $this->applicable->has_electricity != "None",
                "area" => $this->applicable->area,
            ],
            "client" => $this->client->name,
            "date" => $this->created_at,
            "contract" => $this->contract,
        ];
    }

    private function getAddress() {
        $address = $this->address;
        return "{$address->address_number}, {$address->street}, {$address->city}";
    }
}
