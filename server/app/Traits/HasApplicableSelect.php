<?php

namespace App\Traits;

use App\Models\Apartment;
use App\Models\House;
use App\Models\Plot;

trait HasApplicableSelect {

    private function selectApplicable(): array {
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

        if ($this->applicable_type === Apartment::class) {
            return [
                "id" => $this->applicable->id,
                "hasWater"  => $this->applicable->has_water,
                "hasGas"  => $this->applicable->has_gas,
                "hasElectricity"  => $this->applicable->has_electricity,
                "hasSewer"  => $this->applicable->has_sewer,
                "hasHotWater" => $this->applicable->has_hot_water,
                "hasGarage"  => $this->applicable->has_garage,
                "hasGarbageChute"  => $this->applicable->has_garbage_chute,
                "hasElevator"  => $this->applicable->has_elevator,
                "isCorner" => $this->applicable->is_corner,
                "hasHeating" => $this->applicable->has_heating,
                "hasLoggia"  => $this->applicable->has_loggia,
                "hasBalcony"  => $this->applicable->has_balcony,
                "condition" => $this->applicable->condition,
                "walls" => $this->applicable->walls,
                "bath" => $this->applicable->bath,
                "toilet" => $this->applicable->toilet,
                "constructionTime" => $this->applicable->construction_time,
                "area" => $this->applicable->area,
                "roomCount" => $this->applicable->room_count,
                "levelCount" => $this->applicable->level_count,
                "level" => $this->applicable->level,
                "ceiling" => $this->applicable->ceiling,
            ];
        }

        return [];
    }
}
