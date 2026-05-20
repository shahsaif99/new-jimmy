<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_checklist_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_checklist_id')
                ->constrained('user_checklists')
                ->cascadeOnDelete();
            $table->unsignedBigInteger('source_section_id')->nullable();
            $table->string('name');
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->index('user_checklist_id');
        });

        Schema::create('user_checklist_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_checklist_section_id')
                ->constrained('user_checklist_sections')
                ->cascadeOnDelete();
            $table->unsignedBigInteger('source_checklist_task_id')->nullable();
            $table->string('name');
            $table->string('type')->default('procedure');
            $table->string('img')->nullable();
            $table->string('param')->nullable();
            $table->boolean('is_img_required')->default(false);
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();

            $table->index('user_checklist_section_id');
            $table->index('source_checklist_task_id');
        });

        Schema::table('task_check_list_answers', function (Blueprint $table) {
            $table->foreignId('user_checklist_task_id')->nullable()->after('checklist_task_id')
                ->constrained('user_checklist_tasks')
                ->nullOnDelete();
            $table->index(['user_checklist_id', 'user_checklist_task_id'], 'tcla_uc_uct_idx');
        });

        // Cut the FK cascade that lets a template edit wipe out submitted answers.
        // We keep checklist_task_id as a soft historical reference (nullable, no FK).
        Schema::table('task_check_list_answers', function (Blueprint $table) {
            $table->dropForeign(['checklist_task_id']);
            $table->unsignedBigInteger('checklist_task_id')->nullable()->change();
        });

        $this->backfillSnapshots();
    }

    public function down(): void
    {
        Schema::table('task_check_list_answers', function (Blueprint $table) {
            // Restore FK on checklist_task_id (cannot guarantee orphan-free on rollback).
            $table->unsignedBigInteger('checklist_task_id')->nullable(false)->change();
            $table->foreign('checklist_task_id')->references('id')->on('checklist_tasks')->cascadeOnDelete();
        });

        Schema::table('task_check_list_answers', function (Blueprint $table) {
            $table->dropIndex('tcla_uc_uct_idx');
            $table->dropConstrainedForeignId('user_checklist_task_id');
        });

        Schema::dropIfExists('user_checklist_tasks');
        Schema::dropIfExists('user_checklist_sections');
    }

    private function backfillSnapshots(): void
    {
        $userChecklists = DB::table('user_checklists')->get();

        foreach ($userChecklists as $uc) {
            // Skip if this UserChecklist already has a snapshot (defensive).
            $hasSnapshot = DB::table('user_checklist_sections')
                ->where('user_checklist_id', $uc->id)
                ->exists();
            if ($hasSnapshot) {
                continue;
            }

            $templateSections = DB::table('sections')
                ->where('checklist_id', $uc->checklist_id)
                ->orderBy('id')
                ->get();

            $taskMap = [];

            foreach ($templateSections as $sectionIdx => $section) {
                $newSectionId = DB::table('user_checklist_sections')->insertGetId([
                    'user_checklist_id' => $uc->id,
                    'source_section_id' => $section->id,
                    'name' => $section->name,
                    'position' => $sectionIdx,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $tasks = DB::table('checklist_tasks')
                    ->where('section_id', $section->id)
                    ->orderBy('id')
                    ->get();

                foreach ($tasks as $taskIdx => $task) {
                    $newTaskId = DB::table('user_checklist_tasks')->insertGetId([
                        'user_checklist_section_id' => $newSectionId,
                        'source_checklist_task_id' => $task->id,
                        'name' => $task->name,
                        'type' => $task->type ?? 'procedure',
                        'img' => $task->img ?? null,
                        'param' => $task->param ?? null,
                        'is_img_required' => $task->is_img_required ?? false,
                        'position' => $taskIdx,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $taskMap[$task->id] = $newTaskId;
                }
            }

            DB::table('task_check_list_answers')
                ->where('user_checklist_id', $uc->id)
                ->whereNotNull('checklist_task_id')
                ->orderBy('id')
                ->get(['id', 'checklist_task_id'])
                ->each(function ($answer) use ($taskMap) {
                    if (isset($taskMap[$answer->checklist_task_id])) {
                        DB::table('task_check_list_answers')
                            ->where('id', $answer->id)
                            ->update(['user_checklist_task_id' => $taskMap[$answer->checklist_task_id]]);
                    }
                });
        }
    }
};
