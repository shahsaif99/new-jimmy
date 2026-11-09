<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class JobSafetyAnalysis extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'job_safety_analyses';

    public const STATUSES = ['draft', 'active', 'completed'];

    protected $fillable = [
        'jsa_no',
        'title',
        'project_id',
        'jsa_date',
        'work_location',
        'jsa_leader_id',
        'status',
        'description',
        'created_by',
    ];

    protected $casts = [
        'jsa_date' => 'date',
    ];

    protected static function booted(): void
    {
        // The number has to survive edits, so it is stamped once on create and
        // never recalculated. Offsetting from the id keeps it unique without a
        // counter table and matches the S-1001 convention the checklist report
        // already uses.
        static::created(function (self $jsa) {
            if (!$jsa->jsa_no) {
                $jsa->forceFill(['jsa_no' => 'JSA-' . (1000 + $jsa->id)])->saveQuietly();
            }
        });
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function leader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'jsa_leader_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function hazards(): HasMany
    {
        return $this->hasMany(JsaHazard::class)->orderBy('sort_order')->orderBy('id');
    }

    public function participants(): HasMany
    {
        return $this->hasMany(JsaParticipant::class)->orderBy('id');
    }

    public function scopeSearch($query, $queryString)
    {
        if (!$queryString) {
            return $query;
        }

        return $query->where(function ($q) use ($queryString) {
            $q->where('title', 'like', '%' . $queryString . '%')
                ->orWhere('jsa_no', 'like', '%' . $queryString . '%')
                ->orWhere('work_location', 'like', '%' . $queryString . '%');
        });
    }

    public function scopeApplyFilters($query, Request $request)
    {
        return $query
            ->when($request->status, fn ($q, $status) => $q->where('status', $status))
            ->when($request->project_id, fn ($q, $projectId) => $q->where('project_id', $projectId))
            ->when($request->jsa_leader_id, fn ($q, $leaderId) => $q->where('jsa_leader_id', $leaderId))
            ->when($request->date_from, fn ($q, $from) => $q->whereDate('jsa_date', '>=', $from))
            ->when($request->date_to, fn ($q, $to) => $q->whereDate('jsa_date', '<=', $to));
    }

    /**
     * "My JSAs": the ones this user actually has a stake in — they lead it,
     * they created it, or they are expected to sign it.
     */
    public function scopeInvolving($query, $userId)
    {
        return $query->where(function ($q) use ($userId) {
            $q->where('jsa_leader_id', $userId)
                ->orWhere('created_by', $userId)
                ->orWhereHas('participants', fn ($p) => $p->where('user_id', $userId));
        });
    }
}
