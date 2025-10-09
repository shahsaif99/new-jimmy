<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name', 50);
            $table->string('last_name', 50);
            $table->string('email')->unique();
            $table->string('phone', 30)->nullable();
            $table->string('address', 150)->nullable();
            $table->string('post_address', 150)->nullable();
            $table->string('postal_code', 30)->nullable();
            $table->string('gender', 30)->nullable();
            $table->string('citizen_country', 50)->nullable();
            $table->string('position_percentage', 30)->nullable();
            $table->date('employement_date')->nullable();
            $table->date('end_date')->nullable();
            $table->date('dob')->nullable();
            $table->text('description')->nullable();
            $table->string('salary_type')->nullable();
            $table->tinyInteger('holidays')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->string('avatar', 100)->nullable();
            $table->rememberToken();
            $table->timestamp('last_login_at')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->useCurrentOnUpdate()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
