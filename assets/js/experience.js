"use strict";

/*=====================================================================
Ajax
=======================================================================*/
var skillsContent= document.getElementsByClassName('experience__skills')[0];
var jobsContent= document.getElementsByClassName('experience__jobs__content')[0];
var buttonShow= document.getElementById('show-skills');

function getSkillsData() {
    makeRequest("GET", "https://my-json-server.typicode.com/pabloechez/db/skills", null, function(data) {
        var response = JSON.parse(data);
        var div = document.createElement("div");
        var children = "";
        response.forEach(element => {
            children +="<div>";
            children += "<img src='assets/img/" + element.img + "'>";
            children += "<p>" + element.title + "</p>";
            children +="</div>";
        });

        div.innerHTML = children;

        skillsContent.appendChild(div);
        buttonShow.style.display='none';
    });
}

function getJobsData() {
    makeRequest("GET", "https://my-json-server.typicode.com/pabloechez/db/jobs", null, function(data) {
        var response = JSON.parse(data);
        //var div = document.createElement("div");
        var children = "";
        response.forEach(element => {
            children +="<div class='item'><div class='item__container'>";
            children += "<img class='item__container__img' src='assets/img/" + element.img + "'>";
            children += " <div class='item__container__text'><h3>"+element.title+"</h3><p>" + element.text + "</p></div>";
            children +="</div></div>";
        });

        jobsContent.innerHTML = children;
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

getJobsData();

buttonShow.addEventListener('click',getSkillsData);