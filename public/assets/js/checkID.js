import { getCookie } from "./cookies.js";

const id_participant = getCookie("id_participant");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

document.getElementById("noButton").onclick = function () {
    location.href = "volume.html?" + id_participant;
};

document.getElementById("yesButton").onclick = function () {
    location.href = "newID.html";
};