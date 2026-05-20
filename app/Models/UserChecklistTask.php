<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserChecklistTask extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'is_img_required' => 'boolean',
        'position' => 'integer',
    ];

    public function section()
    {
        return $this->belongsTo(UserChecklistSection::class, 'user_checklist_section_id');
    }

    public function answer()
    {
        return $this->hasOne(TaskCheckListAnswer::class, 'user_checklist_task_id');
    }
}
