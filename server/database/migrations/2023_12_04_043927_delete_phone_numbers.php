<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::dropIfExists("phone_numbers");
        Schema::table("clients", function (Blueprint $table) {
            $table->string("phone_number");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::create("phone_numbers", function (Blueprint $table) {
            $table->string("id");
            $table->string("numberable_id");
            $table->string("numberable_type");
        });
        Schema::table("clients", function (Blueprint $table) {
            $table->dropColumn("phone_number");
        });
    }
};
