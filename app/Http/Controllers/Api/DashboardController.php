<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;

class DashboardController extends Controller
{
    public function statistics()
    {

        return [

        ];
        // $role = auth()->user()->role;

        // $orders = Order::query()
        //     ->when($role == 'reseller', function ($query) {
        //         $query->where('user_id', auth()->user()->id);
        //     })
        //     ->get();

        // $orders->each(function ($order) {
        //     $order->licenses_count = count($order->licenses);
        //     $order->services_count = count($order->services);
        // });

        // $totalLicenses = $orders->sum('licenses_count');
        // $totalServices = $orders->sum('services_count');
        // $totalPlans = count($orders);

        // $totalOrders = Order::query()
        //     ->when($role == 'reseller', function ($query) {
        //         $query->where('user_id', auth()->user()->id);
        //     })
        //     ->count();

        // $totalResellers = User::query()->where([
        //     'role' => 'reseller',
        // ])->count();

        // $monthlySales = $this->generateMonthlySales($role);

        // $topResellerBySales = $this->topResellerBySales();

        // $totalSalesAmount = Order::when($role == 'reseller', function ($query) {
        //     $query->where('user_id', auth()->user()->id);
        // })
        //     ->whereYear('created_at', date('Y'))
        //     ->sum('total_amount');

        // return response()->json([
        //     'months' => $monthlySales['months'],
        //     'totalResellers' => $totalResellers,
        //     'totalOrders' => $totalOrders,
        //     'monthlySales' => $monthlySales['monthlySales'],
        //     'totalPlans' => $totalPlans,
        //     'totalLicenses' => $totalLicenses,
        //     'totalServices' => $totalServices,
        //     'totalSalesAmount' => $totalSalesAmount,
        //     'topResellerBySales' => $topResellerBySales,
        // ]);

    }

    public function generateMonthlySales($role)
    {
        $months = [];
        $monthlySales = [];
        for ($i = 0; $i <= 11; ++$i) {
            $months[$i] = date('F', mktime(0, 0, 0, $i + 1, 1));
            $monthlySales[$i] = Order::query()
                ->whereMonth('created_at', $i + 1)
                ->whereYear('created_at', date('Y'))
                ->when($role == 'reseller', function ($query) {
                    $query->where('user_id', auth()->user()->id);
                })
                ->sum('total_amount');
        }

        return [
            'months' => $months,
            'monthlySales' => $monthlySales,
        ];
    }

    public function topResellerBySales()
    {
        $data = User::query()
            ->whereRole('reseller')
            ->whereYear('created_at', date('Y'))
            ->select('id', 'name')
            ->withSum('orders', 'total_amount')
            ->orderBy('orders_sum_total_amount', 'desc')
            ->take(10)
            ->get();
        return [
            'names' => $data->pluck('name'),
            'sales' => $data->pluck('orders_sum_total_amount'),
        ];

    }
}
