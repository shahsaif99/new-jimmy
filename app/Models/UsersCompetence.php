<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UsersCompetence extends Model
{
    use HasFactory;

    /**
     * Get the user that owns the UsersCompetence
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user that owns the UsersCompetence
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function competence(): BelongsTo
    {
        return $this->belongsTo(Competence::class);
    }
}
