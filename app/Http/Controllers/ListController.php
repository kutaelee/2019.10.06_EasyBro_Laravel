<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class ListController extends Controller
{
    public function index(Request $request){
        $userNo=$request->session()->get('userNo');
        if(!empty($request->input('keyword'))){
            $keyword='%'.htmlspecialchars($request->input('keyword')).'%';
            $lists=DB::select('SELECT DISTINCT LL.LIST_NO,LL.LIST_NAME FROM LINK_LIST AS LL JOIN LINKS AS LS ON LL.LIST_NO = LS.LIST_NO WHERE (LIST_OWNER = ?) AND (LINK_NAME LIKE ? OR LIST_NAME LIKE ?)', [$userNo,$keyword,$keyword]);
        }else if(!empty($request->input('share'))){
            $lists=DB::select('SELECT DISTINCT LL.LIST_NO,LIST_NAME FROM LINK_LIST AS LL JOIN LINKS AS L ON LL.LIST_NO = L.LIST_NO WHERE LIST_OWNER = ?', [$userNo]);
        }else{
            $lists=DB::select('SELECT LIST_NO,LIST_NAME FROM LINK_LIST WHERE LIST_OWNER = ?', [$userNo]);
        }
        return $lists;
    }
    public function show(Request $request){
        $userNo=$request->session()->get('userNo');
        $list=DB::select('SELECT LIST_NO FROM LINK_LIST WHERE LIST_OWNER = ? AND LIST_NAME = ?', [$userNo,htmlspecialchars($request->input('name'))]);
        return $list;
    }
    public function store(Request $request){
        $userNo=$request->session()->get('userNo');
        $count=DB::select('SELECT COUNT(*) AS COUNT FROM LINK_LIST WHERE LIST_NAME = ? AND LIST_OWNER = ?',[htmlspecialchars($request->input('name')),$userNo]);
        if(!$count[0]->COUNT){
            DB::transaction(function () use($request,$userNo) {
                $index=DB::table('LINK_LIST')->insert([
                    'LIST_NAME'=>htmlspecialchars($request->input('name')),
                    'LIST_OWNER'=> $userNo
                ]);
            });             
            return response()->json([ 
            'userNo'=>  $userNo
            ]);
        }else{
            return null;
        }
    }
    public function destroy(Request $request){
        $userNo=$request->session()->get('userNo');
        DB::transaction(function () use($request,$userNo) {
            DB::delete('DELETE FROM LINK_LIST WHERE LIST_NO= ? AND LIST_OWNER= ?' , [$request->input('listNo') , $userNo]);
        });
        return response()->json([ 
            'userNo'=> $userNo
        ]);
    }

    public function update(Request $request){
        $userNo=$request->session()->get('userNo');
        $owner=DB::select('SELECT LIST_OWNER FROM LINK_LIST WHERE LIST_NO = ?',[$request->input('listNo')]);
        if(!empty($owner)){
            if($owner[0]->LIST_OWNER==$userNo){
                DB::transaction(function () use($request,$userNo) {
                    DB::update('UPDATE LINK_LIST SET LIST_NAME = ? WHERE LIST_NO = ? AND LIST_OWNER = ?',[htmlspecialchars($request->input('listName')),$request->input('listNo'),$userNo]);
                    if(!empty($request->input('linkNames'))){
                    for($i=0;$i<count($request->input('linkNames'));$i++){
                    DB::update('UPDATE LINKS SET LINK_NAME = ? , LINK_URL = ? WHERE LIST_NO = ? AND LINK_NO = ?',[htmlspecialchars($request->input('linkNames')[$i]),htmlspecialchars($request->input('linkUrls')[$i]),$request->input('listNo'),$request->input('linkNums')[$i]]);
                    }    
                }
                });
                return response()->json([ 
                    'userNo'=> $userNo
                ]);
            }else{
                return null;
            }
        }else{
            return null;
        }

    }
}
