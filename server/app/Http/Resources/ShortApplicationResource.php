<?php

namespace App\Http\Resources;

use App\Models\Apartment;
use App\Models\House;
use App\Models\Photo;
use App\Models\Plot;
use App\Models\Room;
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
            "preview" => count($this->photos) ? $this->photos[0]->path : "blank-plot.jpg",
            "contract" => $this->contract,
            "city" => $address->city,
            "street" => $address->street,
            "houseNumber" => $address->house_number,
            "price" => $this->price,
            "area" => $this->applicable->area,
            "applicable" => $this->selectShortApplicable(),
            "date" => Carbon::createFromFormat("Y-m-d H:i:s", $this->created_at)->format("Y-m-d"),
        ];
    }

    private function selectShortApplicable() {
        if ($this->applicable_type === House::class) {
            return [
                "constructionTime" => $this->applicable->construction_time,
                "landArea" => $this->applicable->land_area,
                "roomCount" => $this->applicable->room_count,
            ];
        }

        if ($this->applicable_type === Plot::class) {
            return [
                "hasWater" => $this->applicable->water !== "Нет",
                "hasElectricity" => $this->applicable->electricity !== "Нет",
                "hasGas" => $this->applicable->gas  !== "Нет",
            ];
        }

        if ($this->applicable_type === Apartment::class) {
            return [
                "roomCount" => $this->applicable->room_count,
                "hasGarage" => $this->applicable->has_garage,
                "level" => $this->applicable->level,
                "levelCount" => $this->applicable->level_count,
            ];
        }

        if ($this->applicable_type === Room::class) {
            return [
                "hasHeating" => $this->applicable->has_heating,
                "level" => $this->applicable->level,
                "levelCount" => $this->applicable->level_count,
                "hasBath" => $this->applicable->bath != "Нет"
            ];
        }
    }
}
