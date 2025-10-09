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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('serial_number',100)->nullable();
            $table->string('supplier', 150)->nullable();
            $table->string('category', 150)->nullable();
            $table->string('certificate_number', 150)->nullable();
            $table->date('valid_until')->nullable();
            $table->integer('project_id')->nullable();
            $table->integer('user_id');
            $table->string('image', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('equipments');
    }
};
