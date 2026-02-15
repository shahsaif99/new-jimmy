<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InformationBoard extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'content', 'visible_to', 'status', 'publish_at', 'push_notification'];

    protected $table = 'information_board';

    protected $casts = [
        'visible_to' => 'array',
        'push_notification' => 'boolean',
    ];

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d.m.Y - H:i');
    }

    public function scopeSearch($query, $queryString)
    {
        if (!$queryString) {
            return $query;
        }

        return $query->where(function ($q) use ($queryString) {
            $q->where('title', 'like', '%' . $queryString . '%')
              ->orWhere('content', 'like', '%' . $queryString . '%');
        });
    }

    public function scopeFilterStatus($query, $status)
    {
        if (!$status) {
            return $query;
        }

        return $query->where('status', $status);
    }

    public function scopeFilterVisibleTo($query, $visibleTo)
    {
        if (!$visibleTo) {
            return $query;
        }

        return $query->whereJsonContains('visible_to', $visibleTo);
    }


    /**
     * Get the user that owns the InformationBoard
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
