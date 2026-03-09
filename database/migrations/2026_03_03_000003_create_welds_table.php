<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('welds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('weld_log_id')->constrained('weld_logs')->cascadeOnDelete();
            $table->integer('weld_no');
            $table->foreignId('wps_id')->nullable()->constrained('wps')->nullOnDelete();
            $table->string('welder_id', 4);
            $table->date('weld_date');
            $table->enum('visual_inspection', ['ok', 'not_ok'])->default('ok');
            $table->boolean('ndt_rt')->default(false);
            $table->boolean('ndt_mt')->default(false);
            $table->boolean('ndt_pt')->default(false);
            $table->boolean('ndt_vt')->default(false);
            $table->enum('ndt_accepted', ['accepted', 'rejected'])->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('welds');
    }
};
