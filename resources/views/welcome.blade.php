@extends('layout')

@section('title')
    
@section('list')
<section class="info" id="main-section">
    <div class="welcome">
        <div class="text-box">
        <img class="welcome-img" src="/img/EASY BRO-logo-white.png">
        <h1 class="welcome-message">즐겨찾기를 쉽게 저장하고 언제 어디서나 사용하세요</h1>
        <button id="link-section-move">start!</button>
        </div>
    </div>
</section>
<section class="info" id="info-section">
    <div class="infobox" id="infobox1"></div>
    <div class="infobox" id="infobox2"></div>
</section>
<section class="info" id="sec-3"><h1>section 3<h1></section>
<section class="link-section" id="link-section">
<h1 class="section-title" id="link-title">#저장한 즐겨찾기 리스트</h1>
    <div class="link-list" id="link-use"> 
        <input type="text" class="link-search" placeholder="내 리스트에서 검색하기">
            <ul class="flex border-b">
                    <li class="-mb-px mr-1">
                      <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Active</a>
                    </li>
                    <li class="mr-1">
                      <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
                    </li>
                    <li class="mr-1">
                      <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
                    </li>
                    <li class="mr-1">
                      <a class="bg-white inline-block py-2 px-4 text-gray-400 font-semibold" href="#">Tab</a>
                    </li>
            </ul>
    </div> 
    </section>
@endsection
@section('board')
    <section class="board-section" id="board-section">
    <h1 class="section-title">#즐겨찾기 공유 게시판</h1>
    <div class="board"></div>
    </section>
@endsection


