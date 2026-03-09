<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $permissions = [
            'wps-create',
            'wps-edit',
            'wps-delete',
            'weld-log-create',
            'weld-log-edit',
            'weld-log-delete',
        ];

        foreach ($permissions as $permName) {
            Permission::firstOrCreate([
                'name' => $permName,
                'guard_name' => 'sanctum',
            ]);
        }

        // Only give these permissions to Admin role
        $adminRole = Role::where('name', 'Admin')->where('guard_name', 'sanctum')->first();
        if ($adminRole) {
            foreach ($permissions as $permName) {
                if (!$adminRole->hasPermissionTo($permName)) {
                    $adminRole->givePermissionTo($permName);
                }
            }
        }
    }

    public function down(): void
    {
        $permissions = [
            'wps-create',
            'wps-edit',
            'wps-delete',
            'weld-log-create',
            'weld-log-edit',
            'weld-log-delete',
        ];

        foreach ($permissions as $permName) {
            $perm = Permission::where('name', $permName)->where('guard_name', 'sanctum')->first();
            if ($perm) {
                $perm->delete();
            }
        }
    }
};
