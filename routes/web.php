<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* home */
Route::get('/', 'HomeController@index');
/* user */
Route::get('/session/user','UserController@sessionUser');

Route::post('/joinIdDupleCheck','UserController@joinIdDupleCheck');
Route::post('/users','UserController@store');
Route::delete('/session/destroy','UserController@sessionDestroy');
Route::post('/users/login','UserController@login');

/* list */
Route::get('/lists','ListController@index');

Route::post('/lists','ListController@store');

Route::delete('/lists/{list}','ListController@destroy');

Route::patch('/list/{list}','ListController@update');
/* link */
Route::get('/links','LinkController@index');
Route::post('/links','LinkController@store');


