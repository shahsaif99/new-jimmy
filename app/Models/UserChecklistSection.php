<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserChecklistSection extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function userChecklist()
    {
        return $this->belongsTo(UserChecklist::class);
    }

    public function tasks()
    {
        return $this->hasMany(UserChecklistTask::class)->orderBy('position');
    }
}
