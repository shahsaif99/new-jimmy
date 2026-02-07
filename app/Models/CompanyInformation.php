<?php

namespace App\Models;

use Plank\Mediable\Mediable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CompanyInformation extends Model
{
    use HasFactory, Mediable;

    protected $table = 'company_information';

    protected $fillable = [
        'legal_name',
        'display_name',
        'org_number',
        'duns_number',
        'contact_person',
        'email',
        'phone',
        'website',
        'postal_address',
        'visiting_address',
        'additional_information',
        'logo',
    ];

    protected $appends = ['logo_url'];

    public function getLogoUrlAttribute()
    {
        if ($this->logo) {
            return '/storage/company/' . $this->logo;
        }

        return null;
    }
}
