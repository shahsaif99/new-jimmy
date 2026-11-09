<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    // Deploys only run migrate, never the seeders, so the permission this
    // module navigates by has to be created here or the menu entry is
    // invisible on the server.
    private array $permissions = ['jsa-overview'];

    public function up(): void
    {
        foreach ($this->permissions as $permName) {
            Permission::firstOrCreate([
                'name' => $permName,
                'guard_name' => 'sanctum',
            ]);
        }

        foreach (Role::all() as $role) {
            foreach ($this->permissions as $permName) {
                if (!$role->hasPermissionTo($permName)) {
                    $role->givePermissionTo($permName);
                }
            }
        }
    }

    public function down(): void
    {
        foreach ($this->permissions as $permName) {
            $perm = Permission::where('name', $permName)->where('guard_name', 'sanctum')->first();
            if ($perm) {
                $perm->delete();
            }
        }
    }
};
