

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    /* 세션체크 후 링크페이지 세팅 */
    sessionCheck().then(linkListBind).then(linkBind);

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
            type: 'post',
            url: 'session/destroy',
            success: function () {
                logOutNav();
                alert('success', '로그아웃', '로그아웃이 완료되었습니다.');
                userNo = null;
                username = null;
                $('.list-box-ul').text('');
            }, error: function (e) {
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
                        userNo = data.userNo;
                        username = data.username;
                        alert('success', '회원가입', '회원가입이 완료되었습니다.');
                        $('.modal input').val('');
                        $('.modal').hide();
                        modalInputInit();
                        loginNav();
                        linkListBind(data).then(linkBind);
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

    $('#login-btn').click(function () {
        const id = $('#login-username').val();
        const pw = $('#login-password').val();

        $.ajax({
            type: 'post',
            url: '/users/login',
            data: { 'id': id, 'pw': pw },
            success: function (data) {
                if (data.userNo) {
                    userNo = data.userNo;
                    username = data.username;
                    alert('success', '로그인', '반갑습니다. ' + username + '님');
                    loginNav();
                    $('.modal').hide();
                    linkListBind(data).then(linkBind);
                    modalInputInit();
                } else {
                    alert('danger', '로그인', data.msg);
                }

            }, error: function (e) {
                alert('danger', '로그인', '로그인에 오류가 있습니다. 관리자에게 문의해주세요! ');
                console.log(e);
            }
        })
    });

    /* 링크 리스트 토글 */
    $(document).on('click', '.list-item', function (e) {
        if (e.target.className === 'list-item') {
            $(this).children('ul').slideToggle('fast');
        }
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
    $('#join-modal input').css({ 'border-color': 'red' });
    $('.modal input').val('');
    $('#join-username-info').text('아이디를 입력해주세요.');
    $('#join-password-info').text('패스워드를 입력해주세요.');
    $('#join-password-check-info').text('패스워드가 같지 않습니다.');
    $('#join-email-info').text('비밀번호 찾기를 위해 정확히 입력해주세요.');
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
    $('#' + id + '-alert-msg').text(msg + ' [알림창은 자동으로 닫힙니다.]');
    $('#' + id + '-alert').fadeIn();
    if (id === 'danger') {
        dangerAlertCloseTimer = setTimeout(function () { clearTimeout(dangerAlertCloseTimer); $('#danger-alert').fadeOut(); }, 5000);
    }
    if (id === 'success') {
        successAlertCloseTimer = setTimeout(function () { clearTimeout(successAlertCloseTimer); $('#success-alert').fadeOut(); }, 3000);
    }

}

/* 로그인 여부에 따른 css 변화 메소드 */
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

/* 세션 체크 */
function sessionCheck(callback) {
    return new Promise(function (resolve) {
        $.ajax({
            type: 'get',
            url: 'session/user',
            success: function (data) {
                if (data.userNo) {
                    loginNav();
                    console.log(data.userNo);
                    console.log(data.username);
                } else {
                    logOutNav();
                }
                resolve(data);
            }, error: function (e) {
                console.log(e);
            }
        });
    });
}

/* 링크 리스트 목록 바인딩 */
function linkListBind(userData) {
    return new Promise(function (resolve) {
        if (userData.userNo) {
            $.ajax({
                type: 'get',
                url: '/lists',
                data: { 'userNo': userData.userNo },
                success: function (listData) {
                    $('.list-box-ul').text('');
                    let i = 1;
                    for (item of listData) {
                        $('.list-box-ul').append('<li class="list-item" id="list-' + item.LIST_NO + '"><span>' + i + '</span>' + item.LIST_NAME + '</li>');
                        i++;

                    }
                    resolve(listData);

                }, error: function (e) {
                    console.log(e);
                }
            });
        }
    });
}

/* 리스트에 맞는 링크 바인딩 */
function linkBind(listData) {
    if (listData) {
        $.ajax({
            type: 'get',
            url: '/links',
            data: { 'list': listData },
            success: function (linkData) {
                for (link of linkData) {
                    for (item of link) {
                        $('#list-' + item.LIST_NO).append('<ul class="link-item-ul"><li class="link-item" id=link-"' + item.LINK_NO + '"><a href="' + item.LINK_URL + '" target="_blank">'
                            + item.LINK_NAME + '(' + item.LINK_URL + ')</a></li></ul>');
                    }
                }
            }, error: function (e) {
                console.log(e);
            }
        });
    }
}
/* 회원가입 유효성 체크 변수 */
let joinPassCheck = false;
let joinPass = false;
let joinIdCheckVal = false;
let joinEmail = false;
/* 알렛 타이머 변수 */
let dangerAlertCloseTimer;
let successAlertCloseTimer;

/* 회원 아이디 및 번호 */
let userNo = null;
let username = null;