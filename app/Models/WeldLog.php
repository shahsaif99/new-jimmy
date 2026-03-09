<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Plank\Mediable\Mediable;

class WeldLog extends Model
{
    use HasFactory, Mediable;

    protected $fillable = [
        'drawing_no',
        'project_id',
        'status',
        'ndt_required',
        'ndt_rt',
        'ndt_mt',
        'ndt_pt',
        'ndt_vt',
    ];

    protected $casts = [
        'ndt_required' => 'boolean',
        'ndt_rt' => 'integer',
        'ndt_mt' => 'integer',
        'ndt_pt' => 'integer',
        'ndt_vt' => 'integer',
    ];

    public function scopeSearch($query, $queryString)
    {
        if (!$queryString) return $query;

        return $query->where('drawing_no', 'like', '%' . $queryString . '%');
    }

    public function scopeApplyFilters($query, Request $request)
    {
        return $query
            ->when($request->project_id, fn($q, $projectId) => $q->where('project_id', $projectId))
            ->when($request->status, fn($q, $status) => $q->where('status', $status))
            ->latest('id');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function welds(): HasMany
    {
        return $this->hasMany(Weld::class);
    }
}
