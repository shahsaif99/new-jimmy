<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Intervention\Image\ImageManagerStatic;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Validator::extend('imageable', function ($attribute, $value, $params, $validator) {
        //     try {
        //         ImageManagerStatic::make($value);
        //         return true;
        //     } catch (\Exception $e) {
        //         return false;
        //     }
        // });

        Password::defaults(function () {
            Password::min(6)
            ->letters()
            ->numbers()
            ->symbols()
            ->mixedCase()
            ->uncompromised();
        });
    }
}
