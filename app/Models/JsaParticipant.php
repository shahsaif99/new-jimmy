<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JsaParticipant extends Model
{
    use HasFactory;

    public const STATUSES = ['not_signed', 'signed_in_app', 'signed_on_paper'];

    protected $fillable = [
        'job_safety_analysis_id',
        'user_id',
        'name',
        'signature_status',
        'signed_at',
        'recorded_by_id',
        'reminder_sent_at',
    ];

    protected $casts = [
        'signed_at' => 'datetime',
        'reminder_sent_at' => 'datetime',
    ];

    public function jsa(): BelongsTo
    {
        return $this->belongsTo(JobSafetyAnalysis::class, 'job_safety_analysis_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getHasSignedAttribute(): bool
    {
        return in_array($this->signature_status, ['signed_in_app', 'signed_on_paper'], true);
    }
}
