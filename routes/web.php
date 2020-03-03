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
Route::get('gameroom','ChatController@chat');
Route::post('send','ChatController@send');

Auth::routes();

Route::get('/{any}', function(){
    return view('vueapp');
})->where('any', '.*');
