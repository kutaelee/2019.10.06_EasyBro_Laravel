<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable=['USER_ID','USER_PW','USER_EMAIL'];
    protected $guarded=['USER_NO','updated_at','created_at'];
}
