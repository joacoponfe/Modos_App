import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";
import { winstonLogger } from "./logger.js";

const form = document.getElementById("form");

fetch(url + "/profiles_api/hello/", {
    method: "GET",
    }).then(response => response)
    .then(data => {
        console.log("El servidor está corriendo.")
    })
    .catch((error) => {
      console.error('Error:', error);
      console.log("El servidor está caído.");
      winstonLogger.info('Server down.')
    });

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    // Convert formData to JSON format
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(id_data) {
        const response = await fetch(
            url + "/profiles_api/receive_id/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: id_data,
            }
        );
        return response;
    };

    query(formJSON).then((response) => {
        response.json().then(body => console.log(body) || body)
        .then(body => setCookie('id_participant', body['id_participant'], 1) || body)
        .then(body => setCookie('id_exists', body['id_exists'], 1) || body)
        .then(body => checkID(body['id_exists']))
    })
    .catch((error) => {
        console.error('Error:', error);
        console.log("El servidor está caído.");
        window.location.href = "server_down.html";
      });
    
});

function checkID(id_exists) {
    console.log(id_exists);
    if (id_exists) {
        window.location.href = "checkID.html?" + getCookie('id_participant');
    } else {
        window.location.href = "form.html?" + getCookie('id_participant');
    }
};