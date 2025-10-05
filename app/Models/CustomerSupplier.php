<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerSupplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'name',
        'address',
        'postal_code',
        'place',
        'contact_person',
        'email',
        'telephone_number',
        'website',
        'customer_manager_id',
        'organization_number',
        'status',
        'management_systems',
        'supplier_of',
        'total_evaluation'
    ];

    protected $attributes = [
        'status' => 'not_approved',
    ];

    protected $casts = [
        'management_systems' => 'array',
        'supplier_of' => 'array',
    ];

    public function evaluations()
    {
        return $this->hasMany(SupplierEvaluation::class, 'supplier_id');
    }

    public function customerManager()
    {
        return $this->belongsTo(User::class, 'customer_manager_id');
    }
}
