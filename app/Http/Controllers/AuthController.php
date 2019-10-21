<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Encryption\DecryptException;

class AuthController extends Controller
{
    public function send(Request $request){
        $email=DB::select('SELECT USER_EMAIL FROM USERS WHERE USER_ID = ?', [$request->input('id')]);
        if(!empty($email)){
            if(!strcmp(Crypt::decryptString($email[0]->USER_EMAIL),$request->input('email'))){
                try{
                    $user=array('email'=>$request->input('email'));
                    Redis::set('auth',false);
                    Redis::set('changeId',htmlspecialchars($request->input('id')));
                    srand(time());
                    $key=rand();
                    Redis::set('key',$key);
                    $key=Crypt::encryptString($key);        
                    Mail::send('authMail', ['key'=>$key], function($message) use ($user) {
                        $message->to($user['email']);
                        $message->subject('[EASY BRO] 비밀번호변경 인증메일');
                        $message->sender('kutaelee@mx.easybro.kr', 'EASY BRO');
                        $message->from('kutaelee@mx.easybro.kr');
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

    public function auth(Request $request){
        $auth=Redis::get('auth');
        $param=$request->query('key');

        if(isset($auth) && isset($param)){     
            try{
                $param=Crypt::decryptString($param);
               
            }catch(DecryptException  $e){
                return '키값이 잘못되었습니다. 다시 인증해주세요.';
            } 
            $key=Redis::get('key');
        if(!strcmp($param,$key)){
            if(!$auth ){
                Redis::set('auth',true);
                Redis::del('key');
                return '인증이 완료되었습니다.';
           }else {
                return '인증이 이미 완료되었습니다.';
           }
        }else{
            return '키값이 틀립니다 다시 인증을 시도해주세요.';
        }
    
        }else{
            return '인증정보가 없습니다.';
        }
    }

    public function check(){
        $auth=Redis::get('auth');
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
