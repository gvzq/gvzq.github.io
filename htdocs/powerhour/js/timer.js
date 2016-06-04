var second;
var count;
var quit;
pause = false;
on = false;

function start() {
    if (!on){
        quit = setInterval("seconds()",1000);
        on = true;
        second = 60;
        count = 0;
        startUtil();
    }
}
function seconds(){
    if (!pause){
        second--;
        document.getElementById('sec').innerHTML = second;
        if (second == 0){
            second = 60;
            count++;
            drinkAlert();       //drink alert
            progressUpdate();    //progress bar
        }
        if (count == 60){
            //congrats and donate
            $('#donate').modal('show');
            clean();
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
        var r = confirm("Do you really want to exit? Press OK to quit.");
        if (r == true) {
            clean();
        } else {
            // Dismissible popover saying to unpause
            pause = true;
            $(".drink-alert").prepend(
                "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\">" +
                "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
                "<strong>Game has been pause. Please press resume.</strong>.</div>"
            );
        }
    }else{
        clean();
    }
}
function clean(){
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
