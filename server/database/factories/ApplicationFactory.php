<?php

namespace Database\Factories;

use App\Models\Address;
use App\Models\Application;
use App\Models\Client;
use App\Models\LandParcel;
use App\Models\Terms;
use App\Models\User;
use App\Services\DropOptionsService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory {

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            "user_id" => User::all()->first(),
            "client_id" => Client::factory(),
            "address_id" => Address::factory(),
            "terms_id" => Terms::factory(),
            "applicable_id" => 0,
            "applicable_type" => "none",
            "is_active" => true
        ];
    }

    public function withLandParcels(): Factory {
        return $this->state(fn () => [
            "applicable_id" => LandParcel::factory(),
            "applicable_type" => LandParcel::class
        ]);
    }
}
