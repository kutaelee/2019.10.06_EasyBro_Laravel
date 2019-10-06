function sectionScrollTop(id){
    let SectionTop=$('#'+id).offset().top;
    $('html,body').stop().animate( { scrollTop : SectionTop-80 }, 600 );
}
$(document).ready(function(){
    let scrollcount=0;
    $('#navi').click(function(e){
        let id=e.target.id;
        /* 모달 버튼 클릭 이벤트 */
        if(id==='login-modal-btn'){
            $('#join-modal').hide();
            $('#login-modal').fadeIn();
        }
        if(id==='join-modal-btn'){
            $('#login-modal').hide();
            $('#join-modal').fadeIn();
        }

        if(id==='info-section-move-btn'){
            scrollcount=0;
            sectionScrollTop('info-section');
        }
        
        if(id==='link-section-move-btn'){
            sectionScrollTop('link-section');
        }

        if(id==='board-section-move-btn'){
            sectionScrollTop('board-section');
        }
        if(id==='home-move-btn'){
            $('html,body').stop().animate( { scrollTop : 0 }, 600 );
        }
        /* 폼 외의 영역 클릭 이벤트 */
        $(document).click(function(e){
            if(e.target.className==='modal'){
                $('.modal').fadeOut();
            }
        });
        /* 키 입력 이벤트 */
        $(document).keydown(function(e){
            if(e.keyCode===27){
                $('.modal').fadeOut();
            }
        });
    });

    /* 즐겨찾기 이동 이벤트 */
    $('#link-section-move').click(function(){
        sectionScrollTop('link-section');
    });


    /* 스크롤 이벤트 */
    $(window).scroll(function(e){
        let top=$(window).scrollTop();
        let boardSectionTop=$('#board-section').offset().top-100;
        let linkSectionTop=$('#link-section').offset().top-100;
        let infoSectionTop=$('#info-section').offset().top-100;
        let width=$(window).width();
        if(top===0){
            $('#navi').css({'opacity':'1'});
            $('#navi a').css({'color':'#bee3f8'});
        }else{
            $('#navi').css({'opacity':'.9'});
        }
        if(top>infoSectionTop && top < linkSectionTop){
            $('#navi a').css({'color':'#bee3f8'});
            $('#info-section-move-btn').css({'color':'floralwhite'});
        }
        if(top>linkSectionTop && top < boardSectionTop){
            $('#navi a').css({'color':'#bee3f8'});
            $('#link-section-move-btn').css({'color':'floralwhite'});
        }
        if(top>boardSectionTop){
            $('#navi a').css({'color':'#bee3f8'});
            $('#board-section-move-btn').css({'color':'floralwhite'});
        }

        if(top-100>infoSectionTop){
            $(window).scroll(function(e){
                scrollcount++;
                if(width>=scrollcount){          
                    $('html,body').stop().animate( { scrollTop : infoSectionTop+100 }, 0 );
                    $('#infobox1').css({'margin-left':'-'+scrollcount+'px'},150);    
                }else{
                    scrollcount=width;
                    $('#infobox1').css({'margin-left':'0px'},150);
                } 
            });
        }
    });

    $('#menu-toggle-btn').click(function(){
        $('#navi-menu').toggle();
    });
});