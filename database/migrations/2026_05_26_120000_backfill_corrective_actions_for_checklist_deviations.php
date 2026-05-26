<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Backfill corrective_actions from description for deviations that were
     * created by the checklist flow (i.e. linked from a checklist answer).
     * Standalone avvik listings are left untouched.
     */
    public function up(): void
    {
        $checklistDeviationIds = DB::table('task_check_list_answers')
            ->whereNotNull('avvik_listing_id')
            ->distinct()
            ->pluck('avvik_listing_id');

        if ($checklistDeviationIds->isEmpty()) {
            return;
        }

        DB::table('avvik_listings')
            ->whereIn('id', $checklistDeviationIds)
            ->whereNotNull('description')
            ->where('description', '!=', '')
            ->where(function ($q) {
                $q->whereNull('corrective_actions')
                    ->orWhere('corrective_actions', '');
            })
            ->update([
                'corrective_actions' => DB::raw('description'),
            ]);
    }

    /**
     * Data backfill — not reversible without losing legitimately-entered values.
     */
    public function down(): void
    {
        // no-op
    }
};
