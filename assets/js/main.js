"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /*=====================================================================
     PAGE TRANSITION
     =======================================================================*/
    document.querySelector('body').style.opacity='1';


    /*=====================================================================
     HEADER FIX
     =======================================================================*/
    $(document).scroll(function(){
        var sticky = $('.header');
        var scroll = $(document).scrollTop();

        if (scroll >= 15){
            sticky.addClass('header--small');
        } else {
            sticky.removeClass('header--small');
        }
    });

    /*=====================================================================
     SCROLL ANIMATION
    =======================================================================*/
    /*$('.scrollto').click(function (event) {
        event.preventDefault();
        var id = $(this).attr("href");
        var offset = 65;
        var target = $(id).offset().top - offset;
        $('html, body').animate({
            scrollTop: target
        }, 1000, "swing");
        event.preventDefault();
    });*/


    /*=====================================================================
    ANIMACIONES
     =======================================================================*/

    var controller=new ScrollMagic.Controller();

    /*=====================================================================
     secuencia
     =======================================================================*/
    $('.sequence-container').each(function () {
        var currentScreen = this;
        new ScrollMagic.Scene({ triggerElement: currentScreen, duration: 500,triggerHook: 0.9})
            .on('start', function () {
                $('.sequence-animation').each(function(i,e){
                    var tl=new TimelineLite({delay:0.2});
                    tl.to(this,1,{opacity:'1',transform:'translateY(-10px)',ease:Power2.easeInOut},(0.2*i))
                });
            })
            .addTo(controller)
        //.addIndicators()
    });

    /*=====================================================================
     Aparición fade in
     =======================================================================*/
    $('.fade-in').each(function(i,e){
        var fade_in_Tl= new TimelineMax();
        fade_in_Tl
            .from(this,1,{opacity:'0',transform:'translateY(10px)',ease:Power0.easeIn},0.2);

        var fadein_scene = new ScrollMagic.Scene({
            //triggerElement: '.fade-in',
            triggerElement: this,
            triggerHook: 0.9
        })
            .setTween(fade_in_Tl)
            //.addIndicators()
            .addTo(controller);
    });


    /*=====================================================================
    Logo principal
     =======================================================================*/

    TweenMax.staggerFrom(".header__container__logo img,.header__container__contact",2,{
        scale:0.5,
        opacity:0,
        delay:0.7,
        ease:Elastic.easeOut,
        force3D: true
    },0.5);


    /*=====================================================================
     SMOOTH SCROLL
     =======================================================================*/
    var scrollItems = document.getElementsByClassName("scrollto");

    for (var i = 0; i < scrollItems.length; i++) {
        scrollItems[i].addEventListener("click", function(event) {
            var goTo = this.href.split("#");

            if (goTo.length === 2) {
                event.preventDefault();
                var sectionToGo = goTo[goTo.length - 1];
                var elementToGo = document.getElementById(sectionToGo);
                var elemntPosition = elementToGo.getBoundingClientRect().top;
                var jump=document.documentElement.scrollTop+elemntPosition;
                scrollTo(document.documentElement,jump,1250);
            }
        });
    }

    function scrollTo(element, to, duration) {
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;


        var animateScroll = function(){
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }

    //t = current time
    //b = start value
    //c = change in value
    //d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
});
