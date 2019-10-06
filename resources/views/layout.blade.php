<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{mix('css/tailwind.css')}}">
        <link rel="stylesheet" href="css/index.css">
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="js/index.js"></script>
        <title>@yield('title','EasyBro')</title>

    <body>
            <nav class="flex items-center justify-between flex-wrap bg-blue-600 p-6 sticky top-0 z-50" id="navi">
                    <div class="flex items-center flex-shrink-0 text-white mr-6">
                      <img class="logo-img" src="/img/logo-white.png">
                      <h1 class="font-semibold text-xl tracking-tight cursor-pointer" id="home-move-btn">Easy Bro</h1>
                    </div>
                    <div class="block lg:hidden">
                      <button class="flex items-center px-3 py-2 border rounded text-blue-300 border-blue-300 hover:text-white hover:border-white" id="menu-toggle-btn">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                      </button>
                    </div>
                    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto" id="navi-menu">
                      <div class="text-sm lg:flex-grow">
                        <a  class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 cursor-pointer" id="info-section-move-btn">
                          이용안내
                        </a>
                        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 cursor-pointer" id="link-section-move-btn">
                          즐겨찾기
                        </a>
                        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4 cursor-pointer" id="board-section-move-btn">
                          공유게시판
                        </a>
                        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white cursor-pointer mr-12 float-right" id="join-modal-btn">
                            회원가입
                        </a>
                        <a class="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white cursor-pointer mr-6 float-right" id="login-modal-btn">
                            로그인
                        </a>

                      </div>

                    </div>
                  </nav>
                  @yield('nav')
                  <div class="modal" id="login-modal">
                  <div class="w-full max-w-xs" >
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                              Username
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="login-username" type="text" placeholder="Username">
                          </div>
                          <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                              Password
                            </label>
                            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="login-password" type="password" placeholder="******************">
                            <p class="text-red-500 text-xs italic">Please choose a password.</p>
                          </div>
                          <div class="flex items-center justify-between">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                              Sign In
                            </button>
                            <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                              Forgot Password?
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
                  <div class="w-full max-w-xs" >
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                          <div class="mb-4">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                              Username
                            </label>
                            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="join-username" type="text" placeholder="Username">
                          </div>
                          <div class="mb-6">
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                              Password
                            </label>
                            <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="join-password" type="password" placeholder="******************">
                            <p class="text-red-500 text-xs italic">Please choose a password.</p>
                          </div>
                          <div class="flex items-center justify-between text-center">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline" id="join-btn" type="button">
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
                  @yield('list')
                  @yield('board')
                  
    </body>
</html>
