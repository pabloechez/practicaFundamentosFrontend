"use strict";

/*=====================================================================
Validación contacto
=======================================================================*/

//variables
var form = document.getElementsByName("contact")[0];
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
