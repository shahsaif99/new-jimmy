<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApiCategory extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%' . $queryString . '%');
    }

    public function childrens()
    {
        return $this->hasMany(ApiCategory::class, 'category_id')->with('parent');
    }


    /**
     * Get the parent that owns the ApiCategory
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(ApiCategory::class, 'category_id', 'id');
    }
}
