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
        'revision_number',
        'revised_by',
        'scope',
        'author',
        'approved_by',
        'revised_date',
        'approved_date',
    ];


    public function scopeApplyFilters($query, Request $request)
    {

        $query->when($request->q, function ($query, $queryString) {
            $query->where('title', 'like', '%'.$queryString.'%')
            ->orWhere('document_number', 'like', '%'.$queryString.'%');
        });
    }

     // created at
     public function getCreatedAtAttribute($value)
     {
         return \Carbon\Carbon::parse($value)->format('d-m-Y');
     }


}
