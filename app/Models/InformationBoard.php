<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InformationBoard extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'content'];

    protected $table = 'information_board';


    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }

     public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('content', 'like', '%'.$queryString.'%') ;
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
