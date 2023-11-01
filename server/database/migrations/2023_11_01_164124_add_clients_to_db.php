<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string("surname")->nullable();
            $table->string("name");
        });

        Schema::table("applications", function (Blueprint $table) {
            $table->integer("client_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("clients");
        Schema::table("applications", function (Blueprint $table) {
            $table->dropColumn("client_id");
        });
    }
};
