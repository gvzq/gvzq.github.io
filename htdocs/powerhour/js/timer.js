var second;
var count;
var quit;
pause = false;
on = false;

function start() {
    if (!on){
        quit = setInterval("seconds()",1000);
        on = true;
        second = 5;
        count = 0;
        startUtil();
    }
}
function seconds(){
    if (!pause){
        second--;
        document.getElementById('sec').innerHTML = second;
        if (second == 0){
            second = 5;
            count++;
            drinkAlert();       //drink alert
            progressUpdate();    //progress bar
        }
        if (count == 5){
            stop();
        }
    }
}
function wait(){
    pause = !pause;
    if (pause){
        document.getElementById('wait').innerHTML = "Resume";
    }
    else {
        document.getElementById('wait').innerHTML = "Pause";
    }
}
function stop(){
    if (on && !pause){
        //are you sure yes or no modal

        // Dismissible popover saying to unpause
        // $(".drink-alert").prepend(
        //     "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
        //     "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
        //     "<strong>Please unpause</strong>.</div>"
        // );
        clean();
    }else{
        clean();
    }
}
function clean(){
    if (count == 5){
        //congrats and donate

    }
    clearInterval(quit);
    on = false;
    pause = false;
    StopUtil();
}
function drinkAlert(){
    //show drinks alert
    $(".drink-alert").append(
        "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
        "<strong>Drink</strong> shot number " + count + ".</div>"
    );
}
function progressUpdate(){
    //update progress
    document.getElementById('cnt').innerHTML = count;
    $('.progress-bar').css('width', (count/60)*100 +'%').attr('aria-valuenow', count);
}
function startUtil(){
    //reset
    document.getElementById('start').style.display = "none";
    document.getElementById('pause').style.display = "inline";
    document.getElementById('stop').style.display = "inline";
    document.getElementById('one-time').style.display = "none";
}
function StopUtil(){
    //reset of text and button
    document.getElementById('sec').innerHTML = 0;
    document.getElementById('cnt').innerHTML = 0;
    document.getElementById('start').style.display = "inline";
    document.getElementById('pause').style.display = "none";
    document.getElementById('stop').style.display = "none";
    //hide progress and alerts
    $(".drink-alert").empty();
    $('.progress-bar').css('width', 0 +'%').attr('aria-valuenow', 0);
}
