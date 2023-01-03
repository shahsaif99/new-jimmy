<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Competence extends Model
{
    use HasFactory, Mediable;

      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'completed_date',
        'valid_until',
    ];


    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }


    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%'.$queryString.'%');
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


     /**
     * The users that belong to the role.
     */
    public function employees()
    {
        return $this->belongsToMany(User::class, 'users_competences', 'competence_id', 'user_id');
    }


    /**
     * Get all of the comments for the Competence
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function usersCompetences(): HasManyThrough
    {
        return $this->hasManyThrough(User::class, Competence::class);
    }


    protected static function booted()
    {
        static::deleting(function ($item) {
            $item->employees()->delete();
        });
    }

}
