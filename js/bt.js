var images = [
    'images/christamas/barrier.png',
    'images/christamas/santa.gif',
    'images/christamas/cloud.png',
    'images/christamas/head.gif',
    'images/christamas/loading.png',
    'images/christamas/finish.png'
];
var timer;
/**
 * loading images and move
 */
function move (percent) {
    $('.loading-run').animate({
        width: percent * 5.51 + 'rem'
    }, 200, 'linear')
    $('.loading-santa').animate({
        left: percent * 4.16 + 'rem'
    }, 200, 'linear', function () {
        $('#percent').html(percent * 100);
        if (percent == 1.0) {
            clearInterval(timer);
            timer = null;
            setTimeout(function () {
                $('#loading').hide();
                $('#page1').show();
                beforePlayVideo('video1');
            }, 200)
        }    
    }) 
}

/**
 * loading images
 * 
 */
function loading (images) {
    var progress = 0;
    var length = images.length;
    timer = setInterval(function () {
        for (var i = 0; i < images.length; i++) {
            var item = images.shift();
            var img = new Image();
            img.src = item;
            if (img.complete) {
                progress ++;
                var percent = (progress / length).toFixed(2);
                move(percent);
            }
            else {
                img.onload = function () {
                    progress ++;
                    var percent = (progress / length).toFixed(2);
                    move(percent);
                }
            }
              
        }
    }, 50)      
}

function beforePlayVideo (videoId) {
    var startY = 0;
    var moveY = 0; 
    var endY = 0;

    var videoItem = document.getElementById(videoId); 
    $('#' + videoId).show();
    $('#next').show();

    $('#next').on('touchstart', function (event) {
        startY = event.touches[0].clientY;
    })

    $('#next').on('touchmove', function (event) {
        moveY = event.changedTouches[0].clientY;
        console.log('moveY: ' + moveY);
        if ((moveY - startY) < 0) {
            $('#next').animate({
                bottom: (startY - moveY) / 10 + 'rem'
            }, 100, 'linear')
        }
    })
    $('#next').on('touchend', function (event) {
        endY = event.changedTouches[0].clientY;
        if ((startY - endY) < 30) {
            $('#next').animate({
                bottom: 0
            }, 200, 'linear')
        }
        else {
            $('#next').hide();
            videoItem.play();
            videoItem.addEventListener('ended', function () {
                console.log('end');
            })
        }
    })
}

/**
 * init 
 * 
 * 
 */
function init () {
    loading(images);
}

$(document).ready(function () {
    init();
})
