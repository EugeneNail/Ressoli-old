<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $excludes = [
            "migrations",
            "personal_access_tokens",
            "drop_options",
            "users"
        ];
        collect(DB::select("SHOW TABLES"))
            ->map(fn ($object) => $object->{"Tables_in_" . env("DB_DATABASE")})
            ->where(fn ($table) => !in_array($table, $excludes))
            ->each(fn ($table) => DB::table($table)->truncate());

        $this->call(DropOptionsSeeder::class);
        $this->call(ApplicationSeeder::class);
    }
}
