<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use App\User;

class UserController extends Controller
{
    public function joinIdDupleCheck(Request $request){
        $result=DB::table('USERS')->where('USER_ID',$request->input('id'))->exists();
        return response()->json([
            'result'=>$result
        ]);
    }
    public function store(Request $request){
        if(DB::table('USERS')->where('USER_ID',$request->input('id'))->exists()){
            return response()->json([
                'result'=>false
            ]);     
        }else{
            DB::transaction(function () use($request) {
            DB::table('USERS')->insert([
                'USER_ID'=>$request->input('id'),
                'USER_PW'=>$request->input('pw'),
                'USER_EMAIL'=>$request->input('email')
            ]);

            });
            $userNo=DB::select('SELECT USER_NO FROM USERS WHERE USER_ID = ? ',[$request->input('id')]);
            Redis::set('user',$userNo);
            if($userNo!=null){
                return response()->json([
                    'result'=>true,
                    'user'=>$userNo
                ]);
            }else{
                return response()->json([
                    'result'=>false
                ]);
            }
       
        }
        
    }
    public function sessionUser(){
        return Redis::get('user');
    }
    public function sessionDestroy(){
        Redis::del('user');
    }
}
