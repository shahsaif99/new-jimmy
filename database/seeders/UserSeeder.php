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
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' =>'password'
        ]);

        User::create([
            'name' => 'Sean',
            'email' => 'bdm@gmail.com',
            'email_verified_at' => now(),
            'role' => 'bdm',
            'password' => 'password'
        ]);

        User::create([
            'name' => 'David',
            'email' => 'broker@gmail.com',
            'email_verified_at' => now(),
            'role' => 'broker',
            'password' => 'password'
        ]);

        User::create([
            'name' => 'Jhon',
            'email' => 'partner@gmail.com',
            'email_verified_at' => now(),
            'role' => 'partner',
            'password' => 'password'
        ]);
    }
}
