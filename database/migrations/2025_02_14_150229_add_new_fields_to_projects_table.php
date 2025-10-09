<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            // Add new columns if they don't exist
            if (!Schema::hasColumn('projects', 'status')) {
                $table->enum('status', ['in_progress', 'completed'])->default('in_progress');
            }

            if (!Schema::hasColumn('projects', 'project_no')) {
                $table->string('project_no')->unique();
            }

            if (!Schema::hasColumn('projects', 'project_manager_id')) {
                $table->unsignedBigInteger('project_manager_id');
            }

            if (!Schema::hasColumn('projects', 'project_hse_manager_id')) {
                $table->unsignedBigInteger('project_hse_manager_id')->nullable();
            }

            if (!Schema::hasColumn('projects', 'description')) {
                $table->text('description')->nullable();
            }

            if (!Schema::hasColumn('projects', 'cost')) {
                $table->decimal('cost', 15, 2)->nullable();
            }

            if (!Schema::hasColumn('projects', 'hour')) {
                $table->decimal('hour', 10, 2)->nullable();
            }

            // Foreign Keys (Check first before adding)
            if (!Schema::hasColumn('projects', 'project_manager_id')) {
                $table->foreign('project_manager_id')->references('id')->on('users')->onDelete('cascade');
            }

            if (!Schema::hasColumn('projects', 'project_hse_manager_id')) {
                $table->foreign('project_hse_manager_id')->references('id')->on('users')->onDelete('set null');
            }

            // Changing 'customer' column to reference 'customer_suppliers' table
            if (!Schema::hasColumn('projects', 'customer_id')) {
                $table->unsignedBigInteger('customer_id')->after('customer')->nullable();
                $table->foreign('customer_id')->references('id')->on('customer_suppliers')->onDelete('cascade');
            }

            // Drop the old 'customer' column if it exists
            if (Schema::hasColumn('projects', 'customer')) {
                $table->dropColumn('customer');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            // Remove newly added fields
            if (Schema::hasColumn('projects', 'status')) {
                $table->dropColumn('status');
            }
            if (Schema::hasColumn('projects', 'project_no')) {
                $table->dropColumn('project_no');
            }
            if (Schema::hasColumn('projects', 'project_manager_id')) {
                $table->dropForeign(['project_manager_id']);
                $table->dropColumn('project_manager_id');
            }
            if (Schema::hasColumn('projects', 'project_hse_manager_id')) {
                $table->dropForeign(['project_hse_manager_id']);
                $table->dropColumn('project_hse_manager_id');
            }
            if (Schema::hasColumn('projects', 'description')) {
                $table->dropColumn('description');
            }
            if (Schema::hasColumn('projects', 'cost')) {
                $table->dropColumn('cost');
            }
            if (Schema::hasColumn('projects', 'hour')) {
                $table->dropColumn('hour');
            }

            // Remove foreign keys before dropping columns
            if (Schema::hasColumn('projects', 'customer_id')) {
                $table->dropForeign(['customer_id']);
                $table->dropColumn('customer_id');
            }

            // Add back the old 'customer' column
            if (!Schema::hasColumn('projects', 'customer')) {
                $table->string('customer', 255);
            }
        });
    }
};