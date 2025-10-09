<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'number',
        'category_id',
    ];

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%' . $queryString . '%');
    }

    public function childrens()
    {
        return $this->hasMany(Category::class, 'category_id')->with('parent');
    }


    /**
     * Get the parent that owns the Category
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

}
