<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create("houses", function (Blueprint $table) {
            $table->id();
            $table->string("water");
            $table->string("gas");
            $table->string("area");
            $table->string("electricity");
            $table->string("sewer");
            $table->string("walls");
            $table->string("hot_water");
            $table->string("condition");
            $table->string("heating");
            $table->integer("level_count");
            $table->string("bath");
            $table->float("ceiling");
            $table->string("toilet");
            $table->integer("room_count");
            $table->boolean("has_garage");
            $table->string("construction_time");
            $table->string("roof");
            $table->string("land_area");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("houses");
    }
};
