<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lending extends Model
{
    use HasFactory, Mediable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'loaned_to',
        'equipment_id',
        'registered_by',
        'returned_at',
        'return_by',
    ];

    /**
     * Accessor for the created_at attribute
     *
     * @param  string  $value
     * @return string
     */
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }

    /**
     * Scope to apply various filters to the query
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function scopeApplyFilters($query, Request $request)
    {
        $query
            ->when($request->sortDesc, function ($query, $sortDesc) {
                $query->orderByDesc('id');
            })
            ->when($request->equipmentId, function ($query, $equipmentId) {
                $query->where('equipment_id', $equipmentId);
            })
            ->when($request->userId, function ($query, $userId) {
                $query->where('return_by', $userId);
            })
            ->when($request->sortBy, function ($query, $sortBy) {
                $query->orderBy($sortBy);
            }, function ($query) {
                $query->latest();
            });
    }

    /**
     * Get the user who registered the lending
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function registeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by');
    }

    /**
     * Get the equipment associated with the lending
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

    /**
     * Get the user who returned the equipment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function returnBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'return_by');
    }
}
