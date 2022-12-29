<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory, Mediable;

      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'customer',
        'user_id',
    ];


    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%'.$queryString.'%')
            ->OrWhere('customer', 'like', '%'.$queryString.'%');
    }


    public function scopeApplyFilters($query, Request $request)
    {
        $user = auth()->user();
        // $isCompany = $user->hasRole('Company');
        $query
        ->when($request->sortDesc, function ($query, $sortDesc) {
            $query->orderByDesc('id');
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

    protected static function booted()
    {
        static::saving(function ($item) {
            $item->user_id = auth()->id();
        });
    }

}
