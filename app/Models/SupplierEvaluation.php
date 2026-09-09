<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SupplierEvaluation extends Model
{
    use HasFactory;

    public const STATUS_MEETS = 'meets_requirements';
    public const STATUS_NOT_MEETS = 'not_meet_requirements';

    public const STATUSES = [
        self::STATUS_MEETS => 'Meets Requirements',
        self::STATUS_NOT_MEETS => 'Does Not Meet Requirements',
    ];

    protected $fillable = [
        'supplier_id',
        'performed_by',
        'evaluation_date',
        'total_score',
        'status',
        'evaluation_criteria',
    ];

    protected $casts = [
        'evaluation_criteria' => 'array',
        'evaluation_date' => 'date',
        'total_score' => 'decimal:2',
    ];

    /**
     * A supplier's next due date is derived from its evaluations, so any change
     * to them has to push that date back onto the supplier.
     */
    protected static function booted(): void
    {
        $recompute = function (self $evaluation) {
            $evaluation->supplier?->recomputeNextEvaluationDate();
        };

        static::saved($recompute);
        static::deleted($recompute);
    }

    /**
     * One row per supplier — its most recent evaluation. Ties on the same date
     * fall back to the newest id, matching the latestEvaluation relation.
     */
    public static function latestPerSupplier()
    {
        return DB::table('supplier_evaluations as se')
            ->select('se.*')
            ->whereRaw('se.id = (
                SELECT se2.id
                FROM supplier_evaluations se2
                WHERE se2.supplier_id = se.supplier_id
                ORDER BY se2.evaluation_date DESC, se2.id DESC
                LIMIT 1
            )');
    }

    public function getStatusLabelAttribute(): string
    {
        return self::STATUSES[$this->status] ?? '';
    }

    public function performedByUser()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }

    public function supplier()
    {
        return $this->belongsTo(CustomerSupplier::class, 'supplier_id');
    }
}
