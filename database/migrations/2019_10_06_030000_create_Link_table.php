<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('LINKS', function (Blueprint $table) {
            $table->integer('LINK_NO')->autoIncrement();
            $table->string('LINK_NAME')->nullable(false);
            $table->integer('LIST_NO')->nullable(false);
            $table->text('LINK_URL')->nullable(false);
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
        Schema::dropIfExists('LINK');
    }
}
