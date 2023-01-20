<?php

namespace App\Models;

use App\Enums\LeaveStatus;
use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Absence extends Model
{
    use HasFactory, Mediable;

      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
        'from_date',
        'to_date',
        'days',
        'status',
        'approved_by',
        'approved_date',
        'comments',
        'user_id',
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'status' => LeaveStatus::class,
    ];


    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d.m.Y');
    }

    public function scopeSearch($query, $queryString)
    {
        return $query
        ->whereHas('user', function ($query) use ($queryString){
            $query->where('first_name', 'like', '%'.$queryString.'%');
            $query->OrWhere('last_name', 'like', '%'.$queryString.'%');
        });
    }


    public function scopeApplyFilters($query, Request $request)
    {


        $query
        ->when($request->sortDesc, function ($query, $sortDesc) {
            $query->orderByDesc('id');
        })
        ->when(in_array(auth()->user()->role, ['User', 'Employee']), function ($query) {
            $query->where('user_id', auth()->id());
        })
        ->when($request->userId, function ($query, $userId) {
            $query->where('user_id', $userId);
        })
        ->when($request->status, function ($query, $status) {
            $query->where('status', $status);
        })
        ->when($request->range, function ($query) use($request) {
            $dates = explode('to', $request->range);
            $date1 = trim($dates[0]);
            $date2 = trim($dates[1]);
            $query->whereBetween('created_at', [$date1, $date2]);
        })
        ->when($request->sortBy, function ($query, $sortBy) {
            $query->orderBy($sortBy);
        }, function ($query) {
            $query->latest();
        });
    }

    /**
     * Get the user that owns the Absence
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
