<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

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
                'USER_ID'=>htmlspecialchars($request->input('id')),
                'USER_PW'=> Hash::make($request->input('pw')),
                'USER_EMAIL'=>Crypt::encryptString($request->input('email'))
            ]);
           
            });
            $id = $request->input('id');
        
            $userNo=DB::select('SELECT USER_NO FROM USERS WHERE USER_ID = ? ',[$id]);
            Redis::set('userNo',$userNo[0]->USER_NO);
            Redis::set('username',$id);
            if($userNo!=null){
                return response()->json([
                    'result'=>true,
                    'userNo'=>$userNo[0]->USER_NO,
                    'username'=>$id
                ]);
            }else{
                return response()->json([
                    'result'=>false
                ]);
            }
       
        }
        
    }
    public function sessionUser(){
        Redis::del('changeId');
        Redis::del('auth');
        return response()->json([
            'userNo'=>   Redis::get('userNo'),
            'username'=> Redis::get('username')
        ]);
    }
    public function sessionDestroy(){
        Redis::del('userNo');
        Redis::del('username');
    }

    public function login(Request $request){
 
        $pwCheck=DB::select('SELECT USER_PW FROM USERS WHERE USER_ID = ? ',[$request->input('id')]);
        
        if($pwCheck!=null){   
            if(Hash::check($request->input('pw'), $pwCheck[0]->USER_PW)){
                $userNo=DB::select('SELECT USER_NO FROM USERS WHERE USER_ID = ? ',[$request->input('id')]);
                Redis::set('userNo',$userNo[0]->USER_NO);
                Redis::set('username',$request->input('id'));
                return $this->sessionUser();
            }else{
                return response()->json([
                    'msg'=>'비밀번호가 틀렸습니다.'
                ]);
            }
        }else{
            return response()->json([
                'msg'=>'존재하지 않는 아이디 입니다.'
            ]);
        }
        
    }

    public function update(Request $request){
        $pw=$request->input('pw');
        $email=$request->input('email');
        $id=Redis::get('changeId');
        $action='auth';
        if(empty($id)){
            $action='mypage';
            $id=Redis::get('username');
        }
        if(empty($id)){
            return response()->json([
                'msg'=>'인증정보가 없습니다 다시 시도해주세요.'
            ]);
        }
        if(!empty($pw) && strlen($pw)>3){
                if(!empty($email)){
                    DB::update('UPDATE USERS SET USER_PW = ? , USER_EMAIL = ? WHERE USER_ID = ?',[Hash::make($pw), Crypt::encryptString($email) , $id]);
                }else{
                    DB::update('UPDATE USERS SET USER_PW = ? WHERE USER_ID = ?',[Hash::make($pw) , $id]);
                    Redis::del('changeId');
                }
                return response()->json([
                    'msg'=>'변경이 완료되었습니다.',
                    'result'=>$id,
                    'action'=>$action
                ]);       
        }else{
            return response()->json([
                'msg'=>'비밀번호가 너무 짧습니다.'
            ]);
        }
    }
}
