<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('addresses', function (Blueprint $table) {
            $table->string("type_of_city");
            $table->string("type_of_street");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('addresses', function (Blueprint $table) {
            $table->dropColumn("type_of_city");
            $table->dropColumn("type_of_street");
        });
    }
};
