<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $permissions = ['wps-overview', 'weld-log-overview'];

        foreach ($permissions as $permName) {
            Permission::firstOrCreate([
                'name' => $permName,
                'guard_name' => 'sanctum',
            ]);
        }

        // Give to all existing roles
        $roles = Role::all();
        foreach ($roles as $role) {
            foreach ($permissions as $permName) {
                if (!$role->hasPermissionTo($permName)) {
                    $role->givePermissionTo($permName);
                }
            }
        }
    }

    public function down(): void
    {
        $permissions = ['wps-overview', 'weld-log-overview'];

        foreach ($permissions as $permName) {
            $perm = Permission::where('name', $permName)->where('guard_name', 'sanctum')->first();
            if ($perm) {
                $perm->delete();
            }
        }
    }
};
