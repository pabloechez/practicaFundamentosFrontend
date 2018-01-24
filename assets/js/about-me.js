"use strict";
/*=====================================================================
VIDEO
=======================================================================*/

let videoContent = document.getElementsByClassName('about-me__video-content')[0];

videoContent.addEventListener('click',function () {
    var tagName=videoContent.children[0].tagName;
    var video ='<video width="100%" height="100%" controls id="video"><source src="assets/img/video_placeholder.mp4" type="video/mp4"></video>';
    var img ='<img src="assets/img/play.svg" alt="Play">';

    if(tagName === "VIDEO"){
        videoContent.innerHTML= img;
        videoContent.style.background='';
    }

    if(tagName === "IMG"){
        videoContent.innerHTML= video;
        var vid = document.getElementById("video");
        vid.play();
        videoContent.style.background='black';

        vid.onended = function(e) {
            videoContent.innerHTML= img;
            videoContent.style.background='';
        };

    }
});