<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class ChecklistPermissionsSeeder extends Seeder
{
    public const PERMISSIONS = [
        'checklist-view-all',
        'checklist-view-own',
        'checklist-create',
        'checklist-edit',
        'checklist-delete',
        'checklist-assign',
        'checklist-perform',
        'checklist-submit',
        'checklist-export',
    ];

    public const ADMIN_ONLY = [
        'checklist-view-all',
        'checklist-create',
        'checklist-edit',
        'checklist-delete',
        'checklist-assign',
        'checklist-export',
    ];

    public const EMPLOYEE_AND_USER = [
        'checklist-view-own',
        'checklist-perform',
        'checklist-submit',
    ];

    public function run(): void
    {
        foreach (self::PERMISSIONS as $name) {
            Permission::firstOrCreate(['name' => $name, 'guard_name' => 'sanctum']);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();

        if ($admin = Role::where(['name' => 'Admin', 'guard_name' => 'sanctum'])->first()) {
            $admin->givePermissionTo(self::PERMISSIONS);
        }

        foreach (['Employee', 'User'] as $roleName) {
            if ($role = Role::where(['name' => $roleName, 'guard_name' => 'sanctum'])->first()) {
                $role->givePermissionTo(self::EMPLOYEE_AND_USER);
            }
        }
    }
}
