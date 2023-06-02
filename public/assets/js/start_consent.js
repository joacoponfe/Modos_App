import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";


fetch(url + "/profiles_api/hello/", {
    method: "GET",
    }).then(response => response)
    .then(data => {
        console.log("El servidor está corriendo.")
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log("El servidor está caído.");
    });

document.getElementById("sendButton").onclick = function () {
    location.href = "start_dni.html";
};