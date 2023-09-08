import { getCookie } from "./cookies.js";

const id_participant = getCookie("id_participant");

document.getElementById("no").onclick = function () {
    location.href = "volume.html?" + id_participant;
};

document.getElementById("yes").onclick = function () {
    location.href = "newID.html";
};