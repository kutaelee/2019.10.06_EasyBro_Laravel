<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class LinkController extends Controller
{
    public function index(Request $request){
        if(!empty($request->input('list'))){
            $links=array();
       
            for($i=0;$i<count($request->input('list'));$i++){
                $link=DB::select('SELECT LINK_NO,LINK_NAME,LINK_URL,LIST_NO FROM LINKS  WHERE LIST_NO = ?', [$request->input('list')[$i]['LIST_NO']]);
                if(empty(!$link)){
                    $links[]=$link;
                }      
            }
            return $links;
        }else{
            return null;
        }

    }

    public function store(Request $request){
        $num=$request->input('listNo');
        $name=htmlspecialchars($request->input('linkName'));
        $url=htmlspecialchars($request->input('linkUrl'));
        $duple=DB::select('SELECT COUNT(*) AS COUNT FROM LINKS WHERE LIST_NO = ? AND LINK_NAME = ? AND LINK_URL = ?' , [ $num , $name , $url]);
        if(!$duple[0]->COUNT){
            DB::transaction(function () use($num,$name,$url) {
                DB::table('LINKS')->insert([
                    'LINK_NAME'=> $name,
                    'LIST_NO'=> $num,
                    'LINK_URL'=> $url
                ]);
            });
            return response()->json([ 
                'userNo'=> Redis::get('userNo')
            ]);
        }else{
            return null;
        }
    }
}
