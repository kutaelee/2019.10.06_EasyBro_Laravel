<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class ListController extends Controller
{
    public function index(Request $request){
        $lists=DB::select('SELECT LIST_NO,LIST_NAME FROM LINK_LIST WHERE LIST_OWNER = ? ', [$request->input('userNo')]);
        return $lists;
    }
    public function store(Request $request){
        DB::transaction(function () use($request) {
            DB::table('LINK_LIST')->insert([
                'LIST_NAME'=>htmlspecialchars($request->input('name')),
                'LIST_OWNER'=> Redis::get('userNo')
            ]);
        });
        return response()->json([ 
            'userNo'=> Redis::get('userNo')
        ]);
    }
}
