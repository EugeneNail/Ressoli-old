<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('plots', function (Blueprint $table) {
            $table->id();
            $table->string("water");
            $table->string("gas");
            $table->string("electricity");
            $table->string("sewer");
            $table->float("area");
        });

        Schema::table("applications", function (Blueprint $table) {
            $table->integer("applicable_id");
            $table->string("applicable_type");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("plots");
        Schema::table("applications", function (Blueprint $table) {
            $table->dropColumn("applicable_id");
            $table->dropColumn("applicable_type");
        });
    }
};
