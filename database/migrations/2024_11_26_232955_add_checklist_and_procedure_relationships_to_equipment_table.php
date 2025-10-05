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
        Schema::table('equipment', function (Blueprint $table) {
            // Adding required foreign keys with cascading deletes
            $table->unsignedBigInteger('storage_location_id')->after('image');
            $table->foreign('storage_location_id')->references('id')->on('storage_locations')->onDelete('cascade');

            $table->unsignedBigInteger('category_id')->after('storage_location_id');
            $table->foreign('category_id')->references('id')->on('equipment_categories')->onDelete('cascade');

            // Adding optional relationships for checklists and procedures
            $table->unsignedBigInteger('checklist_id')->nullable()->after('category_id');
            $table->foreign('checklist_id')->references('id')->on('checklists')->onDelete('set null');

            $table->unsignedBigInteger('procedure_id')->nullable()->after('checklist_id');
            $table->foreign('procedure_id')->references('id')->on('documents')->onDelete('set null');

            // Adding additional fields
            $table->string('level_of_training', 150)->nullable()->after('procedure_id');
            $table->boolean('qr_code')->default(false)->after('level_of_training');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('equipment', function (Blueprint $table) {
            // Drop foreign keys
            $table->dropForeign(['storage_location_id']);
            $table->dropForeign(['category_id']);
            $table->dropForeign(['checklist_id']);
            $table->dropForeign(['procedure_id']);

            // Drop columns
            $table->dropColumn([
                'storage_location_id',
                'category_id',
                'checklist_id',
                'procedure_id',
                'checklist',
                'procedure',
                'level_of_training',
                'qr_code',
            ]);
        });
    }
};
