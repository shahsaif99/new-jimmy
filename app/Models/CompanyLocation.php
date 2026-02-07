<?php

namespace App\Models;

use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompanyLocation extends Model
{
    use HasFactory, Mediable;

    protected $fillable = [
        'title',
        'address',
    ];
}
