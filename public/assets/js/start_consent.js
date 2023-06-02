import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

const form = document.getElementById("form");
form.addEventListener('submit', function (e) {
    e.preventDefault();
    window.location.href = "start_dni.html";
});

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