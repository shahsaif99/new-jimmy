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
        Schema::table('information_board', function (Blueprint $table) {
            $table->string('title')->nullable()->after('id');
            $table->json('visible_to')->nullable()->after('content');
            $table->enum('status', ['published', 'draft'])->default('draft')->after('visible_to');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('information_board', function (Blueprint $table) {
            $table->dropColumn(['title', 'visible_to', 'status']);
        });
    }
};
