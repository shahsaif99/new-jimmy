<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerSupplierDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_supplier_id',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
    ];

    public function customerSupplier()
    {
        return $this->belongsTo(CustomerSupplier::class);
    }
}
