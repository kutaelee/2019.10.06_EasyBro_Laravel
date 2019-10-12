<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ListController extends Controller
{
    public function index(Request $request){
        $lists=DB::select('SELECT LIST_NO,LIST_NAME FROM LINK_LIST WHERE LIST_OWNER = ? ', [$request->input('userNo')]);
        return $lists;
    }
}
