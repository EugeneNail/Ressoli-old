<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('phone_numbers', function (Blueprint $table) {
            $table->string("id")->change();
            $table->dropColumn("value");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('phone_numbers', function (Blueprint $table) {
            $table->unsignedInteger("id")->change();
            $table->string('value');
        });
    }
};
