const clockContainer = document.querySelector(".js-clock"), 
clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    let hours = date.getHours();
    const seconds = date.getSeconds();
    let am_pm;
    if(hours>13) {
        hours = hours-12;
        am_pm = "PM";
    } else am_pm = "AM";
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${am_pm}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();