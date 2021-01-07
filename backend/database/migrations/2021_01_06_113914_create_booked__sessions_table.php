<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookedSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booked__sessions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('timeslots_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('tutor_id');
            $table->unsignedBigInteger('course_id');
            $table->string('meeting_type');
            $table->date("date");
            $table->string("payment");
            $table->timestamps();

            $table->foreign('timeslots_id')->references('id')->on('timeslots')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('tutor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
        
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('booked__sessions');
    }
}
