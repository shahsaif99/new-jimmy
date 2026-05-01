<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('task_check_list_answers', function (Blueprint $table) {
            $table->dropForeign(['main_task_id']);
            $table->unsignedBigInteger('main_task_id')->nullable()->change();
            $table->foreign('main_task_id')->references('id')->on('tasks')->nullOnDelete();

            $table->foreignId('user_checklist_id')->nullable()->after('main_task_id')
                ->constrained('user_checklists')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->after('user_checklist_id')
                ->constrained('users')->nullOnDelete();
            $table->foreignId('avvik_listing_id')->nullable()->after('attachment')
                ->constrained('avvik_listings')->nullOnDelete();
            $table->text('notes')->nullable()->after('attachment');

            $table->index(['user_checklist_id', 'checklist_task_id'], 'tcla_uc_task_idx');
        });
    }

    public function down()
    {
        Schema::table('task_check_list_answers', function (Blueprint $table) {
            $table->dropIndex('tcla_uc_task_idx');
            $table->dropConstrainedForeignId('user_checklist_id');
            $table->dropConstrainedForeignId('user_id');
            $table->dropConstrainedForeignId('avvik_listing_id');
            $table->dropColumn('notes');

            $table->dropForeign(['main_task_id']);
            $table->unsignedBigInteger('main_task_id')->nullable(false)->change();
            $table->foreign('main_task_id')->references('id')->on('tasks')->onDelete('cascade');
        });
    }
};
