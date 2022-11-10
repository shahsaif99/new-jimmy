<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@admin.com',
            'email_verified_at' => now(),
            'role' => 'superadmin',
            'password' =>'password'
        ]);

        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' => 'password'
        ]);

        User::create([
            'name' => 'David',
            'email' => 'user@gmail.com',
            'email_verified_at' => now(),
            'role' => 'user',
            'password' => 'password'
        ]);

    }
}
