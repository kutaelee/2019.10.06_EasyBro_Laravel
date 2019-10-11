<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $params= array('id'=>'test','pw'=>'1234','email'=>'a@a.com');
        $response = $this->json('post','/users',$params);
        echo $response.
    }
}
