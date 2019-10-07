$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        type:'get',
        url:'session/user',
        success:function(data){
            console.log(data.user);
            console.log(data);
            if (data) {
                loginNav();
            } else {
                logOutNav();
            }
        },error:function(e){
            console.log(e);
        }
    })


    $('#navi').click(function (e) {
        let id = e.target.id;
        /* 모달 버튼 클릭 이벤트 */
        if (id === 'login-modal-btn') {
            $('#join-modal').hide();
            $('#login-modal').fadeIn();
        }
        if (id === 'join-modal-btn') {
            $('#login-modal').hide();
            $('#join-modal').fadeIn();
        }

        if (id === 'info-section-move-btn') {
            sectionScrollTop('info-section');
        }

        if (id === 'link-section-move-btn') {
            sectionScrollTop('link-section');
        }

        if (id === 'board-section-move-btn') {
            sectionScrollTop('board-section');
        }
        if (id === 'home-move-btn') {
            $('html,body').stop().animate({ scrollTop: 0 }, 600);
        }
        /* 폼 외의 영역 클릭 이벤트 */
        $(document).click(function (e) {
            if (e.target.className === 'modal') {
                $('.modal').fadeOut();
            }
        });
        /* 키 입력 이벤트 */
        $(document).keydown(function (e) {
            if (e.keyCode === 27) {
                $('.modal').fadeOut();
            }
        });
    });

    /* 즐겨찾기 이동 이벤트 */
    $('#link-section-move').click(function () {
        sectionScrollTop('link-section');
    });


    /* 스크롤 이벤트 */
    $(window).scroll(function (e) {
        let top = $(window).scrollTop();
        let boardSectionTop = $('#board-section').offset().top - 100;
        let linkSectionTop = $('#link-section').offset().top - 100;
        let infoSectionTop = $('#info-section').offset().top - 100;
        let width = $(window).width();
        if (top === 0) {
            $('#navi').css({ 'opacity': '1' });
            $('#navi a').css({ 'color': '#bee3f8' });
        } else {
            $('#navi').css({ 'opacity': '.9' });
        }
        if (top > infoSectionTop && top < linkSectionTop) {
            $('#navi a').css({ 'color': '#bee3f8' });
            $('#info-section-move-btn').css({ 'color': 'floralwhite' });
        }
        if (top > linkSectionTop && top < boardSectionTop) {
            $('#navi a').css({ 'color': '#bee3f8' });
            $('#link-section-move-btn').css({ 'color': 'floralwhite' });
        }
        if (top > boardSectionTop) {
            $('#navi a').css({ 'color': '#bee3f8' });
            $('#board-section-move-btn').css({ 'color': 'floralwhite' });
        }

    });

    /* 반응형 메뉴 토글버튼 */
    $('#menu-toggle-btn').click(function () {
        $('#navi-menu').toggle();
    });


    /* 회원가입 */
    $('.modal input').change(function (e) {
        let id = e.target.id;
        const joinExp = /join/;
        const idExp = /username/;
        const emailExp = /email/;
        const pwExp = /pass/;

        if (joinExp.test(id)) {
            /* id 유효성 검사 영역 */
            if (idExp.test(id)) {
                joinIdCheck(id);
            }
            if (emailExp.test(id)) {
                emailCheck(id);
            }
            if (pwExp.test(id)) {
                passwordCheck(id);
            }
        } else {

        }
    });
    $('#logout-btn').click(function () {
        $.ajax({
            type:'post',
            url:'session/destroy',
            success:function(){
                logOutNav();
            },error:function(e){
                console.log(e);
            }
        })
    });

    $('#join-btn').click(function () {
        if (joinPassCheck && joinPass && joinIdCheckVal && joinEmail) {
            const id = $('#join-username').val();
            const pw = $('#join-password').val();
            const email = $('#join-email').val();
            $.ajax({
                type: 'post',
                url: '/users',
                data: { 'id': id, 'pw': pw, 'email': email },
                success: function (data) {
                    if (data.result) {
                        user = data.user;
                        alert('success', '회원가입 성공', '회원가입이 완료되었습니다.');
                        $('.modal input').val('');
                        $('.modal').hide();
                        modalInputInit();
                        loginNav();
                    } else {
                        alert('danger', '회원가입 실패', '오류가 있습니다 관리자에게 문의해주세요.');
                    }
                }, error: function (e) {
                    console.log(e);
                }
            });
        } else {
            alert('danger', '회원가입 실패', '모든 정보를 정확히 입력해주세요.');
        }
    });
    $('#danger-alert-close').click(function () {
        clearTimeout(dangerAlertCloseTimer);
        $('#danger-alert').fadeOut();

    });
});
/* 섹션 스크롤 애니메이션 */
function sectionScrollTop(id) {
    let SectionTop = $('#' + id).offset().top;
    $('html,body').stop().animate({ scrollTop: SectionTop - 80 }, 600);
}
/* 회원가입 로그인 모달 초기화 */
function modalInputInit() {
    $('.modal p').hide();
    $('.modal input').css({ 'border-color': 'red' });
    joinPassCheck, joinPass, joinIdCheckVal, joinEmail = false;
}
/* 이메일 유효성 검사 */
function emailCheck(id) {
    let email = $('#' + id).val();
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (emailRegExp.test(email)) {
        joinEmail = true;
        successInfo(id, '사용하셔도 좋습니다.');
    } else {
        joinEmail = false;
        dangerInfo(id, '정확한 이메일 주소를 입력해주세요.');
    }
}

