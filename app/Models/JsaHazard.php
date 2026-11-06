<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JsaHazard extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_safety_analysis_id',
        'work_type',
        'hazard',
        'control',
        'sort_order',
    ];

    protected $casts = [
        'sort_order' => 'integer',
    ];

    public function jsa(): BelongsTo
    {
        return $this->belongsTo(JobSafetyAnalysis::class, 'job_safety_analysis_id');
    }
}
