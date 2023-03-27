<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Handbook extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'document_number',
        'revised',
        'scope',
        'author',
        'approved',
        'revised_date',
    ];


    public function scopeApplyFilters($query, Request $request)
    {

        $query->when($request->q, function ($query, $queryString) {
            $query->where('title', 'like', '%'.$queryString.'%')
            ->orWhere('document_number', 'like', '%'.$queryString.'%');
        });
    }
}
