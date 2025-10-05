<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_suppliers', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['customer', 'supplier', 'both']);
            $table->string('name');
            $table->string('address')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('place')->nullable();
            $table->string('contact_person')->nullable();
            $table->string('email')->nullable();
            $table->string('telephone_number')->nullable();
            $table->string('website')->nullable();
            $table->foreignId('customer_manager_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('organization_number')->nullable();
            $table->enum('status', ['approved', 'not_approved'])->default('not_approved');
            $table->json('management_systems')->nullable();
            $table->json('supplier_of')->nullable();
            $table->enum('total_evaluation', ['under_evaluation', 'preferred', 'acceptable', 'not_acceptable'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer_suppliers');
    }
};
