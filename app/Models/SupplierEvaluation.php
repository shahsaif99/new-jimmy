<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierEvaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_id', 'performed_by', 'evaluation_date', 'total_score', 'status', 'evaluation_criteria'
    ];

    protected $casts = [
        'evaluation_criteria' => 'array',
    ];

    public function performedByUser()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }

}
