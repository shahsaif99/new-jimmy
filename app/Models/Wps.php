<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Plank\Mediable\Mediable;

class Wps extends Model
{
    use HasFactory, Mediable;

    protected $fillable = [
        'name',
        'wpqr',
        'welding_process',
        'material_group',
        'welding_position',
        'joint_type',
        'thickness_min',
        'thickness_max',
        'diameter_min',
        'diameter_max',
        'layer',
        'sides',
        'standard',
        'ref_spec',
        'prepared_date',
        'prepared_by',
        'project_id',
    ];

    protected $casts = [
        'joint_type' => 'array',
        'welding_position' => 'array',
        'standard' => 'array',
        'ref_spec' => 'array',
        'prepared_date' => 'date',
    ];

    public function scopeSearch($query, $queryString)
    {
        if (!$queryString) return $query;

        return $query->where('name', 'like', '%' . $queryString . '%')
            ->orWhere('wpqr', 'like', '%' . $queryString . '%');
    }

    public function scopeApplyFilters($query, Request $request)
    {
        return $query
            ->when($request->project_id, fn($q, $projectId) => $q->where('project_id', $projectId))
            ->when($request->welding_process, fn($q, $val) => $q->where('welding_process', $val))
            ->when($request->material_group, fn($q, $val) => $q->where('material_group', $val))
            // Welders look a WPS up by its number, so the list reads A-Z rather
            // than newest-first.
            ->orderBy('name');
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function preparedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'prepared_by');
    }

    public function welds(): HasMany
    {
        return $this->hasMany(Weld::class);
    }
}
