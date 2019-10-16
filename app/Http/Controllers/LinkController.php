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
        $list=$request->input('list');
        if(!empty($list)){

            $num=$request->input('listNo');
            $names=$request->input('linkNames');
            $urls=$request->input('linkUrls');
            if(!empty($names)){
                DB::transaction(function () use($num,$names,$urls) {
                    for($i=0;$i<count($names);$i++){
                        DB::table('LINKS')->insert([
                           'LINK_NAME'=>htmlspecialchars($names[$i]),
                           'LIST_NO'=>$num,
                           'LINK_URL'=>htmlspecialchars($urls[$i])
                        ]);
                    }
                  });
            }
            return response()->json([ 
                'userNo'=> Redis::get('userNo')
            ]);
        }else{
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

    public function destroy(Request $request){
        $owner=DB::select('SELECT LIST_OWNER FROM LINK_LIST WHERE LIST_NO=(SELECT LIST_NO FROM LINKS WHERE LINK_NO = ?) ',[$request->input('linkNo')]);
        if(!empty($owner)){
            if($owner[0]->LIST_OWNER===Redis::get('userNo')){
                DB::transaction(function () use($request) {
                    DB::delete('DELETE FROM LINKS WHERE LINK_NO= ? ', [$request->input('linkNo')]);
                });
                return response()->json([ 
                    'userNo'=> Redis::get('userNo')
                ]);
            }else{
                return null;
            }  
        }else{
            return null;
        }

    }
}
