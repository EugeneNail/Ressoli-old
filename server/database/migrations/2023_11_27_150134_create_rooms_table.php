<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->boolean("has_water");
            $table->boolean("has_gas");
            $table->boolean("has_electricity");
            $table->boolean("has_sewer");
            $table->boolean("has_hot_water");
            $table->boolean("has_heating");
            $table->boolean("has_elevator");
            $table->boolean("has_garbage_chute");
            $table->string("walls");
            $table->string("condition");
            $table->string("bath");
            $table->string("toilet");
            $table->integer("level_count");
            $table->integer("level");
            $table->float("area");
            $table->float("ceiling");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('rooms');
    }
};
