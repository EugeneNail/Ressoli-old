<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            "city" => fake()->city(),
            "street" => fake()->streetName(),
            "address_number" => fake()->bothify("##?"),
            "apartment_number" => fake()->randomNumber(3),
            "position" => fake()->latitude(29, 48) . " " . fake()->longitude(-122, -82),
            "label" => fake()->sentence(3),
            "postal_code" => fake()->numberBetween(10000, 999999),
        ];
    }

    public function noApartment(): Factory {
        return $this->state(fn () => ["apartment_number" => null]);
    }
}
