var second;
var minutes;
var quit;
progress = true;
sounds = true;
alerts = true;
pause = false;

function startTimer() {
    quit = setInterval("seconds()", 1000);
    localStorage.settings = true;
    second = 60;
    minutes = 0;
    startUtil();
}

function contTimer() {
    quit = setInterval("seconds()", 1000);

    minutes = localStorage.minutes;
    second = localStorage.second;
    startUtil();
}



function seconds() {
    if (!pause) {
        second--;
        document.getElementById('sec').innerHTML = second;
        if (second == 0) {
            second = 60;
            minutes++;
            if (sounds) {
                audio.play();
            }
            if (alerts) {
                //drinkAlert(); //drink alert
            }
            progressUpdate(); //progress bar
        }
        if (minutes == 60) {
            //congrats and donate
            $('#donate').modal('show');
            clean();
        }
    }
}

function wait() {
    pause = !pause;
    if (pause) {
        document.getElementById('wait').innerHTML = "Resume";
    } else {
        document.getElementById('wait').innerHTML = "Pause";
    }
}

function stopTimer() {
    // var r = confirm("Do you really want to exit? Press OK to quit.");
    // if (r == true) {
    cleanVar();
    // } else {
    //     // Dismissible popover saying to unpause
    //     pause = true;
    //     $(".drink-alert").prepend(
    //         "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
    //         "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
    //         "<strong>Game has been paused. Please press resume.</strong></div>"
    //     );
    // }
}

function cleanVar() {
    clearInterval(quit);
    pause = false;
    localStorage.settings = false;
    localStorage.minutes = 0;
    localStorage.second = 0;
    StopUtil();
}

function drinkAlert() {
    //show drinks alert
    $(".drink-alert").append(
        "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
        "<strong>Drink</strong> shot number " + minutes + ".</div>"
    );
}

function progressUpdate() {
    //update progress
    if (progress) {
        $('.progress-bar').css('width', (minutes / 60) * 100 + '%').attr('aria-valuenow', minutes);
    } else {
        $('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
    }
    document.getElementById('cnt').innerHTML = minutes;
}

function startUtil() {
    //reset
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "inline";
    document.getElementById('stop').style.display = "inline";
    document.getElementById('one-time').style.display = "none";
}

function StopUtil() {
    //reset of text and button
    document.getElementById('sec').innerHTML = 0;
    document.getElementById('cnt').innerHTML = 0;
    document.getElementById('start').style.display = "inline";
    document.getElementById('pause').style.display = "none";
    document.getElementById('stop').style.display = "none";
    //hide progress and alerts
    //$(".drink-alert").empty();
    //$('.progress-bar').css('width', 0 + '%').attr('aria-valuenow', 0);
}

function alertSett() {
    alerts = !alerts;
}

function soundSett() {
    sounds = !sounds;
}

function progressSett() {
    progress = !progress;
}

function loadAudio() {
    // audio = document.getElementById('audio');
    //audio.play();
}
