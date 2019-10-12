<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ListController extends Controller
{
    public function index(Request $request){
        // $list=DB::select('SELECT LINK_LIST.LIST_NAME,LINKS.LINK_NAME,LINKS.LINK_URL,LINK_LIST.LIST_NO,LINKS.LINK_NO
        //  FROM LINK_LIST 
        //  JOIN LINKS ON LINK_LIST.LIST_NO = LINKS.LIST_NO 
        //  WHERE LINK_LIST.LIST_OWNER = ? ',[$request->input('userNo')]);

        $lists=DB::select('SELECT LIST_NO,LIST_NAME FROM LINK_LIST WHERE LIST_OWNER = ? ', [$request->input('userNo')]);
        Log::info($lists);
        return $lists;
    }
}
