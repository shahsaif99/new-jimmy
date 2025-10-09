<?php

namespace App\Http\Requests\StorageLocation;

use Illuminate\Foundation\Http\FormRequest;

class Store extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|string|max:100|unique:storage_locations,name',
        ];
    }
}

