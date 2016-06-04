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
    }
}
function seconds(){
    if (!pause){
        second--;
        document.getElementById('sec').innerHTML = second;
        if (second == 0){
            second = 5;
            count++;
            //drink alert
            drinkAlert();
            //progress bar
            progressUpdate();
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
    document.getElementById('sec').innerHTML = 0;
    if (count == 5){
        var res = confirm("Congratulations!\nDo you want to play again?");
        if (res == true) {
            start();
        } else {
            //nothing maybe donate?
        }
    }
    document.getElementById('cnt').innerHTML = 0;
}

function drinkAlert(){
    $(".drink-alert").append(
        "<div class=\"alert alert-success\"><a class=\"close\" data-dismiss=\"alert\" aria-label=\"close\">&times;</a><br>Drink shot number <span id=\"drink\">"+count+"</span>!</div>"
    );
}

function progressUpdate(){
    $('.progress-bar').css('width', (count/60)*100 +'%').attr('aria-valuenow', count);  
}
