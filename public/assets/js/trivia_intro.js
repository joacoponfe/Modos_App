document.body.style.zoom = "67%"

const countdown = document.getElementById("countdown");

let timeLeft = 4;
let timerId = setInterval(redirect, 1000);

function redirect() {
    if (timeLeft == 0) {
        clearTimeout(timerId);
        window.location.href = "trivia.html";
    } else {
        countdown.innerHTML = 'Las preguntas comienzan en ' + timeLeft + ' segundos...';
        timeLeft--;
    }
}
