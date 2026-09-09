<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('customer_suppliers', function (Blueprint $table) {
            // The record's own on/off switch, distinct from the evaluation
            // status below: a supplier can be Deactivated but still carry a
            // history of approved evaluations.
            $table->boolean('is_active')->default(true)->after('name');

            // Only suppliers are evaluated, and only when someone opts them in.
            $table->boolean('should_be_evaluated')->default(false)->after('status');
            $table->unsignedSmallInteger('evaluation_interval_months')->nullable()->after('should_be_evaluated');
            $table->date('next_evaluation_date')->nullable()->after('evaluation_interval_months');

            $table->index('next_evaluation_date');
        });

        // Existing rows predate the evaluate flag. A supplier that already has
        // evaluations was plainly being evaluated, so opt those in and give
        // them the default yearly interval; everyone else stays opted out
        // rather than being dragged into "Under evaluation" overnight.
        DB::table('customer_suppliers')
            ->whereIn('type', ['supplier', 'both'])
            ->whereIn('id', function ($query) {
                $query->select('supplier_id')->distinct()->from('supplier_evaluations');
            })
            ->update([
                'should_be_evaluated' => true,
                'evaluation_interval_months' => 12,
            ]);

        // Seed next_evaluation_date from each supplier's latest evaluation so
        // the derived status is right on the first page load rather than after
        // the next save.
        DB::statement("
            UPDATE customer_suppliers cs
            INNER JOIN (
                SELECT supplier_id, MAX(evaluation_date) AS last_date
                FROM supplier_evaluations
                GROUP BY supplier_id
            ) latest ON latest.supplier_id = cs.id
            SET cs.next_evaluation_date = DATE_ADD(latest.last_date, INTERVAL cs.evaluation_interval_months MONTH)
            WHERE cs.should_be_evaluated = 1
              AND cs.evaluation_interval_months IS NOT NULL
        ");
    }

    public function down(): void
    {
        Schema::table('customer_suppliers', function (Blueprint $table) {
            $table->dropIndex(['next_evaluation_date']);
            $table->dropColumn([
                'is_active',
                'should_be_evaluated',
                'evaluation_interval_months',
                'next_evaluation_date',
            ]);
        });
    }
};
