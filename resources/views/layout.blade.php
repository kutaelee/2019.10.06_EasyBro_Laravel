<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="stylesheet" href="{{mix('css/tailwind.css')}}">
  <link href="https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap" rel="stylesheet"> 
  <link rel="stylesheet" href="//cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css">
  <link rel="stylesheet" href="css/index.css?ver=17">
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="js/index.js?ver=22"></script>
  <title>@yield('title','EasyBro')</title>
  <div class="modal" id="login-modal">
    <div class="w-full max-w-xs" id="login-box">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="login-username">
            아이디
          </label>
          <input
            class="shadow appearance-none border w-full rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="login-username" type="text" placeholder="ID" maxlength="20">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="login-password" maxlength="50">
            패스워드
          </label>
          <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="login-password" type="password" placeholder="****">
        </div>

        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" id="login-btn">
            로그인
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            비밀번호를 잊으셨나요?
          </a>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2019 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
  @yield('login')
  <div class="modal" id="join-modal">
    <div class="max-w-xs" id="join-box">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="join-username">
            아이디
          </label>
          <input
            class="shadow appearance-none border mb-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="join-username" type="text" placeholder="ID"  maxlength="20">
            <p class="text-red-500 text-xs italic" id="join-username-info">아이디를 입력해주세요.</p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="join-password">
            패스워드
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="join-password" type="password" placeholder="****" maxlength="50">
          <p class="text-red-500 text-xs italic mb-2" id="join-password-info">패스워드를 입력해주세요.</p>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="join-password-check">
              패스워드 체크
            </label>
          <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="join-password-check" type="password" placeholder="****" maxlength="50">
        <p class="text-red-500 text-xs italic mb-3" id="join-password-check-info">패스워드가 같지 않습니다.</p>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="join-email">
            이메일
          </label>
        <input
        class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        id="join-email" type="email" placeholder="YourEmail@Example.com" maxlength="50">
      <p class="text-red-500 text-xs italic" id="join-email-info">비밀번호 찾기를 위해 정확히 입력해주세요.</p>

      </div>
        <div class="flex items-center justify-between text-center">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
            id="join-btn" type="button">
            회원가입
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;2019 Acme Corp. All rights reserved.
      </p>
    </div>
  </div>
  @yield('join')
  <div class="modal" id="list-add-modal">
    <div class="list-add-box">
      <h1> 리스트 추가 </h1>
      <label for="list-name">추가할 리스트 이름</label>
      <input type="text" class="list-name" id="list-name" maxlength="50">
      <button class="list-btn" id="list-add-btn">추가</button>
    </div>
  </div>
  @yield('list-add')
  <div class="modal" id="link-add-modal">
      <div class="link-add-box">
          <h1> 링크 추가 </h1>
          <label for="link-name">이름</label>
          <input type="text" class="link-name" id="link-name" maxlength="50" placeholder="구글">
          <label for="link-url">URL</label>
          <input type="text" class="link-url" id="link-url" maxlength="200" placeholder="https://google.com">
          <button class="link-btn" id="link-add-btn">추가</button>
        </div>
  </div>
  @yield('link-add')
  <div class="modal" id="list-destroy-modal">
      <div class="list-destroy-box">
          <h1 class="list-destroy-name"></h1>
          <h2>리스트를 삭제하시면 포함된 링크도 모두 삭제되며 복구 할 수없습니다.</h2>
          <h2>정말로 삭제하시겠습니까?</h2>
          <button class="list-btn" id="list-destroy-btn">확인</button>
        </div>
  </div>
  @yield('list-destroy')
  <div class="modal" id="link-destroy-modal">
    <div class="link-destroy-box">
        <h1 class="link-destroy-name"></h1>
        <h2>링크를 삭제하시면 복구 할 수없습니다.</h2>
        <h2>정말로 삭제하시겠습니까?</h2>
        <button class="link-btn" id="link-destroy-btn">확인</button>
      </div>
</div>
@yield('link-destroy')
  <div class="modal" id="list-edit-modal">
    <div class="list-edit-box">
        <h1>리스트 수정</h1>
        <label for="list-edit-listName">리스트 : </label>
        <input type="text" maxlength="50" id="list-edit-listName">
        <table class="list-edit-table">         
        </table>
        <button class="list-btn" id="list-edit-btn">확인</button>
    </div>
  </div>
  @yield('list-edit')
  <div class="modal" id="list-share-modal">
      <div class="list-share-box">
          <h1 class="list-share-name">리스트 공유</h1>
          <button class="list-btn" id="list-share-btn">확인</button>
        </div>
  </div>
  @yield('link-share')
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" id="danger-alert" role="alert">
      <strong class="font-bold" id="danger-alert-title"></strong>
      <span class="block sm:inline"  id="danger-alert-msg"></span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="danger-alert-close"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>
    @yield('danger-alert')
    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" id="success-alert" role="alert">
        <p class="font-bold" id="success-alert-title"></p>
        <p class="text-sm"  id="success-alert-msg"></p>
      </div>
      @yield('success-alert')
