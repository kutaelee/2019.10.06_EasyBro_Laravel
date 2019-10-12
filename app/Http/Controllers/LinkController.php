<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LinkController extends Controller
{
    public function index(Request $request){
        $links=DB::select('SELECT LINK_NO,LINK_NAME,LINK_URL,LIST_NO FROM LINKS  WHERE LIST_NO = ? ', [$request->input('listNo')]);
        Log::info($links);
        return $links;
    }
}
