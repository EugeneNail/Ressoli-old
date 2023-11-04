<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string("city");
            $table->string("street");
            $table->string("house_number");
            $table->string("apartment_number")->nullable();
        });

        Schema::table("applications", function (Blueprint $table) {
            $table->integer("address_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("addresses");
        Schema::table("applications", function (Blueprint $table) {
            $table->dropColumn("address_id");
        });
    }
};
