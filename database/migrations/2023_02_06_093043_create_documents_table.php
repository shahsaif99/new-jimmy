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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->integer('category_id');
            $table->integer('subcategory_id');
            $table->date('created_date')->nullable();
            $table->string('document_number')->nullable();
            $table->date('revised_date')->nullable();
            $table->date('approved_date')->nullable();
            $table->string('revision_number')->nullable();
            $table->string('author')->nullable();
            $table->string('approved_by')->nullable();
            $table->text('content');
            $table->string('type');
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
        Schema::dropIfExists('documents');
    }
};
