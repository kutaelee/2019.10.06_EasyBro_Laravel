<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinkListTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('LINK_LIST', function (Blueprint $table) {
            $table->integer('LIST_NO')->autoIncrement();
            $table->string('LIST_NAME')->nullable(false);
            $table->string('LIST_OWNER')->nullable(false);
            $table->timestamp('LIST_CREATED_AT')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('LINK_LIST');
    }
}
