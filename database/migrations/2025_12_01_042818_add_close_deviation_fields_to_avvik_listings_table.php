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
        Schema::table('avvik_listings', function (Blueprint $table) {
            $table->string('status')->default('open')->after('close_date');
            $table->unsignedBigInteger('closed_by_id')->nullable()->after('status');
            $table->text('close_comment')->nullable()->after('closed_by_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('avvik_listings', function (Blueprint $table) {
            $table->dropColumn(['status', 'closed_by_id', 'close_comment']);
        });
    }
};
