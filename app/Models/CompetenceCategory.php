<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompetenceCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function competences()
    {
        return $this->hasMany(Competence::class, 'category_id');
    }
}
