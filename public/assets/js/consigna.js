import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

document.getElementById("start").onclick = function () {
    location.href = "listen.html";
};

const elements = document.querySelectorAll(".centered-element-30");
const start = document.getElementById("start"); 
start.style.display = "none";
let currentIndex = 0;

function showstart() {
    start.classList.add("fade-in");
    start.style.display = "block";
}

// Function to show the next element and fade out the previous one
function showNextElement() {
    if (currentIndex < elements.length - 1){
        elements[currentIndex].classList.add("fade-out");
        currentIndex++;
        elements[currentIndex].style.display = "block";
        // elements[currentIndex].classList.remove("fade-out");
        if (currentIndex == elements.length - 1) {
            setTimeout(showNextElement, 5000); // Wait 5 seconds before showing the next element
        } else {
            setTimeout(showNextElement, 10000); // Wait 10 seconds before showing the next element
        }
    } else {
        // If there are no more elements, show the "Next" button
        elements[currentIndex].classList.add("fade-out");
        showstart();
    }
}

// Hide all elements except the first one
for (let i = 1; i < elements.length; i++) {
    elements[i].style.display = "none";
}

// Start showing elements after 5 seconds
setTimeout(showNextElement, 5000);

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