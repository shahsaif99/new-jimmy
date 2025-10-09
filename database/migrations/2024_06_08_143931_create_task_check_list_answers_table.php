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
        Schema::create('task_check_list_answers', function (Blueprint $table) {
            $table->id();
            // checklist_task_id
            $table->unsignedBigInteger('checklist_task_id'); // Add this line
            $table->foreign('checklist_task_id')->references('id')->on('checklist_tasks')->onDelete('cascade');
            $table->unsignedBigInteger('main_task_id'); // Add this line
            $table->foreign('main_task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->string('answer')->nullable();
            $table->string('img')->nullable();
            $table->string('attachment')->nullable();
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
        Schema::dropIfExists('task_check_list_answers');
    }
};
