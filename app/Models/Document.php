<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'subcategory',
        'created_date',
        'document_number',
        'revised_date',
        'revision_number',
        'author',
        'approved_by',
        'approved_date',
        'content',
        'type',
    ];
}
