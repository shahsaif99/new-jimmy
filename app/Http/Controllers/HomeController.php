<?php

namespace App\Http\Controllers;

use App\Services\AuthorizedNetService;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public $authorizedNetService;

    public function __construct(AuthorizedNetService $authorizedService)
    {
        $this->authorizedNetService = $authorizedService;
    }

    public function index()
    {
        return view('application');
    }

    public function subscription(Request $request, $subscriptionId)
    {
        $subscription = $this->authorizedNetService->getSubscription($subscriptionId);

        dd($subscription);
    }

    public function transaction(Request $request, $transactionId)
    {
        $transaction = $this->authorizedNetService->getTransaction($transactionId);

        dd($transaction);
    }
}
