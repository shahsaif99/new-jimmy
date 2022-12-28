<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\UserPasswordReset;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles, Mediable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone',
        'status',
        'avatar',
    ];

    protected $guard_name = 'sanctum';

    protected $appends = ['name','avatar_url'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'status' => 'boolean',
    ];

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('first_name', 'like', '%'.$queryString.'%')
            ->OrWhere('last_name', 'like', '%'.$queryString.'%');
    }

    // if user is deactive
    public function isDeactive()
    {
        return $this->status == 0;
    }

    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = Hash::make($password);
    }

     // get user avatar from media library
     public function getAvatarUrlAttribute($value)
     {
         return '/storage/'.$this->avatar;
     }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new UserPasswordReset($token));
    }

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Get all of the students for the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function students()
    {
        return $this->hasMany(Student::class, 'company_id');
    }

    public function applications()
    {
        return $this->hasMany(Application::class, 'company_id');
    }

    public function scopeApplyFilters($query, Request $request)
    {
        $user = auth()->user();
        $isCompany = $user->hasRole('Company');
        $query
        ->when($request->sortDesc, function ($query, $sortDesc) {
            $query->orderByDesc('id');
        })
        ->when($request->userId, function ($query, $userId) {
            $query->where('user_id', $userId);
        })
        ->when($request->role, function ($query, $role) {
            $query->role($role);
        })
        ->when($isCompany, function ($query) {
            $query
                ->whereBelongsTo(auth()->user());
        })

        ->when($request->sortBy, function ($query, $sortBy) {
            $query->orderBy($sortBy);
        }, function ($query) {
            $query->latest();
        });
    }

    /**
     * Get the user that owns the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function booted()
    {
        static::deleting(function ($item) {
            // $item->students()->delete();
            // $item->applications()->delete();
        });
    }
}
