<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskCheckListAnswer extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const ANSWER_PASS = 'PASS';
    public const ANSWER_FAIL = 'FAIL';
    public const ANSWER_NA = 'NA';

    public const ANSWERS = [self::ANSWER_PASS, self::ANSWER_FAIL, self::ANSWER_NA];

    public function checklistTask()
    {
        return $this->belongsTo(ChecklistTask::class);
    }

    public function userChecklist()
    {
        return $this->belongsTo(UserChecklist::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function deviation()
    {
        return $this->belongsTo(AvvikListing::class, 'avvik_listing_id');
    }
}

TaskCheckListAnswer::saved(function ($answer) {
    $answer->userChecklist?->recalculateProgress();
});

TaskCheckListAnswer::deleted(function ($answer) {
    $answer->userChecklist?->recalculateProgress();
});