/* 회원가입 id 유효성검사 */
function joinIdCheck(id) {
    if ($('#' + id).val().length < 4) {
        dangerInfo('join-username', '4자리 이상 입력해주세요.');
    } else {
        let data = $('#join-username').val();
        $.ajax({
            type: 'post',
            url: '/joinIdDupleCheck',
            data: { 'id': data },
            success: function (data) {
                if (data.result) {
                    dangerInfo(id, '이미 존재하는 아이디 입니다.');
                    joinIdCheckVal = false;
                } else {
                    successInfo(id, '사용해도 좋은 아이디 입니다.');
                    joinIdCheckVal = true;
                }
            }, error: function (e) {
                console.log(e);
            }
        });
    }
}
/* 패스워드 유효성 검사 */
function passwordCheck(id) {

    let pass = $('#' + id).val();
    let passCheck;
    if ($('#join-password').val().length < 4) {
        joinPass = false;
        dangerInfo('join-password', '4자리 이상 입력해주세요.');
    } else {
        joinPass = true;
        successInfo('join-password', '사용해도 좋은 패스워드 입니다.');
    }
    if (id === 'join-password') {
        passCheck = $('#join-password-check').val();
    } else {
        passCheck = $('#join-password').val();
    }
    if (pass != passCheck || pass.length < 4) {
        joinPassCheck = false;
        dangerInfo('join-password-check', '패스워드가 서로 일치해야 합니다.');
    } else {
        joinPassCheck = true;
        successInfo('join-password-check', '패스워드가 서로 일치합니다.');
    }
}
/* 모달 css */
function successInfo(id, msg) {
    $('#' + id + '-info').text(msg);
    $('#' + id + '-info').css('color', 'teal');
    $('#' + id + '-info').show();
    $('#' + id).css('border-color', 'teal');
}
function dangerInfo(id, msg) {
    $('#' + id + '-info').text(msg);
    $('#' + id + '-info').css('color', 'red');
    $('#' + id + '-info').show();
    $('#' + id).css('border-color', 'red');
}
function alert(id, title, msg) {
    $('#' + id + '-alert-title').text(title);
    $('#' + id + '-alert-msg').text(msg + ' [이 알림창은 곧 자동으로 닫힙니다.]');
    $('#' + id + '-alert').fadeIn();
    if (id === 'danger') {
        dangerAlertCloseTimer = setTimeout(function () { $('#danger-alert').fadeOut(); }, 5000);
    } else {
        successAlertCloseTimer = setTimeout(function () { $('#success-alert').fadeOut(); }, 3000);
    }

}
function loginNav() {
    $('#login-modal-btn').hide();
    $('#join-modal-btn').hide();
    $('#logout-btn').show();
}
function logOutNav() {
    $('#login-modal-btn').show();
    $('#join-modal-btn').show();
    $('#logout-btn').hide();
}
let joinPassCheck = false;
let joinPass = false;
let joinIdCheckVal = false;
let joinEmail = false;
let dangerAlertCloseTimer;
let successAlertCloseTimer;
let user = null;