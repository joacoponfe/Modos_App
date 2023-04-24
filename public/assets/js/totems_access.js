import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

const form = document.getElementById("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    //console.log([...formData]);
    // Convert formData to JSON format
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(id_data) {
        const response = await fetch(
            //"http://localhost:8000/profiles_api/receive_id/", // cambiar?
            url + "/profiles_api/receive_id/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: id_data,
            }
        );
        //const result = await response.json();
        const result = await response;
        return result;
    }

    query(formJSON).then((response) => {
        response.json().then(body => console.log(body) || body)
        .then(body => checkID(body['id_participant'], body['id_exists']))
    });
});

function checkID(id_participant, id_exists) {
    console.log(id_exists);
    if (id_exists) {
        setCookie('id_participant', id_participant, 1);
        window.location.href = "totems_main.html?" + getCookie('id_participant');
    } else {
        //window.location.href = "totems_main.html?" + getCookie('id_participant')
        alert('Parece que este ID no existe.');
    }
  }