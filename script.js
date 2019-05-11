let timerId;//for setInterval
let binaryTimer = document.getElementById("binary_timer");
let elapsedTime = 0;
let stopedTime = 0;


function removeAllCellOn() {
    for (let i = 0; i < 24; i++){
        binaryTimer.children[i].classList.remove("cell_on");
    }
}


function standbyBlink() {
    binaryTimer.classList.add("anim_standby_blink");
}


function removeStandbyBlink() {
    binaryTimer.classList.remove("anim_standby_blink");
}


function startTimer() {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let miliseconds = 0;

    let numbersToConvert = [];


    let startTime = Date.now();

    timerId = setInterval(function() {
        if (stopedTime == 0){
            elapsedTime = Date.now() - startTime;
        }
        else{
            elapsedTime = stopedTime + Date.now() - startTime;
        }
        //show miliseconds
        document.getElementsByClassName("ms_time")[0].innerHTML = elapsedTime;


        hours = Math.floor(elapsedTime / 3600000);
        minutes = Math.floor(elapsedTime / 60000) - Math.floor(elapsedTime / 3600000) * 60;
        seconds = Math.floor(elapsedTime / 1000) - Math.floor(elapsedTime / 60000) * 60;
        miliseconds = elapsedTime % 1000;

        //show timer time
        document.getElementsByClassName("timer_time")[0].innerHTML = (hours + ":" + minutes + ":" + seconds + "." + miliseconds);


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
        numbersToConvert[1] = 0;  //can't find how to count here
        numbersToConvert[2] = Math.floor(elapsedTime / 60000) - Math.floor(elapsedTime / 600000) * 10;
        numbersToConvert[3] = Math.floor(elapsedTime / 10000) - Math.floor(elapsedTime / 60000) * 6;
        numbersToConvert[4] = Math.floor(elapsedTime / 1000) - Math.floor(elapsedTime / 10000) * 10;
        numbersToConvert[5] = Math.floor(miliseconds / 100);
        */

        //show numbersToConvert
        document.getElementsByClassName("numbersToConvert_time")[0].innerHTML = (numbersToConvert[0] + ":" + numbersToConvert[1] +
        ":" + numbersToConvert[2] + ":" + numbersToConvert[3] + ":" + numbersToConvert[4] + "." + numbersToConvert[5]);

        //add missing zeros
        for (let i = 0; i < 6; i++){
            numbersToConvert[i] = String(numbersToConvert[i].toString(2));

            let oneItemArray_length = numbersToConvert[i].length;
            if (oneItemArray_length !== 4){
                numbersToConvert[i] = "0".repeat(Math.abs(oneItemArray_length - 4)) + numbersToConvert[i];
            }

            //turn off/on cells
            for (let y = 0; y < 4; y++) {
                let cell = "cell_" + (y+1) + "_" + (i+1);

                if (numbersToConvert[i].charAt(y) == true) {
                    document.getElementsByClassName(cell)[0].classList.add("cell_on");
                }
                else {
                    document.getElementsByClassName(cell)[0].classList.remove("cell_on");
                };
            }
        }

        //show binary time
        document.getElementsByClassName("binary_time")[0].innerHTML = (numbersToConvert[0] + ":" + numbersToConvert[1] +
        ":" + numbersToConvert[2] + ":" + numbersToConvert[3] + ":" + numbersToConvert[4] + "." + numbersToConvert[5]);

    }, 50);
}


function stopTimer() {
    clearInterval(timerId);
    stopedTime = elapsedTime;
}


function resetTimer() {
    clearInterval(timerId);

    document.getElementsByClassName("ms_time")[0].innerHTML = 0;
    document.getElementsByClassName("timer_time")[0].innerHTML = "0:0:0.0";
    document.getElementsByClassName("numbersToConvert_time")[0].innerHTML = "0:0:0:0:0.0";
    document.getElementsByClassName("binary_time")[0].innerHTML = "0000:0000:0000:0000:0000.0000";

    removeAllCellOn();
    stopedTime = 0;
}


function startTimerFrom() {
    stopedTime = Number(document.getElementsByClassName("hours")[0].value) * 3600000;
    stopedTime = stopedTime + Number(document.getElementsByClassName("minutes")[0].value) * 60000;
    stopedTime = stopedTime + Number(document.getElementsByClassName("seconds")[0].value) * 1000;
    stopedTime = stopedTime + Number(document.getElementsByClassName("milliseconds")[0].value);

    startTimer();
}