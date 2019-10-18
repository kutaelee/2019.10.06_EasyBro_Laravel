<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function send(Request $request){
        $email=DB::select('SELECT USER_EMAIL FROM USERS WHERE USER_ID = ?', [$request->input('id')]);
        if(!empty($email)){
            if(Crypt::decryptString($email[0]->USER_EMAIL)===$request->input('email')){
                try{
                    $user=array('email'=>$request->input('email'));
                    Redis::set('auth',false);
                    Redis::set('changeId',htmlspecialchars($request->input('id')));
                    Mail::send('authMail', $user, function($message) use ($user) {
                        $message->to($user['email']);
                        $message->subject('[EASY BRO] 비밀번호변경 인증메일');
                    });
                    return response()->json([ 
                        'msg'=> '인증메일이 전송되었습니다.'
                        ]);
                }catch(Exception $e){
                    Log::info($e);
                }

            }else{
                return null;
            }
        }else{
            return null;
        }
    }

    public function auth(){
        $auth=Redis::get('auth');
        Log::info($auth);
        if(isset($auth)){
           if(!$auth){
                Redis::set('auth',true);
                return '인증이 완료되었습니다.';
           }else{
                return '인증이 이미 완료되었습니다.';
           }
        }else{
            return '인증정보가 없습니다.';
        }
    }

    public function check(){
        $auth=Redis::get('auth');
        Log::info($auth);
        if(isset($auth)){
            if($auth){
                 Redis::del('auth');
                 return response()->json([
                    'msg'=> '인증이 완료되었습니다. 새로운 비밀번호를 입력해주세요.',
                    'auth'=> true
                    ]);
            }else{
                return response()->json([
                    'msg'=> '인증메일을 확인해주세요.',
                    'auth'=> false
                    ]);
            }
         }else{
            return response()->json([ 
                'msg'=> '인증정보가 없습니다.',
                'auth'=> false
                ]);
         }
    }
}
