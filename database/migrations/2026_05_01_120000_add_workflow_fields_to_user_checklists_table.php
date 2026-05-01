<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('user_checklists', function (Blueprint $table) {
            $table->string('status')->default('draft')->after('is_started');
            $table->timestamp('started_at')->nullable()->after('status');
            $table->timestamp('submitted_at')->nullable()->after('started_at');
            $table->timestamp('due_date')->nullable()->after('submitted_at');

            $table->foreignId('assigned_by')->nullable()->after('due_date')
                ->constrained('users')->nullOnDelete();
            $table->foreignId('project_id')->nullable()->after('assigned_by')
                ->constrained('projects')->nullOnDelete();
            $table->foreignId('equipment_id')->nullable()->after('project_id')
                ->constrained('equipment')->nullOnDelete();
            $table->foreignId('category_id')->nullable()->after('equipment_id')
                ->constrained('categories')->nullOnDelete();

            $table->unsignedInteger('total_tasks')->default(0)->after('category_id');
            $table->unsignedInteger('completed_tasks')->default(0)->after('total_tasks');
            $table->unsignedInteger('passed_tasks')->default(0)->after('completed_tasks');
            $table->unsignedInteger('failed_tasks')->default(0)->after('passed_tasks');
            $table->unsignedInteger('na_tasks')->default(0)->after('failed_tasks');

            $table->index(['status', 'project_id']);
            $table->index(['status', 'submitted_at']);
        });
    }

    public function down()
    {
        Schema::table('user_checklists', function (Blueprint $table) {
            $table->dropIndex(['status', 'project_id']);
            $table->dropIndex(['status', 'submitted_at']);

            $table->dropConstrainedForeignId('assigned_by');
            $table->dropConstrainedForeignId('project_id');
            $table->dropConstrainedForeignId('equipment_id');
            $table->dropConstrainedForeignId('category_id');

            $table->dropColumn([
                'status', 'started_at', 'submitted_at', 'due_date',
                'total_tasks', 'completed_tasks', 'passed_tasks', 'failed_tasks', 'na_tasks',
            ]);
        });
    }
};
