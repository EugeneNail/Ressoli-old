<?php

namespace Database\Factories;

use App\Models\Terms;
use App\Services\DropOptionsService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Terms>
 */
class TermsFactory extends Factory {
    protected $model = Terms::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array {
        $options = (new DropOptionsService())->getFor(Terms::class);

        return [
            "contract" => $options["contract"][array_rand($options["contract"])],
            "price" => fake()->randomFloat(0, 1, 10000000),
            "has_mortgage" => fake()->boolean(),
            "has_vat" => fake()->boolean()
        ];
    }
}
