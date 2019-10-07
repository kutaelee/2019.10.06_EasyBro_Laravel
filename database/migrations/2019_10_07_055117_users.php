<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Users extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('USERS', function (Blueprint $table) {
            $table->integer('USER_NO')->autoIncrement();
            $table->string('USER_ID')->unique()->nullable(false);
            $table->text('USER_PW')->nullable(false);
            $table->text('USER_EMAIL')->nullable(false);
            $table->timestamp('USER_CREATE_AT')->useCurrent();
            $table->timestamp('USER_UPDATE_AT')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('USERS');
    }
}
