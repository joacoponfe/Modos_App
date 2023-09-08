import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";

const duplicate_ID = getCookie("id_participant");
const new_ID = duplicate_ID + "1";
setCookie("id_participant", new_ID);

document.getElementById("newID").innerHTML = new_ID;

document.getElementById("next").onclick = function () {
    location.href = "form_dynamic.html?" + getCookie("id_participant");
};