<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class BoardController extends Controller
{
    public function index(Request $request){
        $lists=DB::select('SELECT B.DOC_NO,B.LIST_NO,B.SHARE_COUNT,B.DOC_CREATE_AT,L.LIST_CREATED_AT,L.LIST_NAME,U.USER_ID from BOARD AS B JOIN LINK_LIST AS L ON B.LIST_NO = L.LIST_NO JOIN USERS AS U ON L.LIST_OWNER = U.USER_NO ORDER BY DOC_CREATE_AT DESC LIMIT ?,10',[$request->input('pageNum')]);
        return $lists;
    }
    public function store(Request $request){
        $count=DB::select('SELECT COUNT(*) as COUNT FROM BOARD  WHERE LIST_NO = ?', [$request->input('listNo')]);
        if(!$count[0]->COUNT){
            DB::transaction(function () use($request) {
                DB::table('BOARD')->insert([
                    'LIST_NO'=>$request->input('listNo')
                ]);
            });
            return response()->json([ 
                'msg'=> '공유가 완료되었습니다.'
            ]);
        }else{
            return null;
        }
    }

    public function show(Request $request){
        $lists=DB::select('SELECT LINKS.LINK_NAME,LINKS.LINK_URL,B.DOC_NO,B.LIST_NO FROM BOARD AS B JOIN LINK_LIST AS L ON B.LIST_NO = L.LIST_NO JOIN LINKS ON L.LIST_NO = LINKS.LIST_NO WHERE B.DOC_NO = ?',[$request->input('docNo')]);
        return $lists;
    }
}
