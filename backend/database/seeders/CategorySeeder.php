<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            [
                'name' => 'Technology',
                'description' => 'Latest trends and updates in the tech world',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Health & Wellness',
                'description' => 'Tips and advice on maintaining a healthy lifestyle',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fashion',
                'description' => 'Trendy and stylish clothing, accessories, and more',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Education',
                'description' => 'Resources and guides for learning and development',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Business',
                'description' => 'Insights and strategies for entrepreneurs and professionals',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
        
    }
}
