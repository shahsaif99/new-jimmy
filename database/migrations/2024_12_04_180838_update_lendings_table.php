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
        Schema::table('lendings', function (Blueprint $table) {
            // Drop the lending_date and returned_date columns
            $table->dropColumn('lending_date');
            $table->dropColumn('returned_date');

            // Add new columns for returned_at and return_by
            $table->timestamp('returned_at')->nullable()->after('created_at');
            $table->foreignId('return_by')->nullable()->constrained('users')->nullOnDelete()->after('registered_by');
            
            // Removed the unique constraint
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('lendings', function (Blueprint $table) {
            // Re-add lending_date and returned_date columns
            $table->date('lending_date')->after('id');
            $table->date('returned_date')->nullable()->after('lending_date');

            // Drop the returned_at and return_by columns
            $table->dropColumn('returned_at');
            $table->dropColumn('return_by');
        });
    }
};
