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
            'manage-permissions', 'manage-roles', 'projects-listings', 'dashboard','boardinformation-add',
            'authentication', 'manage-users', 'document-center', 'equipments-listings','employees-listings',
            'documentcenter', 'projects-add-documents', 'projects-add','equipment-add','equipments-edit',
            'equipments-delete','employee-details','absences-add','absences-listings','competence-listings',
            'employee-delete','employee-edit','employee-add','my-profile-view','password-view','competence-add',
            'lendings-history','employee-status','vacations-overview','absence-overview','vacations-add','my-absence','my-vacations'
        ];

        $permissions = collect($arrayOfPermissionNames)->map(function ($permission) {
            return ['name' => $permission, 'guard_name' => 'sanctum'];
        });

        Permission::insert($permissions->toArray());

        $role1 = Role::create(['name' => 'Admin','guard_name' => 'sanctum']);
        $role2 = Role::create(['name' => 'Employee','guard_name' => 'sanctum']);
        $role3 = Role::create(['name' => 'User','guard_name' => 'sanctum']);

        foreach ($permissions as $permission) {
            if(!in_array($permission['name'], ['my-absence','my-vacations'])){
                $role1->givePermissionTo($permission['name']);
            }
        }

        $employeePermissionsArray = [
            'projects-listings', 'dashboard','lendings-history',
            'authentication', 'document-center', 'equipments-listings','employees-listings',
            'documentcenter', 'projects-add-documents','employee-details','my-absence','my-vacations',
            'competence-listings','my-profile-view','password-view','absences-add','absences-listings','vacations-add',
        ];


        foreach ($employeePermissionsArray as $permission2) {
            $role2->givePermissionTo($permission2);
            $role3->givePermissionTo($permission2);
        }


        // Role::insert($roles->toArray());

        $admin = User::create([
            'first_name' => 'Admin',
            'last_name' => 'Galaxy',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' =>'password',
            'gender' =>'Male'
        ]);


        $employee = User::create([
            'first_name' => 'Employee',
            'last_name' => 'Galaxy',
            'email' => 'employee@gmail.com',
            'email_verified_at' => now(),
            'password' =>'password',
            'holidays' => 10,
            'gender' =>'Male'
        ]);

        $user = User::create([
            'first_name' => 'Sean',
            'last_name' => 'Afrani',
            'email' => 'user@gmail.com',
            'email_verified_at' => now(),
            'password' =>'password',
            'holidays' => 10,
            'gender' =>'Male'
        ]);

        $admin->assignRole($role1);
        $employee->assignRole($role2);
        $user->assignRole($role3);

    }
}
