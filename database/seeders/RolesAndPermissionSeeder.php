<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //

        $arrayOfPermissionNames = [
            'manage-permissions', 'manage-roles', 'projects-listings', 'dashboard',
            'authentication', 'manage-users', 'manage-competence', 'document-center', 'equipment-view',
            'documentcenter', 'projects-add-documents', 'projects-add'
        ];

        $permissions = collect($arrayOfPermissionNames)->map(function ($permission) {
            return ['name' => $permission, 'guard_name' => 'sanctum'];
        });

        Permission::insert($permissions->toArray());

        $role1 = Role::create(['name' => 'Admin','guard_name' => 'sanctum']);
        $role2 = Role::create(['name' => 'Employee','guard_name' => 'sanctum']);
        $role3 = Role::create(['name' => 'User','guard_name' => 'sanctum']);

        foreach ($permissions as $permission) {
            $role1->givePermissionTo($permission['name']);
        }


        // Role::insert($roles->toArray());

        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'Galaxy',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' =>'password'
        ]);


        $employee = User::create([
            'first_name' => 'Employee',
            'last_name' => 'Galaxy',
            'email' => 'employee@gmail.com',
            'email_verified_at' => now(),
            'password' =>'password'
        ]);

        $admin->assignRole($role1);
        $employee->assignRole($role2);

    }
}
