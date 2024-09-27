<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\TransactionHeader;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionDetail>
 */
class TransactionDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transaction_id' => TransactionHeader::all()->random()->id, 
            'transaction_category_id' => Category::all()->random()->id,
            'name' => $this->faker->sentence(3),
            'value_idr' => $this->faker->numberBetween(100000, 10000000), 
        ];
    }
}
