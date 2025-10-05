<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checklist extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function sections()
    {
        return $this->hasMany(Section::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function userChecklists()
    {
        return $this->hasMany(UserChecklist::class);
    }
    public function tasks ()
    {
       return $this->hasManyThrough(ChecklistTask::class, Section::class,'checklist_id','section_id','id','id');
    }
}
