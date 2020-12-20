<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('university_id');
            $table->unsignedBigInteger('major_id');
            $table->unsignedBigInteger('degree_id');
            $table->date('graduation_date');
            $table->text('bio')->nullable();
            $table->text('cv')->nullable();
            $table->unsignedBigInteger('hours_tutored')->default(false);
            $table->unsignedBigInteger('students_tutored')->default(false);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->index('user_id');
            $table->foreign('university_id')->references('id')->on('universities')->onDelete('cascade');
            $table->foreign('major_id')->references('id')->on('majors')->onDelete('cascade');
            $table->foreign('degree_id')->references('id')->on('degrees')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profiles');
    }
}
