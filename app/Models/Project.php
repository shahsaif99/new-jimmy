<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class Project extends Model
{
    use HasFactory, Mediable;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'status',
        'customer_id',
        'project_no',
        'start_date',
        'end_date',
        'project_manager_id',
        'project_hse_manager_id',
        'description',
        'cost',
        'hour',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'cost' => 'decimal:2',
        'hour' => 'integer',
    ];

    /**
     * Format created_at attribute.
     */
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('d-m-Y');
    }

    /**
     * Search projects by name or customer.
     */
    public function scopeSearch($query, $queryString)
    {
        return $query->where('name', 'like', '%' . $queryString . '%')
            ->orWhereHas('customer', function ($query) use ($queryString) {
                $query->where('name', 'like', '%' . $queryString . '%');
            });
    }

    /**
     * Apply filters dynamically.
     */
    public function scopeApplyFilters($query, Request $request)
    {
        return $query
            ->when($request->sortBy, function ($q, $sortBy) use ($request) {
                $direction = $request->sortDesc === 'true' ? 'desc' : 'asc';
    
                // If sorting by `project_no`, cast it as an integer to prevent string sorting
                if ($sortBy === 'project_no') {
                    return $q->orderByRaw("CAST(project_no AS UNSIGNED) $direction");
                }
    
                return $q->orderBy($sortBy, $direction);
            }, fn($q) => $q->latest('id')) // Default sorting by latest ID
    
            ->when($request->customer_id, fn($q, $customer_id) => $q->where('customer_id', $customer_id))
            ->when($request->status, fn($q, $status) => $q->where('status', $status))
            ->when($request->has('date') && is_array($request->date) && count($request->date) === 2, function ($q) use ($request) {
                $startDate = $request->date[0] . ' 00:00:00';
                $endDate = $request->date[1] . ' 23:59:59';
                $q->whereBetween('created_at', [$startDate, $endDate]);
            });
    }
    
    
    

    /**
     * Relationships.
     */
    public function customer(): BelongsTo
    {
        return $this->belongsTo(CustomerSupplier::class, 'customer_id');
    }

    public function projectManager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'project_manager_id');
    }

    public function projectHSEManager(): BelongsTo
    {
        return $this->belongsTo(User::class, 'project_hse_manager_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }

    /**
     * Ensure user can only modify their own projects.
     */
    protected static function booted()
    {
        static::saving(function ($item) {
            $item->user_id = auth()->id();
        });
    }
}
