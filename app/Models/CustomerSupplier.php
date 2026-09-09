<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CustomerSupplier extends Model
{
    use HasFactory;

    public const TYPE_CUSTOMER = 'customer';
    public const TYPE_SUPPLIER = 'supplier';
    public const TYPE_BOTH = 'both';

    /**
     * The four evaluation states from the brief. These are derived from the
     * latest evaluation rather than stored, because "Under evaluation" starts
     * the moment next_evaluation_date passes — with nothing writing a row.
     */
    public const EVAL_APPROVED = 'approved';
    public const EVAL_NOT_ACCEPTABLE = 'not_acceptable';
    public const EVAL_UNDER_EVALUATION = 'under_evaluation';
    public const EVAL_NOT_APPLICABLE = 'not_applicable';

    public const EVALUATION_STATUSES = [
        self::EVAL_APPROVED => 'Approved',
        self::EVAL_NOT_ACCEPTABLE => 'Not Acceptable',
        self::EVAL_UNDER_EVALUATION => 'Under Evaluation',
        self::EVAL_NOT_APPLICABLE => 'Not applicable',
    ];

    public const EVALUATION_INTERVALS = [6, 12, 24, 36];

    protected $fillable = [
        'type',
        'name',
        'is_active',
        'address',
        'postal_code',
        'place',
        'contact_person',
        'email',
        'telephone_number',
        'website',
        'customer_manager_id',
        'organization_number',
        'status',
        'should_be_evaluated',
        'evaluation_interval_months',
        'next_evaluation_date',
        'management_systems',
        'supplier_of',
        'total_evaluation',
    ];

    protected $attributes = [
        'status' => 'not_approved',
    ];

    protected $casts = [
        'management_systems' => 'array',
        'supplier_of' => 'array',
        'is_active' => 'boolean',
        'should_be_evaluated' => 'boolean',
        'evaluation_interval_months' => 'integer',
        'next_evaluation_date' => 'date',
    ];

    protected $appends = ['evaluation_status', 'evaluation_status_label'];

    public function evaluations()
    {
        return $this->hasMany(SupplierEvaluation::class, 'supplier_id');
    }

    /**
     * Ordered by date then id so that two evaluations recorded on the same day
     * still resolve to the one entered last.
     */
    public function latestEvaluation(): HasOne
    {
        return $this->hasOne(SupplierEvaluation::class, 'supplier_id')
            ->latest('evaluation_date')
            ->latest('id');
    }

    public function customerManager()
    {
        return $this->belongsTo(User::class, 'customer_manager_id');
    }

    public function documents()
    {
        return $this->hasMany(CustomerSupplierDocument::class);
    }

    public function deviations()
    {
        return $this->hasMany(AvvikListing::class, 'supplier_id');
    }

    public function isSupplier(): bool
    {
        return in_array($this->type, [self::TYPE_SUPPLIER, self::TYPE_BOTH], true);
    }

    /**
     * Customers, and suppliers nobody asked to evaluate, are out of scope for
     * evaluation entirely — they report "Not applicable" rather than a blank.
     */
    public function isEvaluable(): bool
    {
        return $this->isSupplier() && (bool) $this->should_be_evaluated;
    }

    public function getEvaluationStatusAttribute(): string
    {
        if (!$this->isEvaluable()) {
            return self::EVAL_NOT_APPLICABLE;
        }

        $latest = $this->relationLoaded('latestEvaluation')
            ? $this->getRelation('latestEvaluation')
            : $this->latestEvaluation()->first();

        if (!$latest) {
            return self::EVAL_UNDER_EVALUATION;
        }

        // An evaluation that has fallen due puts the supplier back under
        // evaluation regardless of what that last evaluation concluded.
        if ($this->next_evaluation_date && $this->next_evaluation_date->isPast()) {
            return self::EVAL_UNDER_EVALUATION;
        }

        return $latest->status === SupplierEvaluation::STATUS_MEETS
            ? self::EVAL_APPROVED
            : self::EVAL_NOT_ACCEPTABLE;
    }

    public function getEvaluationStatusLabelAttribute(): string
    {
        return self::EVALUATION_STATUSES[$this->evaluation_status] ?? '';
    }

    /**
     * The same derivation as the accessor, expressed in SQL so the overview can
     * filter and sort on it without loading every row into PHP.
     */
    public static function evaluationStatusSql(): string
    {
        $meets = SupplierEvaluation::STATUS_MEETS;

        return "CASE
            WHEN customer_suppliers.type = 'customer' OR customer_suppliers.should_be_evaluated = 0
                THEN '" . self::EVAL_NOT_APPLICABLE . "'
            WHEN latest_eval.id IS NULL
                THEN '" . self::EVAL_UNDER_EVALUATION . "'
            WHEN customer_suppliers.next_evaluation_date IS NOT NULL
                 AND customer_suppliers.next_evaluation_date < CURDATE()
                THEN '" . self::EVAL_UNDER_EVALUATION . "'
            WHEN latest_eval.status = '{$meets}'
                THEN '" . self::EVAL_APPROVED . "'
            ELSE '" . self::EVAL_NOT_ACCEPTABLE . "'
        END";
    }

    /**
     * Joins each row to its most recent evaluation and exposes the derived
     * status, score and date as selectable columns.
     */
    public function scopeWithEvaluationStatus($query)
    {
        return $query
            ->leftJoinSub(
                SupplierEvaluation::latestPerSupplier(),
                'latest_eval',
                'latest_eval.supplier_id',
                '=',
                'customer_suppliers.id'
            )
            ->select('customer_suppliers.*')
            ->selectRaw(self::evaluationStatusSql() . ' as evaluation_status_sql')
            ->selectRaw('latest_eval.total_score as latest_score')
            ->selectRaw('latest_eval.evaluation_date as latest_evaluation_date');
    }

    /**
     * Recalculate when this supplier next falls due. Driven by the latest
     * evaluation date; a supplier with no evaluations has nothing to count
     * from and stays under evaluation until one is recorded.
     */
    public function recomputeNextEvaluationDate(bool $save = true): ?string
    {
        $next = null;

        if ($this->isEvaluable() && $this->evaluation_interval_months) {
            $latest = $this->evaluations()
                ->orderByDesc('evaluation_date')
                ->orderByDesc('id')
                ->first();

            if ($latest) {
                $next = $latest->evaluation_date
                    ->copy()
                    ->addMonths($this->evaluation_interval_months)
                    ->toDateString();
            }
        }

        $this->next_evaluation_date = $next;

        if ($save) {
            $this->saveQuietly();
        }

        return $next;
    }
}
