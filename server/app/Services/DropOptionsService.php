<?php

namespace App\Services;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Closure;
use Illuminate\Database\Query\Builder;

class DropOptionsService {

    private function simplify($name) {
        return collect($name)->map(fn ($item) => $item->value);
    }

    public function getFor(string $type): array {
        $options = DB::table("drop_options")
            ->where("type", $type)
            ->select(["name", "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($typeObject) => $this->simplify($typeObject))
            ->toArray();

        return $options;
    }

    public function forAddress() {
        $options = DB::table("drop_options")
            ->where("type", "address")
            ->select(["name", "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($type) => $this->simplify($type));

        return $options;
    }

    public function forPlot() {
        $options = DB::table("drop_options")
            ->where("type", "plot")
            ->select(["name", "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($name) => $this->simplify($name));

        return $options;
    }

    public function forHouse() {
        $options = DB::table("drop_options")
            ->where("type", "house")
            ->select(["name", "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($name) => $this->simplify($name));

        return $options;
    }

    public function forApartment() {
        $options = DB::table("drop_options")
            ->where("type", "apartment")
            ->select(["name",  "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($name) => $this->simplify($name));

        return $options;
    }

    public function forRoom() {
        $options = DB::table("drop_options")
            ->where("type", "room")
            ->select(["name",  "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($name) => $this->simplify($name));

        return $options;
    }

    public function forContract(): array {
        $options = DB::table("drop_options")
            ->where("type", "application")
            ->where("name", "contract")
            ->select("value")
            ->get()
            ->map(fn ($item) => $item->value)
            ->toArray();

        return $options;
    }
}
