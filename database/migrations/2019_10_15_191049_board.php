<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Board extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('BOARD', function (Blueprint $table) {
            $table->integer('DOC_NO')->autoIncrement();
            $table->integer('LIST_NO')->nullable(false);
            $table->integer('SHARE_COUNT')->default(0);
            $table->timestamp('DOC_CREATE_AT')->useCurrent();
            $table->foreign('LIST_NO')->references('LIST_NO')->on('LINK_LIST')->onDelete('cascade');
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('BOARD');
    }
}
