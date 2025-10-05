<?php

use App\Events\NewNotification;
use App\Models\User;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\HomeController;

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

Route::get('test', function () {
    $user = User::first();
    $user->notify(new NewNotification($user,'You have a new checklist to complete'));
});
Route::get('/', function () {
    return redirect('/login');
});

Route::get('/{vue?}', function () {
    return view('application');
})->where('vue', '^(?!attachments).*$');
