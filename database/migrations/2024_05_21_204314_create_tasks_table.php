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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('status')->default('open');
            $table->foreignId('checklist_id')->nullable()->constrained('checklists')->onDelete('Set Null');
            $table->date('start_date')->nullable();
            $table->boolean('is_started')->default(false);
            // $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('api_categories')->cascadeOnDelete();
            $table->string('priority')->default('normal');
            $table->string('room')->nullable();
            $table->string('floor')->nullable();
            $table->string('area')->nullable();
            $table->date('due_date')->nullable();
            $table->string('img')->nullable();
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
        Schema::dropIfExists('tasks');
    }
};
