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
    let hour = 0;
    let minute = 0;
    let second = 0;
    let milisecond = 0;

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


        hour = Math.floor(elapsedTime / 3600000);
        minute = Math.floor(elapsedTime / 60000) - Math.floor(elapsedTime / 3600000) * 60;
        second = Math.floor(elapsedTime / 1000) - Math.floor(elapsedTime / 60000) * 60;
        milisecond = elapsedTime % 1000;

        //show timer time
        document.getElementsByClassName("timer_time")[0].innerHTML = (hour + ":" + minute + ":" + second + "." + milisecond);


        numbersToConvert[0] = hour;

        if (minute >= 10){
            numbersToConvert[1] = Number(String(minute).charAt(0));
            numbersToConvert[2] = Number(String(minute).charAt(1));
        }
        else {
            numbersToConvert[1] = 0;
            numbersToConvert[2] = Number(String(minute).charAt(0));
        }


        if (second >= 10){
            numbersToConvert[3] = Number(String(second).charAt(0));
            numbersToConvert[4] = Number(String(second).charAt(1));
        }
        else {
            numbersToConvert[3] = 0;
            numbersToConvert[4] = Number(String(second).charAt(0));
        }


        if (milisecond >= 100){
            numbersToConvert[5] = Number(String(milisecond).charAt(0));
        }
        else {
            numbersToConvert[5] = 0;
        }

        /*
        //alternative way to prepare numbers via maths

        numbersToConvert[0] = hour;
        numbersToConvert[1] = 0;  //can't find how to count here
        numbersToConvert[2] = Math.floor(elapsedTime / 60000) - Math.floor(elapsedTime / 600000) * 10;
        numbersToConvert[3] = Math.floor(elapsedTime / 10000) - Math.floor(elapsedTime / 60000) * 6;
        numbersToConvert[4] = Math.floor(elapsedTime / 1000) - Math.floor(elapsedTime / 10000) * 10;
        numbersToConvert[5] = Math.floor(milisecond / 100);
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

    removeAllCellOn()
    stopedTime = 0;
}