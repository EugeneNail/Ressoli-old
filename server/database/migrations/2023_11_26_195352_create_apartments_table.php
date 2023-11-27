<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();
            $table->boolean("has_water");
            $table->boolean("has_gas");
            $table->boolean("has_electricity");
            $table->boolean("has_sewer");
            $table->float("area");
            $table->string("condition");
            $table->string("walls");
            $table->boolean("has_hot_water");
            $table->boolean("has_heating");
            $table->integer("level_count");
            $table->integer("level");
            $table->string("bath");
            $table->float("ceiling");
            $table->string("toilet");
            $table->integer("room_count");
            $table->boolean("has_garage");
            $table->string("construction_time");
            $table->boolean("has_loggia");
            $table->boolean("has_balcony");
            $table->boolean("has_garbage_chute");
            $table->boolean("has_elevator");
            $table->boolean("is_corner");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('apartments');
    }
};
