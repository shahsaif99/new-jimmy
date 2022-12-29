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
            'first_name' => 'Andromeda',
            'last_name' => 'Galaxy',
            'email' => 'superadmin@admin.com',
            'email_verified_at' => now(),
            'password' =>'password'
        ]);

        User::create([
            'last_name' => 'Cygnus',
            'first_name' => 'A',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'role' => 'admin',
            'password' => 'password'
        ]);

        User::create([
            'first_name' => 'Milky Way',
            'last_name' => 'Galaxy',
            'email' => 'user@gmail.com',
            'email_verified_at' => now(),
            'role' => 'user',
            'password' => 'password'
        ]);

    }
}
