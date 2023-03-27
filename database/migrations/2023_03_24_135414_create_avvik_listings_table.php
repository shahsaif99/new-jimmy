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
        Schema::create('avvik_listings', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('title');
            $table->date('date');
            $table->string('department');
            $table->string('registered_by');
            $table->string('responsible_person')->nullable();
            $table->integer('project_id');
            $table->integer('user_id');
            $table->string('location')->nullable();
            $table->string('severity')->nullable();
            $table->text('description')->nullable();
            $table->string('event_type')->nullable();
            $table->text('immediate_action')->nullable();
            $table->text('casual_analysis')->nullable();
            $table->text('corrective_actions')->nullable();
            $table->string('days_of_absence')->nullable();
            $table->string('cost')->nullable();
            $table->date('closing_deadline')->nullable();
            $table->date('close_date')->nullable();
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
        Schema::dropIfExists('avvik_listings');
    }
};
