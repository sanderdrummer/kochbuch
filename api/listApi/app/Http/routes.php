<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$app->get('/', function () use ($app) {
    return $app->version();
});

$app->get('product', [
    'as' => 'product', 'uses' => 'ProductController@read'
]);

$app->get('product/create', [
    'as' => 'product', 'uses' => 'ProductController@create'
]);

$app->get('product/update', [
    'as' => 'product', 'uses' => 'ProductController@update'
]);

$app->get('product/destroy', [
    'as' => 'product', 'uses' => 'ProductController@destroy'
]);
