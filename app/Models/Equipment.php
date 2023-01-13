<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Equipment extends Model
{
    use HasFactory, Mediable;

      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'serial_number',
        'supplier',
        'category',
        'certificate_number',
        'valid_until',
        'project_id',
        'user_id',
        'image',
    ];


    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }

     // get user avatar from media library
     public function getImageUrlAttribute($value)
     {
         return '/storage/equipment/'.$this->image;
     }


    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%'.$queryString.'%')
            ->OrWhere('certificate_number', 'like', '%'.$queryString.'%')
            ->OrWhere('serial_number', 'like', '%'.$queryString.'%');
    }


    public function scopeApplyFilters($query, Request $request)
    {
        $user = auth()->user();
        $query
        ->when($request->sortDesc, function ($query, $sortDesc) {
            $query->orderByDesc('id');
        })
        ->when($request->userId, function ($query, $userId) {
            $query->where('user_id', $userId);
        })
        ->when($request->isExpiring, function ($query) {
            $query->whereBetween('valid_until', [Carbon::now(), Carbon::now()->addMonths(3)] );
        })
        ->when($request->sortBy, function ($query, $sortBy) {
            $query->orderBy($sortBy);
        }, function ($query) {
            $query->latest();
        });
    }

       /**
     * Get the project that owns the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    protected static function booted()
    {
        static::saving(function ($item) {
            $item->user_id = auth()->id();
        });
    }

}
