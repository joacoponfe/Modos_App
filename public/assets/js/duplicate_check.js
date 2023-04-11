const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

document.getElementById("noButton").onclick = function () {
    location.href = "consigna.html";
    // MANDAR id_participant COMO COOKIE
};

document.getElementById("yesButton").onclick = function () {
    location.href = "newID.html";
};