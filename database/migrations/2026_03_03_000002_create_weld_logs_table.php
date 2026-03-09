<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weld_logs', function (Blueprint $table) {
            $table->id();
            $table->string('drawing_no');
            $table->foreignId('project_id')->constrained('projects')->cascadeOnDelete();
            $table->enum('status', ['in_progress', 'completed'])->default('in_progress');
            $table->boolean('ndt_required')->default(false);
            $table->integer('ndt_rt')->default(0);
            $table->integer('ndt_mt')->default(0);
            $table->integer('ndt_pt')->default(0);
            $table->integer('ndt_vt')->default(0);
            $table->timestamps();

            $table->unique(['drawing_no', 'project_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weld_logs');
    }
};
