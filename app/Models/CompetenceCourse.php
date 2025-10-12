<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetenceCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category_id'
    ];

    public function category()
    {
        return $this->belongsTo(CompetenceCategory::class, 'category_id');
    }

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%'.$queryString.'%');
    }
}
