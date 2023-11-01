<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->integer("price");
            $table->boolean("has_mortgage");
            $table->boolean("has_vat");
            $table->integer("user_id");
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('applications');
    }
};
