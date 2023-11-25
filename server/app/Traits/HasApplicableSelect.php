<?php

namespace App\Traits;

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

        return [];
    }
}
