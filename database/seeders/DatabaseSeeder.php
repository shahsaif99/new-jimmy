<?php

namespace Database\Seeders;

use App\Models\CompetenceCategory;
use App\Models\CompetenceCourse;
use Illuminate\Database\Seeder;
use Database\Seeders\UserSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolesAndPermissionSeeder::class,
        ]);
        CompetenceCategory::create(['name' => 'Default']);
        CompetenceCourse::create(['name' => 'Default Course','category_id' => 1]);
    }
}
