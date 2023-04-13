<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'handbook_id',
    ];

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%'.$queryString.'%');
    }

    // filtes handbook_id
    public function scopeApplyFilters($query, $request)
    {
        $query->when($request->handbook_id, function ($query, $handbookId) {
            $query->where('handbook_id', $handbookId);
        });
    }

    public function handbook()
    {
        return $this->belongsTo(Handbook::class);
    }


}
