import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

document.getElementById("nextButton").onclick = function () {
    location.href = "listen.html";
};

// We will use this page to retrieve information concerning the melody set and iteration value for the current participant.
// Create request object
const object = {};
object['id_participant'] = getCookie("id_participant");
const requestJSON = JSON.stringify(object);

async function query(id_participant) {
    const response = await fetch(
        url + "/profiles_api/id_melodies/",
        {
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: "POST",
            body: id_participant,
        }
    );
    //const result = await response.json();
    const result = await response;
    return result;
}

query(requestJSON).then((response) => {
    response.json().then(body => console.log(body) || body)
    .then(body => setCookie("id_melody_set", body['id_melody_set']) || body)
    .then(body => setCookie("iteration", body['iteration']) || body)
});