<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Crypt;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__.'/../vendor/autoload.php';
class AuthController extends Controller
{
    public function send(Request $request){
        $email=DB::select('SELECT USER_EMAIL FROM USERS WHERE USER_ID = ?', [$request->input('id')]);
        if(Crypt::decryptString($email[0]->USER_EMAIL)===$request->input('email')){
            $subject='(EASYBRO) 아이디/비밀번호 찾기 인증메일';
            $toMail=$request->input('email');
            $body='본인이 보낸 메일이 아니라면 삭제 부탁드립니다. </br><a href="http://127.0.0.1:8000/auth">인증</a>';
            $mail = new \PHPMailer();
            $mail->isSMTP();
            $mail->SMTPAuth = true;
            $mail->SMTPSecure = 'tls';
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 587;
            $mail->Username = env(GOOGLE_ID);
            $mail->Password = env(GOOGLE_PW);
            $mail->setFrom(GOOGLE_ID, '이지브로');
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->addAddress($toMail);
            $mail->send();
            return response()->json([ 
                'msg'=> '인증메일이 전송되었습니다.'
                ]);
        }else{
            return null;
        }
    }
}
