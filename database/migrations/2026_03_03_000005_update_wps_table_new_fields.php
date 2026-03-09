<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('wps', function (Blueprint $table) {
            // Rename existing columns
            $table->renameColumn('joint', 'joint_type');
            $table->renameColumn('process', 'welding_process');
            $table->renameColumn('group_number', 'material_group');
        });

        Schema::table('wps', function (Blueprint $table) {
            // Add new columns
            $table->string('wpqr')->nullable()->after('name');

            // Change thickness/diameter from string to min/max
            $table->string('thickness_min')->nullable()->after('joint_type');
            $table->string('thickness_max')->nullable()->after('thickness_min');
            $table->string('diameter_min')->nullable()->after('thickness_max');
            $table->string('diameter_max')->nullable()->after('diameter_min');

            // New fields
            $table->json('welding_position')->nullable()->after('material_group');
            $table->string('layer')->nullable()->after('diameter_max');
            $table->string('sides')->nullable()->after('layer');
            $table->json('ref_spec')->nullable()->after('standard');
            $table->date('prepared_date')->nullable()->after('ref_spec');
            $table->foreignId('prepared_by')->nullable()->constrained('users')->nullOnDelete()->after('prepared_date');

            // Change standard from string to json (multiple choices)
            $table->json('standard_values')->nullable()->after('standard');
        });

        // Migrate existing standard data to standard_values as JSON array
        \DB::table('wps')->get()->each(function ($wps) {
            if ($wps->standard) {
                \DB::table('wps')->where('id', $wps->id)->update([
                    'standard_values' => json_encode([$wps->standard]),
                ]);
            }
        });

        Schema::table('wps', function (Blueprint $table) {
            $table->dropColumn(['thickness', 'diameter', 'standard']);
        });

        Schema::table('wps', function (Blueprint $table) {
            $table->renameColumn('standard_values', 'standard');
        });
    }

    public function down(): void
    {
        Schema::table('wps', function (Blueprint $table) {
            $table->renameColumn('standard', 'standard_values');
        });

        Schema::table('wps', function (Blueprint $table) {
            $table->string('thickness')->nullable();
            $table->string('diameter')->nullable();
            $table->string('standard')->nullable();
        });

        Schema::table('wps', function (Blueprint $table) {
            $table->dropColumn([
                'wpqr',
                'thickness_min',
                'thickness_max',
                'diameter_min',
                'diameter_max',
                'welding_position',
                'layer',
                'sides',
                'ref_spec',
                'prepared_date',
                'prepared_by',
                'standard_values',
            ]);
        });

        Schema::table('wps', function (Blueprint $table) {
            $table->renameColumn('joint_type', 'joint');
            $table->renameColumn('welding_process', 'process');
            $table->renameColumn('material_group', 'group_number');
        });
    }
};
