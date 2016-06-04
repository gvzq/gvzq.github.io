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
        //hide "one-time"
        document.getElementById('start').style.display = "none";
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
    if (pause){
        document.getElementById('wait').innerHTML = "Pause";
    }
    else {
        document.getElementById('wait').innerHTML = "Resume";
    }
    pause = !pause;
}
function stop(){
    clearInterval(quit);
    on = false;
    if (count == 5){
        var res = confirm("Congratulations!\nDo you want to play again?");
        if (res == true) {
            start();
        } else {
            //hide progress and alerts
            //donate?
        }
    }
    document.getElementById('sec').innerHTML = 0;
    document.getElementById('cnt').innerHTML = 0;
    document.getElementById('start').style.display = "inline";
}
function drinkAlert(){
    $(".drink-alert").append(
        "<div class=\"alert alert-success alert-dismissible\" role=\"alert\">" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>" +
        "<strong>Drink</strong> shot number " + count + ".</div>"
    );
}
function progressUpdate(){
    $('.progress-bar').css('width', (count/60)*100 +'%').attr('aria-valuenow', count);
}
