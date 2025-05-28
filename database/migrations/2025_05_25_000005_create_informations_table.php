<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('informations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('main_image_id')->constrained('galleries')->onDelete('cascade');
            $table->foreignId('body_image_id')->constrained('galleries')->onDelete('cascade');
            $table->text('paragraph_1');
            $table->text('paragraph_2');
            $table->text('paragraph_3');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informations');
    }
};
