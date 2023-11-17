<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::table("applications", function (Blueprint $table) {
            $table->integer("user_id")->after("id")->change();
            $table->integer("client_id")->after("user_id")->change();
            $table->integer("address_id")->after("client_id")->change();
            $table->integer("preview_id")->after("address_id")->change();
            $table->integer("applicable_id")->after("preview_id")->change();
            $table->string("applicable_type")->after("applicable_id")->change();
        });

        Schema::table("clients", function (Blueprint $table) {
            $table->string("name")->after("id")->change();
            $table->string("surname")->after("name")->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        //
    }
};
