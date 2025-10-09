<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('equipment', function (Blueprint $table) {
            // Make category_id nullable
            $table->unsignedBigInteger('category_id')->nullable()->change();

            // Make supplier required
            $table->string('supplier', 150)->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('equipment', function (Blueprint $table) {
            // Revert category_id to be required
            $table->unsignedBigInteger('category_id')->nullable(false)->change();

            // Revert supplier to be nullable
            $table->string('supplier', 150)->nullable()->change();
        });
    }
};
