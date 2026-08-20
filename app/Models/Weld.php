<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Weld extends Model
{
    use HasFactory;

    public const TYPE_WELD = 'weld';
    public const TYPE_REPAIR = 'repair';

    public const NDT_METHODS = ['rt', 'mt', 'pt', 'vt'];

    public const REPAIR_REASONS = [
        'porosity' => 'Porosity',
        'lack_of_fusion' => 'Lack of Fusion / Penetration',
        'undercut' => 'Undercut',
        'slag_inclusion' => 'Slag Inclusion',
        'crack' => 'Crack',
        'edge_defect' => 'Edge Defect',
        'weld_profile' => 'Weld Profile',
        'spatter' => 'Spatter',
    ];

    protected $fillable = [
        'weld_log_id',
        'weld_no',
        'type',
        'original_weld_id',
        'repair_no',
        'repair_reason',
        'wps_id',
        'welder_id',
        'weld_date',
        'visual_inspection',
        'ndt_rt',
        'ndt_mt',
        'ndt_pt',
        'ndt_vt',
        'ndt_accepted',
        'ndt_rt_result',
        'ndt_mt_result',
        'ndt_pt_result',
        'ndt_vt_result',
    ];

    protected $casts = [
        'weld_date' => 'date',
        'repair_no' => 'integer',
        'ndt_rt' => 'boolean',
        'ndt_mt' => 'boolean',
        'ndt_pt' => 'boolean',
        'ndt_vt' => 'boolean',
    ];

    protected $appends = ['weld_label', 'repair_reason_label'];

    protected static function booted(): void
    {
        static::saving(function (self $weld) {
            $weld->syncOverallNdtResult();
        });
    }

    /**
     * Keep the whole-weld verdict in step with the per-method results, so the
     * weld log table and the PDF stay correct without reading four columns.
     * Welds recorded before per-method results existed keep their stored verdict.
     */
    public function syncOverallNdtResult(): void
    {
        $results = [];

        foreach (self::NDT_METHODS as $method) {
            if ($this->{"ndt_{$method}"} && $this->{"ndt_{$method}_result"} !== null) {
                $results[] = $this->{"ndt_{$method}_result"};
            }
        }

        if (empty($results)) {
            return;
        }

        $this->ndt_accepted = in_array('rejected', $results, true) ? 'rejected' : 'accepted';
    }

    public function weldLog(): BelongsTo
    {
        return $this->belongsTo(WeldLog::class);
    }

    public function wps(): BelongsTo
    {
        return $this->belongsTo(Wps::class);
    }

    public function originalWeld(): BelongsTo
    {
        return $this->belongsTo(self::class, 'original_weld_id');
    }

    public function repairs(): HasMany
    {
        return $this->hasMany(self::class, 'original_weld_id')->orderBy('repair_no');
    }

    public function isRepair(): bool
    {
        return $this->type === self::TYPE_REPAIR;
    }

    /**
     * Display identifier: plain welds show "4", repairs show "4 R1".
     */
    public function getWeldLabelAttribute(): string
    {
        return $this->isRepair()
            ? "{$this->weld_no} R{$this->repair_no}"
            : (string) $this->weld_no;
    }

    public function getRepairReasonLabelAttribute(): ?string
    {
        return self::REPAIR_REASONS[$this->repair_reason] ?? null;
    }

    public function scopeRepairs($query)
    {
        return $query->where('type', self::TYPE_REPAIR);
    }

    public function scopeOriginals($query)
    {
        return $query->where('type', self::TYPE_WELD);
    }

    /**
     * Next free repair number for a given original weld, starting at 1.
     * Repairs of repairs roll up to the same original, so 4 R1 -> 4 R2.
     */
    public static function nextRepairNo(self $original): int
    {
        return (int) static::where('weld_log_id', $original->weld_log_id)
            ->where('weld_no', $original->weld_no)
            ->max('repair_no') + 1;
    }
}
