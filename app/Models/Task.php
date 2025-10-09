<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function assignedUsers ()
    {
        return $this->belongsToMany(User::class, 'task_users', 'task_id', 'user_id');
    }
    public function category ()
    {
        return $this->belongsTo(ApiCategory::class);
    }
    public function checklist ()
    {
        return $this->belongsTo(Checklist::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }
}
