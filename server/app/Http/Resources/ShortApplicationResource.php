<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShortApplicationResource extends JsonResource {
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array {
        $address = $this->address;

        return [
            "id" => $this->id,
            "preview" => $this->photos[0]->path,
            "contract" => $this->contract,
            "city" => $address->city,
            "street" => $address->street,
            "houseNumber" => $address->house_number,
            "price" => $this->price,
            "area" => $this->applicable->area,
            "hasWater" => $this->applicable->water !== "Нет",
            "hasElectricity" => $this->applicable->electricity !== "Нет",
            "hasGas" => $this->applicable->gas  !== "Нет",
            "date" => Carbon::createFromFormat("Y-m-d H:i:s", $this->created_at)->format("Y-m-d"),
        ];
    }
}
