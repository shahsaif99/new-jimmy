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
        Schema::create('checklist_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->default('procedure');
            $table->string('img')->nullable();
            $table->string('param')->nullable();
            $table->boolean('is_img_required')->default(false);
            $table->foreignId('section_id')->constrained('sections')->onDelete('cascade');
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
        Schema::dropIfExists('checklist_tasks');
    }
};
