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
            $table->unsignedBigInteger('supplier_id')->nullable()->after('cost');
            $table->unsignedBigInteger('equipment_id')->nullable()->after('supplier_id');
            $table->boolean('economic_consequences')->default(false)->after('equipment_id');
            $table->boolean('resulted_in_absence')->default(false)->after('economic_consequences');
            $table->boolean('medical_treatment_needed')->default(false)->after('resulted_in_absence');
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
            $table->dropColumn([
                'supplier_id',
                'equipment_id',
                'economic_consequences',
                'resulted_in_absence',
                'medical_treatment_needed',
            ]);
        });
    }
};
