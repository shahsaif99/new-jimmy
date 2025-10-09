<?php

namespace App\Models;

use App\Events\NewNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserChecklist extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function users ()
    {
        return $this->belongsToMany(User::class, 'user_checklist_pivots');
    }
    public function files ()
    {
        return $this->hasMany(UserChecklistFile::class);
    }
    public function checklist ()
    {
        return $this->belongsTo(Checklist::class);
    }
}
// observe changes in is_started on this model
UserChecklist::saved(function ($userChecklist) {
    if ($userChecklist->is_started) {
        $userChecklist->users->each(function ($user) use ($userChecklist) {
            $user->notify(new NewNotification($user,'You have a new checklist to complete'));
        });
    }
});
