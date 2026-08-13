<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('welds', function (Blueprint $table) {
            $table->enum('type', ['weld', 'repair'])->default('weld')->after('weld_no');
            $table->foreignId('original_weld_id')->nullable()->after('type')->constrained('welds')->nullOnDelete();
            $table->unsignedTinyInteger('repair_no')->default(0)->after('original_weld_id');
            $table->string('repair_reason')->nullable()->after('repair_no');

            // Per-method NDT results. The pre-existing ndt_accepted holds a single
            // verdict for the whole weld, which cannot express "RT passed, MT failed"
            // and so cannot drive the per-method pass rates on the Weld & NDT report.
            $table->enum('ndt_rt_result', ['accepted', 'rejected'])->nullable()->after('ndt_accepted');
            $table->enum('ndt_mt_result', ['accepted', 'rejected'])->nullable()->after('ndt_rt_result');
            $table->enum('ndt_pt_result', ['accepted', 'rejected'])->nullable()->after('ndt_mt_result');
            $table->enum('ndt_vt_result', ['accepted', 'rejected'])->nullable()->after('ndt_pt_result');

            $table->unique(['weld_log_id', 'weld_no', 'repair_no'], 'welds_log_no_repair_unique');
        });

        // Seed the per-method results from the existing whole-weld verdict so that
        // historical rows report something rather than nothing. This is an
        // approximation: a weld recorded as "rejected" across RT+MT marks both
        // rejected, because the original data never said which method failed.
        foreach (['rt', 'mt', 'pt', 'vt'] as $method) {
            DB::table('welds')
                ->where("ndt_{$method}", true)
                ->whereNotNull('ndt_accepted')
                ->update(["ndt_{$method}_result" => DB::raw('ndt_accepted')]);
        }
    }

    public function down(): void
    {
        Schema::table('welds', function (Blueprint $table) {
            $table->dropUnique('welds_log_no_repair_unique');
            $table->dropForeign(['original_weld_id']);
            $table->dropColumn([
                'type',
                'original_weld_id',
                'repair_no',
                'repair_reason',
                'ndt_rt_result',
                'ndt_mt_result',
                'ndt_pt_result',
                'ndt_vt_result',
            ]);
        });
    }
};
