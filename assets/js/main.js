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
    Validación contacto
    =======================================================================*/

    //variables
    var form = document.getElementsByName("contact")[0];
    var allItems = document.getElementsByTagName('input');
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var methodInput = document.getElementById("method");
    var otherMethodInput = document.getElementById("other__method");
    var methodContent = document.getElementsByClassName("other__method")[0];
    var textareaInput = document.getElementById("textarea");
    var phoneInput=document.getElementById('phone');
    var submitButton = document.getElementById("send");
    var messageContent = document.getElementsByClassName('contact__message')[0];
    var totalWords=0;
    var maxLength = 150;

    if(form){
        //cambio en select
        methodInput.addEventListener('change',function () {
            if(methodInput.selectedIndex==3){
                methodContent.classList.add('show');
            }else{
                methodContent.classList.remove('show');
                otherMethodInput.classList.remove('error');
            }
        });

        //altura en textarea
        textareaInput.setAttribute('style', 'height:' + (textareaInput.scrollHeight-50) + 'px;overflow-y:hidden;');
        textareaInput.addEventListener('input',function () {
            //textareaInput.style.height=this.scrollHeight+'px';
            this.style.height = '5rem';
            this.style.height = (this.scrollHeight) + 'px';
        });


        //validación
        form.addEventListener("submit", function(event) {

            checkError(nameInput.checkValidity() === false,nameInput,event);

            var regex = /[A-Za-z0-9\.\+]+@[A-Za-z0-9]+\.[A-Za-z0-9\.]+/;
            var resultEmailValidation = regex.test(emailInput.value);

            checkError(resultEmailValidation === false,emailInput,event);

            //var total=textareaInput.value.trim().replace(/\s+/gi, ' ').split(' ').length;
            if (textareaInput.value.length>0){
                totalWords=textareaInput.value.match(/\S+/g).length;
            }
            checkError(totalWords>maxLength,textareaInput,event);

            if(methodInput.selectedIndex==3){
                checkError(otherMethodInput.checkValidity() === false,otherMethodInput,event);
            }

            var phoneRegex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3}$/;
            var resultPhoneValidation=phoneRegex.test(phoneInput.value);

            checkError(resultPhoneValidation === false,phoneInput,event);

            event.preventDefault();

            if (document.querySelector('input.error') == null) {
                submitButton.setAttribute("disabled", "");
                messageContent.innerHTML = "Mensaje enviado";

                setTimeout(function() {
                    form.reset();
                    messageContent.innerHTML ="";
                    submitButton.removeAttribute("disabled");
                }, 3000);
            }

        });

        function checkError(sentence,item,event){
            if (sentence) {
                item.focus();
                item.classList.add("error");
                event.preventDefault();
                return false;
            }
            item.classList.remove("error");
        }
    }


    /*=====================================================================
    Ajax
    =======================================================================*/
    var skillsContent= document.getElementsByClassName('experience__skills')[0];

    function getData() {
        makeRequest("GET", "http://localhost:3000/skills/", null, function(data) {
            var response = JSON.parse(data);
            var div = document.createElement("div");
            var children = "";
            console.log(response);
            response.forEach(element => {
                children += "<p>" + element.title + "</p>";
            });

            div.innerHTML = children;

            skillsContent.appendChild(div);
        });
    }

    function makeRequest(method, url, body, callbackSuccess) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callbackSuccess(xhr.responseText);
            }
        };

        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    }

    getData();

});
