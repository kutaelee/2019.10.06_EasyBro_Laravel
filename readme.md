## 2019.10.06 ~ 2019.10.21 즐겨찾기 사이트 (Laravel)
배포가 완료되었습니다. [EASYBRO 바로가기](http://easybro.kr/)


## 개발환경
* Laravel framework
* Php
* js
* html(blade template)
* css , tailwind(css template)
* Redis
* AWS RDS (mysql)
* smtp(mailgun)


## 배포환경
* Google cloud Compute Engine
* ubuntu 18.04 LTS
* nginx
* php7 fpm


## 주요기능
* 리스트,링크 crud
* 리스트 공유 검색 
* 이메일 양방향 암호화 , 비밀번호 단방향 암호화
* 회원가입,로그인,내정보수정
* 아이디 비밀번호찾기(smtp)
* 반응형 css 처리
* ie11 지원 (laravel mix,polyfill 사용)

## 개발 목표
쉽게 저장하고 어느 장소에서나 즐겨찾기를 사용가능한 사이트


## PHP를 공부하면서..
평소 java를 즐겨 사용하다가 php강의를 2일정도 빠르게 보고 개발을 시작하게 되었습니다.

 익숙하지 않은 탓도 있겠지만 변수의 자료형을 명시적으로 적지 않는 부분이나 

배열을 다루는 부분이 마음에 들지 않았고 php는 솔직히 제 스타일은 아닌 것 같다고 느꼈습니다.


## 라라벨을 공부하면서..
php로 처음 개발하던 중 mvc 패턴의 필요성을 느꼈고 api 문서화가 잘 되어있는 라라벨을 선택하게 되었습니다.

smtp , db 연동 , 모듈 등 라라벨 프레임워크에서 쉽게 사용할 수 있도록 제공되는 부분이 마음에 들었고

php artisan 명령어로 많은것을 할 수 있어서 생산성이 매우 좋다고 느꼈습니다.

이번 프로젝트에서 php는 마음에 안들었어도 라라벨만큼은 굉장히 좋은 인상을 가져다 주었습니다.

## 아쉬운 점
제가 빠르게 공부하다보니 놓친 부분일수도 있는데 AOP 관련한 부분이 보이지 않았습니다.

spring에서 많이 사용하지는 않았지만 이번 프로젝트 진행하면서 필요성을 느꼈는데 관련 부분을 찾지못해서 사용하지 못했습니다.

구글 검색기능과 비회원도 사용할 수 있도록 계획했으나 영장이 나와버리는 관계로 취직이 조금 더 급해져서 빠르게 마무리하였습니다.


## 군대갑니다!(한달안에 취직되면 산업기능요원으로..)
산업기능요원으로 취직을 꿈꾸며 열심히 공부했지만 회사를 구하지 못했고 영장이 나왔습니다..

물론 이번 프로젝트를 빠르게 마무리한 이유가 영장이 나왔어도 혹시 즉시편입이 가능한 회사가 있다면 이력서를 넣어보기 위해서 입니다.

자신감이 부족해서 취직하기에 모자르다 모자르다 하면서 공부를 해왔는데 영장이 나오고나니 조금 더 빨리 구직할껄.. 이라는 생각이 드네요.

## 배포하면서 만난 오류 및 해결방법
Please remove or rename the Redis facade alias in your "app" configuration file in order to avoid collision with the PHP Redis extension.
* Redis 별칭이 겹치는 문제로 변경


nginx 403 forbidden
* 프로젝트 폴더의 그룹을 nginx의 사용자로 변경하고 폴더는 755 파일은 644로 권한을 수정
* default 파일에서 index 설정에 문제가 있어서 수정


mailgun 샌드박스 메일은 허용된 사용자에게만 메일을 보낼수있다는 에러
* 도메인 주소를 수정했음에도 env파일이 적용되지않아서 artisan config:clear 로 해결

the payload is invalid 인증메일 키 복호화 중 쿼리 스트링으로 암호화 되지 않은 값이 들어오면서 생긴 문제
* exception 핸들링으로 해결
