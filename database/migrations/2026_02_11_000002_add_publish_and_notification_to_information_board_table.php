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
            $table->timestamp('publish_at')->nullable()->after('status');
            $table->boolean('push_notification')->default(false)->after('publish_at');
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
            $table->dropColumn(['publish_at', 'push_notification']);
        });
    }
};
