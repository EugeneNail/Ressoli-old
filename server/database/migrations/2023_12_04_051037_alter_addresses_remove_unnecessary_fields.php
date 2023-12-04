<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table("addresses", function (Blueprint $table) {
            $table->dropColumn("type_of_city");
            $table->dropColumn("type_of_street");
            $table->renameColumn('house_number', 'address_number');
            $table->string("postal_code")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::table("addresses", function (Blueprint $table) {
            $table->string("type_of_city");
            $table->string("type_of_street");
            $table->renameColumn("`address_number`", "`house_number`");
            $table->dropColumn("postal_code");
        });
    }
};
