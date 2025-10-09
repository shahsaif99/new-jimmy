<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('supplier_evaluations', function (Blueprint $table) {
            // Modify the ENUM values, replacing 'does_not_meet_requirements' with 'not_meet_requirements'
            DB::statement("ALTER TABLE supplier_evaluations MODIFY COLUMN status ENUM('meets_requirements', 'not_meet_requirements') NOT NULL;");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('supplier_evaluations', function (Blueprint $table) {
            // Revert back to the old ENUM values
            DB::statement("ALTER TABLE supplier_evaluations MODIFY COLUMN status ENUM('meets_requirements', 'does_not_meet_requirements') NOT NULL;");
        });
    }
};
