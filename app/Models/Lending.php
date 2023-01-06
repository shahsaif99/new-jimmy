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
        'lending_date',
        'returned_date',
        'loaned_to',
        'equipment_id',
        'registered_by',
    ];


    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }


    // public function scopeSearch($query, $queryString)
    // {
    //     return $query
    //         ->where('name', 'like', '%'.$queryString.'%')
    //         ->OrWhere('customer', 'like', '%'.$queryString.'%');
    // }


    public function scopeApplyFilters($query, Request $request)
    {
        $user = auth()->user();
        // $isCompany = $user->hasRole('Company');
        $query
        ->when($request->sortDesc, function ($query, $sortDesc) {
            $query->orderByDesc('id');
        })
        ->when($request->equipmentId, function ($query, $equipmentId) {
            $query->where('equipment_id', $equipmentId);
        })
        ->when($request->userId, function ($query, $userId) {
            $query->where('user_id', $userId);
        })
        ->when($request->sortBy, function ($query, $sortBy) {
            $query->orderBy($sortBy);
        }, function ($query) {
            $query->latest();
        });
    }

    /**
     * Get the registeredBy that owns the Lending
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function registeredBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'registered_by');
    }

    /**
     * Get the equipment that owns the Lending
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function equipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class);
    }

}
