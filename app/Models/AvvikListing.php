<?php

namespace App\Models;

use Illuminate\Http\Request;
use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AvvikListing extends Model
{
    use HasFactory, Mediable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */

     protected $appends = ['close_status'];

    protected $fillable = [
      'type',
      'title',
      'date',
      'time_of_incident',
      'department',
      'registered_by',
      'responsible_person',
      'project_id',
      'location',
      'severity',
      'description',
      'event_type',
      'immediate_action',
      'casual_analysis',
      'days_of_absence',
      'cost',
      'closing_deadline',
      'corrective_actions',
      'close_date',
      'status',
      'closed_by_id',
      'close_comment',
      'user_id',
      'supplier_id',
      'equipment_id',
      'economic_consequences',
      'resulted_in_absence',
      'medical_treatment_needed',
    ];

    public function getCloseStatusAttribute()
    {
        if($this->close_date){
            return 'Closed';
        }else{
            return 'Open';
        }
    }




    public function scopeApplyFilters($query, Request $request)
    {

        $query->when($request->q, function ($query, $queryString) {
            $query->where('title', 'like', '%'.$queryString.'%');
        })->when($request->range, function ($query) use($request) {
            $dates = explode('to', $request->range);
            $date1 = trim($dates[0]);
            $date2 = trim($dates[1]);
            $query->whereBetween('close_date', [$date1, $date2]);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function supplier()
    {
        return $this->belongsTo(CustomerSupplier::class, 'supplier_id');
    }

    public function equipment()
    {
        return $this->belongsTo(Equipment::class);
    }

    public function closedBy()
    {
        return $this->belongsTo(User::class, 'closed_by_id');
    }

}
