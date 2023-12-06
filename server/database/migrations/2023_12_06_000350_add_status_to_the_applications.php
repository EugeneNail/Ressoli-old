<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table('applications', function (Blueprint $table) {
            $table->boolean("is_active")->nullable();
        });

        Schema::table('land_parcels', function (Blueprint $table) {
            $table->string("title")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn("is_active");
        });

        Schema::table('land_parcels', function (Blueprint $table) {
            $table->dropColumn("title");
        });
    }
};
