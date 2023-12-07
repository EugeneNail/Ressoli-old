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
            $table->foreignId("terms_id")->constrained()->noActionOnDelete();
            $table->dropColumn("contract");
            $table->dropColumn("price");
            $table->dropColumn("has_vat");
            $table->dropColumn("has_mortgage");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table("applications", function (Blueprint $table) {
            $table->string("contract");
            $table->integer("price");
            $table->boolean("has_vat");
            $table->boolean("has_mortgage");
            $table->dropForeign(["terms_id"]);
            $table->dropColumn("terms_id");
        });
    }
};
