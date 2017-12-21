$(document).ready(function() {

    /*=====================================================================
     PAGE TRANSITION
     =======================================================================*/
    $('body').css('opacity', '1');


    /*=====================================================================
     HEADER FIX
     =======================================================================*/
    $(document).scroll(function(){
        var sticky = $('.header'),
            scroll = $(document).scrollTop();

        if (scroll >= 15){
            sticky.addClass('header--small');
        } else {
            sticky.removeClass('header--small');
        }
    });

    /*=====================================================================
     SCROLL ANIMATION
    =======================================================================*/
    $('.scrollto').click(function (event) {
        event.preventDefault();
        var id = $(this).attr("href");
        var offset = 65;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 1000, "swing");
        event.preventDefault();
    });
});
