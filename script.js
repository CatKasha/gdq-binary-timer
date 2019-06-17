let timerId; //for setInterval
let timerIsRunning = false;
let elapsedTime = 0;
let stopedTime = 0;

let showTimerDisplay = true;
let binaryTimer = document.getElementById("binary_display");


function removeAllCellOn() {
    for (let i = 0; i < 24; i++){
        binaryTimer.children[i].classList.remove("cell_on");
    }
}


function switchStandbyBlink() {
    if (document.getElementById("switch_standby_blink").checked == true){
        binaryTimer.classList.add("standby_blink");
    }
    else {
        binaryTimer.classList.remove("standby_blink");
    }
}


function switchTimerDisplay() {
    if (document.getElementById("show_timer_display").checked == true){
        showTimerDisplay = true;
        document.getElementById("timer_display").classList.remove("timer_display_off");
    }
    else {
        showTimerDisplay = false;
        document.getElementById("timer_display").classList.add("timer_display_off");
    }
}


function changeBinaryDisplayOpacity(){
    document.getElementById("binary_display_opacity").style.opacity = document.getElementById("slider_binary_display_opacity").value;
}


function startTimer() {
    //do not start the timer if it is already running
    if (timerIsRunning == true){
        return;
    }
    timerIsRunning = true;


    let startTime = Date.now() - stopedTime;

    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let miliseconds = 0;

    let numbersToConvert = [];

    timerId = setInterval(function() {
        elapsedTime = Date.now() - startTime;

        //show miliseconds in timer_details
        document.getElementById("ms_time").innerHTML = elapsedTime;


        hours = Math.floor(elapsedTime / 3600000);
        minutes = Math.floor((elapsedTime / 60000) % 60);
        seconds = Math.floor((elapsedTime / 1000) % 60);
        miliseconds = elapsedTime % 1000;

        //show timer time in timer_details
        document.getElementById("timer_time").innerHTML = hours + ":" + minutes + ":" + seconds + "." + miliseconds;


        numbersToConvert[0] = hours;

        if (minutes >= 10){
            numbersToConvert[1] = Number(String(minutes).charAt(0));
            numbersToConvert[2] = Number(String(minutes).charAt(1));
        }
        else {
            numbersToConvert[1] = 0;
            numbersToConvert[2] = Number(String(minutes).charAt(0));
        }

        if (seconds >= 10){
            numbersToConvert[3] = Number(String(seconds).charAt(0));
            numbersToConvert[4] = Number(String(seconds).charAt(1));
        }
        else {
            numbersToConvert[3] = 0;
            numbersToConvert[4] = Number(String(seconds).charAt(0));
        }

        if (miliseconds >= 100){
            numbersToConvert[5] = Number(String(miliseconds).charAt(0));
        }
        else {
            numbersToConvert[5] = 0;
        }

        /*
        //alternative way to prepare numbers via maths

        numbersToConvert[0] = hours;
        numbersToConvert[1] = Math.floor((elapsedTime / 600000) % 6);
        numbersToConvert[2] = Math.floor((elapsedTime / 60000) % 10);
        numbersToConvert[3] = Math.floor((elapsedTime / 10000) % 6);
        numbersToConvert[4] = Math.floor((elapsedTime / 1000) % 10);
        numbersToConvert[5] = Math.floor(miliseconds / 100);
        */

        //show numbersToConvert in timer_details
        document.getElementById("numbersToConvert_time").innerHTML = numbersToConvert[0] + ":" + numbersToConvert[1] +
        ":" + numbersToConvert[2] + ":" + numbersToConvert[3] + ":" + numbersToConvert[4] + "." + numbersToConvert[5];

        //show timer time in timer_dispay
        if (showTimerDisplay == true){
            if (hours == 0) {
                document.getElementById("timer_display_not_ms").innerHTML = String(numbersToConvert[1]) + String(numbersToConvert[2]) +
                ":" + String(numbersToConvert[3]) + String(numbersToConvert[4]);
                document.getElementById("timer_display_ms").innerHTML = "." + String(numbersToConvert[5]);
            }
            else {
                document.getElementById("timer_display_not_ms").innerHTML = String(hours) + ":" + String(numbersToConvert[1]) + String(numbersToConvert[2]) +
                ":" + String(numbersToConvert[3]) + String(numbersToConvert[4]);
                document.getElementById("timer_display_ms").innerHTML = "." + String(numbersToConvert[5]);
            }
        }


        for (let i = 0; i < 6; i++){
            //convert number to binary number
            numbersToConvert[i] = String(numbersToConvert[i].toString(2));

            //add missing zeros
            let numberFromArrayLength = numbersToConvert[i].length;
            if (numberFromArrayLength !== 4){
                numbersToConvert[i] = "0".repeat(Math.abs(numberFromArrayLength - 4)) + numbersToConvert[i];
            }

            //turn off/on cells
            for (let y = 0; y < 4; y++) {
                let cell = "cell_" + (y+1) + "_" + (i+1);

                if (numbersToConvert[i].charAt(y) == "1") {
                    document.getElementById(cell).classList.add("cell_on");
                }
                else {
                    document.getElementById(cell).classList.remove("cell_on");
                }
            }
        }

        //show binary time in timer_details
        document.getElementById("binary_time").innerHTML = numbersToConvert[0] + ":" + numbersToConvert[1] +
        ":" + numbersToConvert[2] + ":" + numbersToConvert[3] + ":" + numbersToConvert[4] + "." + numbersToConvert[5];

    }, 50);
}


function stopTimer() {
    clearInterval(timerId);
    timerIsRunning = false;

    stopedTime = elapsedTime;
}


function resetTimer() {
    clearInterval(timerId);
    timerIsRunning = false;

    removeAllCellOn();
    stopedTime = 0;

    document.getElementById("timer_display_not_ms").innerHTML = "00:00";
    document.getElementById("timer_display_ms").innerHTML = ".0";

    document.getElementById("ms_time").innerHTML = 0;
    document.getElementById("timer_time").innerHTML = "0:0:0.0";
    document.getElementById("numbersToConvert_time").innerHTML = "0:0:0:0:0.0";
    document.getElementById("binary_time").innerHTML = "0000:0000:0000:0000:0000.0000";
}


function startTimerFrom() {
    stopedTime = Number(document.getElementById("start_timer_from_hours").value) * 3600000;
    stopedTime = stopedTime + Number(document.getElementById("start_timer_from_minutes").value) * 60000;
    stopedTime = stopedTime + Number(document.getElementById("start_timer_from_seconds").value) * 1000;
    stopedTime = stopedTime + Number(document.getElementById("start_timer_from_milliseconds").value);

    startTimer();
}