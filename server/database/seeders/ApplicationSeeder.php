<?php

namespace Database\Seeders;

use App\Models\Application;
use App\Models\Photo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        Application::factory(25)
            ->has(Photo::factory()->count(5))
            ->withLandParcels()
            ->create();
    }
}
