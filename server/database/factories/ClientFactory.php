<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        return [
            "name" => fake()->firstName(),
            "surname" => fake()->lastName(),
            "phone_number" => "8951" . fake()->numerify("#######")
        ];
    }
}
