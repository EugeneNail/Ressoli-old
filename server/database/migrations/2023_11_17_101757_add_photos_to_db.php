<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('photos', function (Blueprint $table) {
            $table->id();
            $table->string("path")->unique();
            $table->integer("application_id")->nullable();
        });

        Schema::table("applications", function (Blueprint $table) {
            $table->integer("preview_id");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists("photos");
        Schema::table("applications", function (Blueprint $table) {
            $table->dropColumn("preview_id");
        });
    }
};
