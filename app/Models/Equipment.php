<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Equipment extends Model
{
    use HasFactory, Mediable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'serial_number',
        'supplier',
        'category_id',
        'certificate_number',
        'valid_until',
        'project_id',
        'user_id',
        'image',
        'storage_location_id',
        'checklist_id',
        'procedure_id',
        'level_of_training',
        'qr_code',
        'tool_id'
    ];

    protected $appends = ['image_url', 'status', 'loaned_to'];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'qr_code' => 'boolean',
        'valid_until' => 'datetime',
        'storage_location_id' => 'integer',
        'checklist_id' => 'integer',
        'procedure_id' => 'integer',
        'tool_id' => 'string',
    ];
    protected function prepareForValidation()
    {
        $this->merge([
            'checklist_id' => $this->checklist_id === '' ? null : $this->checklist_id,
            'procedure_id' => $this->procedure_id === '' ? null : $this->procedure_id,
        ]);
    }

    // created at
    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->format('d-m-Y');
    }

    // get user avatar from media library
    public function getImageUrlAttribute($value)
    {
        return '/storage/equipment/' . $this->image;
    }

    public function scopeSearch($query, $queryString)
    {
        return $query
            ->where('name', 'like', '%' . $queryString . '%')
            ->orWhere('certificate_number', 'like', '%' . $queryString . '%')
            ->orWhere('serial_number', 'like', '%' . $queryString . '%');
    }

    public function scopeApplyFilters($query, Request $request)
    {
        $user = auth()->user();
    
        $query
            ->when($request->sortDesc, function ($query, $sortDesc) {
                $query->orderByDesc('id');
            })
            ->when($request->userId, function ($query, $userId) {
                $query->where('user_id', $userId);
            })
            ->when($request->isExpiring, function ($query) {
                $query->whereBetween('valid_until', [Carbon::now(), Carbon::now()->addMonths(3)]);
            })
            ->when($request->sortBy, function ($query, $sortBy) {
                $query->orderBy($sortBy);
            }, function ($query) {
                $query->latest();
            })
            ->when($request->category, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($request->storage, function ($query, $storageId) {
                $query->where('storage_location_id', $storageId);
            })
            ->when($request->status, function ($query, $status) {
                $query->where(function ($q) use ($status) {
                    if ($status === 'valid') {
                        $q->whereRaw('DATEDIFF(valid_until, NOW()) >= 90');
                    } elseif ($status === 'expires') {
                        $q->whereRaw('DATEDIFF(valid_until, NOW()) BETWEEN 0 AND 89');
                    } elseif ($status === 'expired') {
                        $q->whereRaw('DATEDIFF(valid_until, NOW()) < 0');
                    }
                });
            })
            ->when($request->lending_status, function ($query, $lendingStatus) {
                if ($lendingStatus === 'lending') {
                    $query->whereHas('latestLog', function ($q) {
                        $q->whereNull('returned_at')->orWhere('returned_at', '>', now());
                    });
                } elseif ($lendingStatus === 'storage') {
                    $query->doesntHave('latestLog');
                }
            })
            ->when($request->level_of_training, function ($query, $level) {
                $query->where('level_of_training', $level);
            });
    }
    

    /**
     * Get the project that owns the Equipment
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    // Relationship to category
    public function category(): BelongsTo
    {
        return $this->belongsTo(EquipmentCategory::class, 'category_id');
    }

    // Relationship to storage location
    public function storageLocation(): BelongsTo
    {
        return $this->belongsTo(StorageLocation::class, 'storage_location_id');
    }

    // Relationship to checklist (optional)
    public function checklist(): BelongsTo
    {
        return $this->belongsTo(Checklist::class, 'checklist_id');
    }

    // Relationship to procedure (optional)
    public function procedure(): BelongsTo
    {
        return $this->belongsTo(Document::class, 'procedure_id');
    }

    public function latestLog()
    {
        return $this->hasOne(Lending::class)->latestOfMany();
    }
    public function getStatusAttribute()
    {
        if ($this->latestLog && (!$this->latestLog->returned_at || now()->lt($this->latestLog->returned_at))) {
            return 'lending';
        }
        return 'storage';
    }

    public function getLoanedToAttribute()
    {
        if ($this->latestLog && (!$this->latestLog->returned_at || now()->lt($this->latestLog->returned_at))) {
            return $this->latestLog->loaned_to;
        }
        return null;
    }

    protected static function booted()
    {
        static::saving(function ($item) {
            $item->user_id = auth()->id();
        });
    }
}
