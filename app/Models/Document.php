<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category_id',
        'subcategory_id',
        'created_date',
        'document_number',
        'revised_date',
        'revision_number',
        'author',
        'approved_by',
        'approved_date',
        'content',
        'type',
        'tag_ids'
    ];

    // cast
    protected $casts = [
        'category_id' => 'integer',
        'subcategory_id' => 'integer',
        'tag_ids' => 'array',
    ];


    public function scopeApplyFilters($query, Request $request)
    {

        $query->when($request->q, function ($query, $queryString) {
            $query->where('title', 'like', '%'.$queryString.'%')
            ->orWhere('document_number', 'like', '%'.$queryString.'%');
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory()
    {
        return $this->belongsTo(Category::class);
    }
}
