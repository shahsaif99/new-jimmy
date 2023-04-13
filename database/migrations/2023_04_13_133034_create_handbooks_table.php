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
        Schema::create('handbooks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('document_number');
            $table->string('revision_number');
            $table->string('revised_by');
            $table->string('scope');
            $table->string('author');
            $table->string('approved_by');
            $table->string('revised_date');
            $table->string('approved_date');
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
        Schema::dropIfExists('handbooks');
    }
};
