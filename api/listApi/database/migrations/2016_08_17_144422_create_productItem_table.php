<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productItems', function (Blueprint $table) {
            $table->increments('id');
            $table->string('amount');
            $table->boolean('inBasket');
            $table->integer('product_id')->unsigned();
            $table->integer('recipe_id')->unsigned();
            $table->integer('list_id')->unsigned();

            $table->foreign('product_id')->references('id')->on('products');
            $table->foreign('recipe_id')->references('id')->on('recipes');
            $table->foreign('list_id')->references('id')->on('lists');
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
        Schema::drop('productItems');
    }
}
