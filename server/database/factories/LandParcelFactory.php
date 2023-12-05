<?php

namespace Database\Factories;

use App\Models\LandParcel;
use App\Services\DropOptionsService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\App;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LandParcel>
 */
class LandParcelFactory extends Factory {

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $options = (new DropOptionsService())->getFor(LandParcel::class);
        return [
            "water" => $options["water"][array_rand($options["water"])],
            "gas" => $options["gas"][array_rand($options["gas"])],
            "electricity" => $options["electricity"][array_rand($options["electricity"])],
            "sewer" => $options["sewer"][array_rand($options["sewer"])],
            "area" => fake()->randomFloat(1, 1, 10000)
        ];
    }
}
