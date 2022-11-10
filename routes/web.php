<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/subscription/{id}', [HomeController::class, 'subscription'])->name('subscription');
// Route::get('/transaction/{id}', [HomeController::class, 'transaction'])->name('transaction');

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/{vue?}', function () {
    return view('application');
})->where('vue', '[\/\w\.-]*');
