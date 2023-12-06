<?php

namespace App\Http\Resources;

use App\Models\LandParcel;
use App\Traits\HasApplicableSelect;
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
            "isActive" => $this->is_active != null,
            "title" => $this->applicable->title,
            "client" => [
                "id" => $this->client->id,
                "name" => $this->client->name,
                "surname" => $this->client->surname,
                "phoneNumber" => $this->client->phone_number,
            ],
            "address" => [
                "id" => $this->address->id,
                "city" => $this->address->city,
                "street" => $this->address->street,
                "addressNumber" => $this->address->address_number,
                "apartmentNumber" => $this->address->apartment_number,
                "label" => $this->address->label,
                "position" => $this->address->position
            ],
            "applicable" => $this->selectApplicable(),
            "photos" => $this->photos,
            "hasVat" => $this->has_vat,
            "hasMortgage" => $this->has_mortgage,
            "price" => $this->price,
            "contract" => $this->contract,
            "date" => $this->created_at,
        ];
    }

    private function selectApplicable() {
        if ($this->applicable_type === LandParcel::class) {
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
