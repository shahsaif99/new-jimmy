<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\InformationBoard;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function statistics()
    {

        return [

        ];
    }


    public function storeBoardInformation(Request $request){

        InformationBoard::create($request->all());
    }
}
