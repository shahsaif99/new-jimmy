<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wps', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('process');
            $table->json('joint');
            $table->string('group_number');
            $table->string('thickness');
            $table->string('diameter');
            $table->string('standard');
            $table->foreignId('project_id')->nullable()->constrained('projects')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wps');
    }
};
