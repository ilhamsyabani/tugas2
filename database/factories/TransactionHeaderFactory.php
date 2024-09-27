<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionHeader>
 */
class TransactionHeaderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'description' => $this->faker->sentence(),
            'code' => $this->faker->unique()->regexify('[A-Za-z0-9]{5,10}'),
            'rate_euro' => $this->faker->numberBetween(14500, 20000),
            'date_paid' => $this->faker->date(),
        ];
    }
}
