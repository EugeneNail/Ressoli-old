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

    public function collectAddress() {
        $options = DB::table("drop_options")
            ->where("type", "address")
            ->select(["name", "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($type) => $this->simplify($type));

        return $options;
    }

    public function collectPlot() {
        $options = DB::table("drop_options")
            ->where("type", "plot")
            ->select(["name", "value"])
            ->get()
            ->groupBy(["name"])
            ->map(fn ($name) => $this->simplify($name));

        return $options;
    }

    public function collectApplication(): array {
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
