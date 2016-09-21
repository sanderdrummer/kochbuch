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
    return 'Kuchen ist lecker';
});

$app->get('product', [
    'as' => 'product', 'uses' => 'ProductController@read'
]);

$app->get('product/create', [
    'as' => 'product', 'uses' => 'ProductController@create'
]);
$app->get('product/add', [
    'as' => 'product', 'uses' => 'ProductController@createAndAddToList'
]);

$app->get('product/update', [
    'as' => 'product', 'uses' => 'ProductController@update'
]);

$app->get('product/destroy', [
    'as' => 'product', 'uses' => 'ProductController@destroy'
]);



// recipe routes
$app->get('recipe', [
    'as' => 'recipe', 'uses' => 'RecipeController@read'
]);

$app->get('recipe/single', [
    'as' => 'recipe', 'uses' => 'RecipeController@readSingle'
]);

$app->get('recipe/create', [
    'as' => 'recipe', 'uses' => 'RecipeController@create'
]);

$app->get('recipe/update', [
    'as' => 'recipe', 'uses' => 'RecipeController@update'
]);

$app->get('recipe/destroy', [
    'as' => 'recipe', 'uses' => 'RecipeController@destroy'
]);

// productItem Routes
$app->get('item', [
    'as' => 'item', 'uses' => 'ProductItemController@read'
]);

$app->get('item/create', [
    'as' => 'item', 'uses' => 'ProductItemController@create'
]);

$app->get('item/update', [
    'as' => 'item', 'uses' => 'ProductItemController@update'
]);

$app->get('item/destroy', [
    'as' => 'item', 'uses' => 'ProductItemController@destroy'
]);

// list routes
$app->get('list', [
    'as' => 'list', 'uses' => 'ListController@read'
]);
$app->get('list/clear', [
    'as' => 'list', 'uses' => 'ListController@clearList'
]);

$app->get('list/single', [
    'as' => 'list', 'uses' => 'ListController@readSingle'
]);

$app->get('list/create', [
    'as' => 'list', 'uses' => 'ListController@create'
]);

$app->get('list/update', [
    'as' => 'list', 'uses' => 'ListController@update'
]);

$app->get('list/destroy', [
    'as' => 'list', 'uses' => 'ListController@destroy'
]);