<body>
  <nav class="flex items-center justify-between flex-wrap bg-blue-600 p-6 sticky top-0 z-50" id="navi">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <img class="logo-img" src="/img/logo-white.png">
      <h1 class="font-semibold text-xl tracking-tight cursor-pointer" id="home-move-btn">Easy Bro</h1>
    </div>
    <div class="block lg:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-blue-300 border-blue-300 hover:text-white hover:border-white"
        id="menu-toggle-btn">
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" id="navi-menu">
      <div class="text-sm lg:flex-grow">
        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200  mr-4 cursor-pointer"
          id="info-section-move-btn">
          이용안내
        </a>
        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200  mr-4 cursor-pointer"
          id="link-section-move-btn">
          즐겨찾기
        </a>
        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200  mr-4 cursor-pointer"
          id="board-section-move-btn">
          공유게시판
        </a>
        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200  cursor-pointer mr-12 float-right"
          id="join-modal-btn">
          회원가입
        </a>
        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 cursor-pointer mr-6 float-right"
          id="login-modal-btn">
          로그인
        </a>
        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 cursor-pointer mr-6 float-right"
          id="logout-btn">
          로그아웃
        </a>
      </div>

    </div>
  </nav>
  @yield('nav')

  <section class="main-section" id="main-section">
    <div class="welcome">
      <div class="text-box">
        <img class="welcome-img" src="/img/EASY BRO-logo-white.png">
        <section class="welcome-section">
          <h2 class="welcome-message">
            <span>즐</span>
            <span>겨</span>
            <span>찾</span>
            <span>기</span>
            <span>를</span>
            <span>쉽</span>
            <span>게</span>
            <span>저</span>
            <span>장</span>
            <span>하</span>
            <span>고</span>
            <span>언</span>
            <span>제</span>
            <span>어</span>
            <span>디</span>
            <span>서</span>
            <span>나</span>
            <span>사</span>
            <span>용</span>
            <span>하</span>
            <span>세</span>
            <span>요</span>
          </h2>
        </section>
        <button id="link-section-move">start!</button>
      </div>
    </div>
  </section>
@yield('main')

  <section class="info" id="info-section">
      <h1 class="section-title" id="link-title"># 이용안내</h1>
    <div class="infobackground">
      <div class="container">
        <div class="cards">
          <div class="imgBx">
            <div>
              <img src="../img/logo.png">
              <h2>즐겨찾기 추가</h2>
            </div>
          </div>
          <div class="overlay"></div>
          <div class="content">
            <h2>즐겨찾기 추가</h2>
            <p>
              즐겨찾기 탭에서 자신만의 즐겨찾기 리스트를 만들 수 있습니다.<br><br>
              즐겨찾기 탭에서는 리스트에 포함된 사이트를 이름으로 검색할 수 있고 <br><br>
              리스트에 포함되어 있지 않더라도 웹에서 검색하기 버튼으로 찾고 쉽게 추가할 수 있습니다.<br><br>
            </p>
          </div>
        </div>


        <div class="cards">
          <div class="imgBx">
            <div>
              <img src="../img/logo.png">
              <h2>회원가입 및 이용</h2>
            </div>
          </div>
          <div class="overlay"></div>
          <div class="content">
            <h2>회원가입 및 이용안내</h2>
            <p>
              아이디와 비밀번호를 찾기위한 최소한의 정보만 요구합니다.<br><br>
              로그인 하시면 어느 장소에서나 즐겨찾기 정보가 제공됩니다.<br><br>
              EASY BRO는 무료로 이용 가능합니다. <br><br>
            </p>
          </div>
        </div>

        <div class="cards">
          <div class="imgBx">
            <div>
              <img src="../img/logo.png">
              <h2>공유하기</h2>
            </div>
          </div>
          <div class="overlay"></div>
          <div class="content">
            <h2>공유 게시판 이용안내</h2>
            <p>
              로그인하지 않아도 공유 게시판으로 언제 어디서나 자신만의 리스트를 공유할 수 있고<br><br>
              자신만의 리스트에 담아서 사용할 수 있습니다.<br><br>
              현재 리스트의 즐겨찾기 목록을 공유게시판에 올리고 <br><br>
              다른 PC에 접속해서 담기 버튼 한번이면 사용 가능합니다.
            </p>
          </div>
        </div>
      </div>
    </div>

  </section>
  @yield('info')

  <section class="link-section" id="link-section">
      <h1 class="section-title" id="link-title">#저장한 즐겨찾기 리스트</h1>
      <div class="link-list" id="link-use">
        <h2 class="list-title">즐겨찾기 리스트</h2>
        <input type="text" class="link-search" placeholder="내 리스트에서 검색하기">
        <div class="list-box">
          <ul class="list-box-ul">
          </ul>
        </div>
      </div>
  </section>
  @yield('list')

  <section class="board-section" id="board-section">
    <h1 class="section-title">#즐겨찾기 공유 게시판</h1>
    <div class="board">
      <div class="share">
         <table class="list-share-table"></table>
      </div>
      <button class="list-btn" id="list-share-modal-btn">리스트 공유</button>
    </div>
    
  </section>
  @yield('board')



</body>

</html>