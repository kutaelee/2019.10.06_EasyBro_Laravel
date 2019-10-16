

$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    /* 세션체크 후 링크페이지 세팅 */
    sessionCheck().then(linkListBind).then(linkBind);
    boardInit();
    $('#navi').click(function (e) {
        let id = e.target.id;
        /* 모달 버튼 클릭 이벤트 */
        if (id === 'login-modal-btn') {
            $('#join-modal').hide();
            $('#login-modal').fadeIn();
            $('body').css('overflow-y', 'hidden');
            $('#login-username').focus();
        }
        if (id === 'join-modal-btn') {
            $('#login-modal').hide();
            $('#join-modal').fadeIn();
            $('body').css('overflow-y', 'hidden');
            $('#join-username').focus();
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

    });
    /* 폼 외의 영역 클릭 이벤트 */
    $(document).on('click', '.modal', function (e) {
        if (e.target.className === 'modal') {
            $('.modal').fadeOut();
            $('body').css('overflow-y', 'scroll');
        }
    });
    /* 키 입력 이벤트 */
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            $('.modal').fadeOut();
            $('body').css('overflow-y', 'scroll');
        }
    });
    $('#login-modal').keydown(function (e) {
        enterClickTrigger(e, '#login-btn');
    });
    $('#join-modal').keydown(function (e) {
        enterClickTrigger(e, '#join-btn');
    });

    $('.list-add-box').keydown(function (e) {
        enterClickTrigger(e, '#list-add-btn');
    });

    $('.link-add-box').keydown(function (e) {
        enterClickTrigger(e, '#link-add-btn');
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
            type: 'DELETE',
            url: '/session/destroy',
            success: function () {
                logOutNav();
                alert('success', '로그아웃', '로그아웃이 완료되었습니다.');
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
                    alert('success', '로그인', '반갑습니다. ' + data.username + '님');
                    loginNav();
                    $('.modal').hide();
                    $('body').css('overflow-y', 'scroll');
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
        if (e.target.className === 'list-item' || e.target.className === 'list-item-name') {
            $(this).children('ul').slideToggle('fast');
        }
    });

    /* 리스트 추가 */
    $(document).on('click', '.list-add', function () {
        $('#list-add-modal').fadeIn();
        $('body').css('overflow-y', 'hidden');
        $('.list-name').focus();
    });
    $(document).on('click', '#list-add-btn', function () {
        let name = $('.list-name').val();
        if (sessionCheck()) {
            if (name.length > 1) {
                $.ajax({
                    type: 'POST',
                    url: '/lists',
                    data: { 'name': name },
                    success: function (data) {
                        if (data) {
                            alert('success', '리스트 추가', '리스트 추가가 완료되었습니다.');
                            $('#list-add-modal').fadeOut('fast');
                            $('body').css('overflow-y', 'scroll');
                            $('.list-name').val('');
                            linkListBind(data).then(linkBind);
                        } else {
                            alert('danger', '리스트 추가', '중복된 이름을 사용할 수 없습니다.');
                        }

                    }, error: function (e) {
                        alert('danger', '리스트 추가', '리스트를 추가하는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
                    }
                });
            } else {
                alert('danger', '리스트 추가', '리스트 이름을 입력해주세요.');
            }
        } else {
            alert('danger', '리스트 추가', '리스트 추가는 로그인 후 이용해주세요.');
        }
    });

    $(document).on('click', '.list-destroy-icon', function () {
        const listName = $(this).parent().attr('content');
        const listNo = $(this).parent().attr('number');
        $('.list-destroy-name').text('삭제 할 리스트 명 :' + listName);
        $('.list-destroy-name').attr('num', listNo);
        $('#list-destroy-modal').fadeIn('fast');
        $('body').css('overflow-y', 'hidden');
    });

    $(document).on('click', '#list-destroy-btn', function () {
        const listNo = $('.list-destroy-name').attr('num');
        $.ajax({
            type: 'DELETE',
            url: 'lists/' + listNo,
            data: { 'listNo': listNo },
            success: function (data) {
                alert('success', '리스트 삭제', '리스트 삭제가 완료되었습니다.');
                $('#list-destroy-modal').fadeOut('fast');
                $('body').css('overflow-y', 'scroll');
                linkListBind(data).then(linkBind);
            }, error: function (e) {
                alert('danger', '리스트 삭제', '리스트를 삭제하는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
            }
        });
    });


    $(document).on('click', '.link-add-icon', function () {
        $('#link-add-modal').fadeIn('fast');
        $('body').css('overflow-y', 'hidden');
        $('#link-name').focus();
        const listNo = $(this).parent().attr('number');
        $('#link-name').attr('num', listNo);
    });

    $(document).on('click', '#link-add-btn', function () {
        const listNo = $('#link-name').attr('num');
        const linkName = $('#link-name').val();
        const linkUrl = $('#link-url').val();
        const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        if (linkName.length > 1) {
            if (regex.test(linkUrl)) {
                $.ajax({
                    type: 'POST',
                    url: '/links',
                    data: { 'linkName': linkName, 'linkUrl': linkUrl, 'listNo': listNo },
                    success: function (data) {
                        if (data) {
                            alert('success', '링크 추가', '링크 추가가 완료되었습니다.');
                            $('#link-add-modal').fadeOut('fast');
                            $('body').css('overflow-y', 'scroll');
                            $('#link-add-modal input').val('');
                            linkListBind(data).then(linkBind);
                        } else {
                            alert('danger', '링크 추가', '이미 등록된 링크 입니다.');
                        }
                    }, error: function (e) {
                        alert('danger', '링크 추가', '링크를 추가하는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
                    }
                });
            } else {
                alert('danger', '링크 추가', 'URL 형식이 잘못되었습니다.');
            }
        } else {
            alert('danger', '링크 추가', '링크 이름을 입력해주세요.');
        }

    });
    $(document).on('click', '.link-item', function (e) {
        let name = e.target.className;
        if (name != 'link-destroy-icon') {
            let url = $('#' + e.target.id).attr('url');
            window.open(url, '_blank');
        }
    });

    $(document).on('click', '.list-edit-icon', function (e) {
        const listNo = $(this).parent().attr('number');
        let listName = $(this).parent().attr('content');
        $('.list-edit-box').attr('num', listNo);
        $('.list-edit-table').text('');
        $('#list-edit-listName').val(listName);
        $.ajax({
            type: 'GET',
            url: '/links/',
            data: { 'list': { 0: { 'LIST_NO': listNo } } },
            success: function (data) {
                if (data[0]) {
                    $('.list-edit-table').append('<tr> <th class="link-name-th">이름</th> <th>URL</th> </tr>');
                    for (item of data[0]) {
                        $('.list-edit-table').append('<tr><td><input type="text" maxlength="50" value="' + item.LINK_NAME + '" num="' + item.LINK_NO + '"></td> <td><input type="text" maxlength="200" value="' + item.LINK_URL + '"></td></tr>');
                    }
                } else {
                    $('.list-edit-table').append('<tr><td style="text-align:center">비어있는 리스트 입니다.</td></tr>');
                }
                $('#list-edit-modal').fadeIn('fast');
                $('body').css('overflow-y', 'hidden');
                $('#list-edit-listName').focus();
            }, error: function (e) {
                alert('danger', '리스트 수정', '리스트를 가져오는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
            }
        });
    });

    $(document).on('click', '#list-edit-btn', function (e) {
        const listName = $('#list-edit-listName').val();
        const listNo = $('.list-edit-box').attr('num');
        let linkNums = new Array();
        let linkNames = new Array();
        let linkUrls = new Array();
        const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
        let urlCheck = true;
        $('.list-edit-table > tbody  > tr > td > input').each(function (index) {
            if (index % 2 === 0) {
                linkNames.push($(this).val());
                linkNums.push($(this).attr('num'));
            } else {
                if (!regex.test($(this).val())) {
                    urlCheck = false;
                    $(this).focus();
                }
                linkUrls.push($(this).val());
            }
        });


        if (urlCheck) {
            $.ajax({
                type: 'PATCH',
                url: '/list/' + listNo,
                data: { 'listNo': listNo, 'listName': listName, 'linkNames': linkNames, 'linkUrls': linkUrls, 'linkNums': linkNums },
                success: function (data) {
                    alert('success', '리스트 수정', '리스트 수정이 완료되었습니다.');
                    $('#list-edit-modal').fadeOut('fast');
                    $('body').css('overflow-y', 'scroll');
                    linkListBind(data).then(linkBind);
                }, error: function (e) {
                    alert('danger', '리스트 수정', '리스트를 수정하는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
                }
            });
        } else {
            alert('danger', '리스트 수정', '수정한 URL 중 형식이 잘못된 부분이 있습니다.');
        }

    });

    $(document).on('click', '.link-destroy-icon', function () {
        const linkNo = $(this).attr('num');
        const linkName = $('#link-' + linkNo + ' a').text();
        $('.link-destroy-name').attr('num', linkNo);
        $('.link-destroy-name').text('삭제할 링크이름 : ' + linkName);
        $('#link-destroy-modal').fadeIn('fast');
        $('body').css('overflow-y', 'hidden');
    });

    $(document).on('click', '#link-destroy-btn', function () {
        const linkNo = $('.link-destroy-name').attr('num');
        $.ajax({
            type: 'DELETE',
            url: 'links/' + linkNo,
            data: { 'linkNo': linkNo },
            success: function (data) {
                if (data) {
                    alert('success', '링크 삭제', '링크 삭제가 완료되었습니다.');
                    $('#link-destroy-modal').fadeOut('fast');
                    $('body').css('overflow-y', 'scroll');
                    linkListBind(data).then(linkBind);
                } else {
                    alert('danger', '링크 삭제', '링크를 삭제하는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
                }
            }, error: function (e) {
                alert('danger', '링크 삭제', '링크를 삭제하는 도중 문제가 발생했습니다 관리자에게 문의해주세요.');
            }
        });
    });

    $(document).on('click', '#list-share-modal-btn', function () {
        sessionCheck().then(getLists);
    });

    $(document).on('click', '#list-share-btn', function () {
        const listNo = $('.my-list option:selected').val();
        $.ajax({
            type: 'POST',
            url: '/boards',
            data: { 'listNo': listNo },
            success: function (data) {
                if (data) {
                    alert('success', '리스트 공유', data.msg);
                    boardInit();
                    $('#list-share-modal').fadeOut('fast');
                    $('body').css('overflow-y', 'scroll');
                } else {
                    alert('danger', '리스트 공유', '이미 공유된 리스트입니다.');
                }
            }, error: function (e) {
                alert('danger', '리스트 공유', '리스트를 공유하는중에 문제가 발생했습니다 관리자에게 문의해주세요.');
            }
        });
    });

    $(document).on('click', '.share-item', function () {
        const docNo = $(this).attr('num');
        const listName = $(this).children('.share-item-name').text();
        $('.share-board-name').attr('content', listName)
        $('.share-board-name').text('리스트 명 : ' + listName);
        $('.share-board-name').attr('docNum', docNo);
        $('.share-board-table').text('');
        $('.share-board-table').append('<tr><th>이름</th> <th>URL</th></tr>');

        $.ajax({
            type: 'GET',
            url: '/boards/' + docNo,
            data: { 'docNo': docNo },
            success: function (data) {
                $('.share-board-name').attr('listNum', item.LIST_NO);
                for (item of data) {
                    $('.share-board-table').append('<tr><td>' + item.LINK_NAME + '</td>'
                        + '<td><a href="' + item.LINK_URL + '" target="_blank">' + item.LINK_URL + '</a></td></tr>');
                }
                $('#share-board-modal').fadeIn('fast');
                $('body').css('overflow-y', 'hidden');
            }, error: function (e) {
                alert('danger', '공유 리스트', '공유 리스트를 가져오는중에 문제가 발생했습니다 관리자에게 문의해주세요.');
            }
        });
    });

    $(document).on('click', '#list-get-btn', function () {
        const listName = $('.share-board-name').attr('content');
        storeList(listName).then(getListNo).then(storeLinks);
    });
    function storeLinks(data) {
        let linkNames = new Array();
        let linkUrls = new Array();
        let urlCheck = true;
        let count = 0;
        const regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        $('.share-board-table > tbody  > tr > td ').each(function (index) {
            if (index % 2 === 0) {
                linkNames.push($(this).text());
            } else {
                if (!regex.test($(this).text())) {
                    urlCheck = false;
                    $(this).focus();
                }
                linkUrls.push($(this).text());
            }
        });
        if (urlCheck) {
            $.ajax({
                type: 'POST',
                url: '/links',
                data: { 'list': 1, 'listNo': data.LIST_NO, 'linkNames': linkNames, 'linkUrls': linkUrls },
                success: function (data) {
                    alert('success', '리스트 담기', '리스트 담기를 완료하였습니다.');
                    $('#share-board-modal').fadeOut('fast');
                    $('body').css('overflow-y', 'scroll');
                    linkListBind(data).then(linkBind);
                }, error: function (e) {
                    alert('danger', '리스트 담기', '공유된 리스트 저장 중 문제가 발생했습니다 관리자에게 문의해주세요.');
                }
            })
        } else {
            alert('danger', '리스트 담기', '공유된 리스트 URL에 문제가 있습니다 관리자에게 문의해주세요.');
        }


    }
    function getListNo(result) {
        return new Promise(function (resolve) {
            $.ajax({
                type: 'GET',
                url: '/lists/' + result.listName,
                data: { 'name': result.listName, 'userNo': result.userNo },
                success: function (data) {
                    resolve(data[0]);
                }, error: function (e) {
                    alert('danger', '리스트 담기', '공유 리스트를 복사한 후 가져오는 중 문제가 발생했습니다 관리자에게 문의해주세요.');
                }
            })
        });
    }
    function storeList(listName) {
        return new Promise(function (resolve) {
            $.ajax({
                type: 'POST',
                url: '/lists',
                data: { 'name': listName },
                success: function (data) {
                    if (data) {
                        let result = { 'userNo': data.userNo, 'listName': listName };
                        resolve(result);
                    } else {
                        alert('danger', '리스트 담기', '중복된 이름의 리스트가 있거나 이미 담긴 리스트입니다.');
                    }
                }, error: function (e) {
                    alert('danger', '리스트 담기', '공유 리스트를 담는중에 문제가 발생했습니다 관리자에게 문의해주세요.');
                }
            });
        });
    }
});
function boardInit() {
    $('.list-share-table').text('');
    $('.list-share-table').append('<tr><th>번호</th><th>리스트명</th><th style="width: 20%">생성한 시간</th><th style="width: 20%">공유한 시간</th><th>공유한 사람</th><th>공유된 횟수</th></tr>');
    $.ajax({
        type: 'GET',
        url: '/boards',
        data: { 'pageNum': 0 },
        success: function (data) {
            for (item of data) {
                $('.list-share-table').append('<tr class="share-item" num="' + item.DOC_NO + '"><td>' + item.DOC_NO + '</td>'
                    + '<td class="share-item-name">' + item.LIST_NAME + '</td>'
                    + '<td>' + item.LIST_CREATED_AT + '</td>'
                    + '<td>' + item.DOC_CREATE_AT + '</td>'
                    + '<td>' + item.USER_ID + '</td>'
                    + '<td>' + item.SHARE_COUNT + '</td></tr>');
            }
        }, error: function (e) {
            alert('danger', '공유 게시판', '공유게시판을 가져오는중 문제가 발생했습니다 관리자에게 문의해주세요.');
        }
    })

}
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
    $('#' + id + '-alert').fadeIn('fast');
    if (id === 'danger') {
        dangerAlertCloseTimer = setTimeout(function () { clearTimeout(dangerAlertCloseTimer); $('#danger-alert').fadeOut('fast'); }, 5000);
    }
    if (id === 'success') {
        successAlertCloseTimer = setTimeout(function () { clearTimeout(successAlertCloseTimer); $('#success-alert').fadeOut('fast'); }, 3000);
    }

}

/* 로그인 여부에 따른 css 변화 메소드 */
function loginNav() {
    $('#login-modal-btn').hide();
    $('#join-modal-btn').hide();
    $('#logout-btn').css('display', 'block');
}
function logOutNav() {
    $('#login-modal-btn').css('display', 'block');
    $('#join-modal-btn').css('display', 'block');
    $('#logout-btn').hide();
}

/* 세션 체크 */
function sessionCheck() {
    return new Promise(function (resolve) {
        $.ajax({
            type: 'get',
            url: 'session/user',
            success: function (data) {
                if (data.userNo) {
                    loginNav();
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
                success: function (listData) {
                    $('.list-box-ul').text('');
                    $('.list-box-ul').append('<li class="list-add"><span class="list-add-icon">+</span></li>');
                    let i = 1;
                    for (item of listData) {
                        $('.list-box-ul').append('<li class="list-item" id="list-' + item.LIST_NO + '" number="' + item.LIST_NO + '" content="' + item.LIST_NAME + '"><span class="list-item-number">' + i + '</span><a class="list-item-name">' + item.LIST_NAME + '</a> <span class="list-destroy-icon"> - </span> <span class="link-add-icon"> + </span> <img src="/img/listEdit.png" class="list-edit-icon"> </li>');
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
    return new Promise(function (resolve) {
        if (listData) {
            $.ajax({
                type: 'get',
                url: '/links',
                data: { 'list': listData },
                success: function (linkData) {
                    $('.link-item-ul').text('');
                    for (link of linkData) {
                        for (item of link) {
                            $('#list-' + item.LIST_NO).append('<ul class="link-item-ul"><li class="link-item" id="link-' + item.LINK_NO + '" url="' + item.LINK_URL + '"><a class="link-item-name">'
                                + item.LINK_NAME + '(' + item.LINK_URL + ')</a> <span class="link-destroy-icon" num="' + item.LINK_NO + '">-</span> </li></ul>');
                        }
                    }
                    resolve();
                }, error: function (e) {
                    console.log(e);
                }
            });
        }
    });
}
/* 엔터 키 입력 버튼 트리거 */
function enterClickTrigger(e, obj) {
    if (e.keyCode === 13) {
        $(obj).trigger('click');
    }
}

/* 공유할 리스트 가져오는 함수 */
function getLists(userData) {
    if (userData.userNo) {
        $.ajax({
            type: 'GET',
            url: '/lists',
            success: function (data) {
                $('.my-list').text('');
                for (item of data) {
                    $('.my-list').append('<option value="' + item.LIST_NO + '">' + item.LIST_NAME + '</option>');
                    $('#list-share-modal').fadeIn('fast');
                    $('body').css('overflow-y', 'hidden');
                }
            }, error: function (e) {
                alert('danger', '리스트 공유', '리스트를 가져오는중에 문제가 발생했습니다 관리자에게 문의해주세요.');
            }
        });
    } else {
        alert('danger', '리스트 공유', '로그인 후 이용해주세요.');
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
