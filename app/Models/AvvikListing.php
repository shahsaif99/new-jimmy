<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AvvikListing extends Model
{
    use HasFactory;
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
      'user_id',
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

}
