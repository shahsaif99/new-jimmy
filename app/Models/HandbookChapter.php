<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HandbookChapter extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'content',
        'handbook_id',
        'chapter'
    ];

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('title', 'like', '%'.$queryString.'%');
    }
}
