<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_safety_analyses', function (Blueprint $table) {
            $table->id();
            // Human-facing identifier shown everywhere in the UI and on the
            // report ("JSA-1049"). Assigned once on create and never reused.
            $table->string('jsa_no')->nullable()->unique();
            $table->string('title');
            // A JSA can be drafted before it is attached to a project, so the
            // link is nullable and clears rather than deletes with the project.
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->date('jsa_date')->nullable();
            $table->string('work_location')->nullable();
            $table->foreignId('jsa_leader_id')->nullable()->constrained('users')->nullOnDelete();
            // Deliberately a plain stored column, never derived from the
            // signatures: the spec requires a paper-signed JSA to stay
            // Completed even with no digital signatures against it.
            $table->enum('status', ['draft', 'active', 'completed'])->default('draft');
            $table->text('description')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index('status');
            $table->index('jsa_date');
        });

        Schema::create('jsa_hazards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_safety_analysis_id')->constrained('job_safety_analyses')->cascadeOnDelete();
            $table->string('work_type');
            $table->text('hazard');
            $table->text('control');
            // The table is drag-reorderable and the report numbers the rows, so
            // the order is data, not an accident of insertion.
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['job_safety_analysis_id', 'sort_order'], 'jsa_hazards_jsa_order_index');
        });

        Schema::create('jsa_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_safety_analysis_id')->constrained('job_safety_analyses')->cascadeOnDelete();
            // Nullable on purpose: a JSA is signed by everyone on the job, and
            // subcontractors on site do not have logins. Those participants are
            // carried by name alone and can only ever be marked paper-signed.
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            // Snapshot of the name as it stood when the JSA was signed, so the
            // report keeps reading correctly if the user is later renamed.
            $table->string('name');
            $table->enum('signature_status', ['not_signed', 'signed_in_app', 'signed_on_paper'])->default('not_signed');
            $table->timestamp('signed_at')->nullable();
            // Who recorded a paper signature; null for a self-signed in-app one.
            $table->foreignId('recorded_by_id')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('reminder_sent_at')->nullable();
            $table->timestamps();

            $table->index(['job_safety_analysis_id', 'signature_status'], 'jsa_participants_jsa_status_index');
            $table->index('user_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jsa_participants');
        Schema::dropIfExists('jsa_hazards');
        Schema::dropIfExists('job_safety_analyses');
    }
};
