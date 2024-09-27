<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\TransactionDetail;
use App\Models\TransactionHeader;
use App\Models\User;
use Illuminate\Support\Facades\Log; 
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt('password'),
        // ]);

        $categories = Category::factory()->count(2)->create();
        Log::info("Categories created: ", $categories->toArray());
    
        // Tambahkan header transaksi
        $headers = TransactionHeader::factory()->count(10)->create();
        Log::info("Transaction Headers created: ", $headers->toArray());
    
        // Tambahkan detail transaksi
        TransactionDetail::factory()->count(34)->create();
    }
}
