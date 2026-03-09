<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Weld extends Model
{
    use HasFactory;

    protected $fillable = [
        'weld_log_id',
        'weld_no',
        'wps_id',
        'welder_id',
        'weld_date',
        'visual_inspection',
        'ndt_rt',
        'ndt_mt',
        'ndt_pt',
        'ndt_vt',
        'ndt_accepted',
    ];

    protected $casts = [
        'weld_date' => 'date',
        'ndt_rt' => 'boolean',
        'ndt_mt' => 'boolean',
        'ndt_pt' => 'boolean',
        'ndt_vt' => 'boolean',
    ];

    public function weldLog(): BelongsTo
    {
        return $this->belongsTo(WeldLog::class);
    }

    public function wps(): BelongsTo
    {
        return $this->belongsTo(Wps::class);
    }
}
