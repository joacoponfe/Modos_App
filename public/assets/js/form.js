const form = document.getElementById("form");
import { getCookie } from "./cookies.js";

// // Get variables from localStorage
// var id_participant = localStorage.getItem('id_participant');
// var id_exists = localStorage.getItem('id_exists');
// var id_melody_set = localStorage.getItem('id_melody_set');

// console.log(id_participant);
// console.log(id_exists);
// console.log(id_melody_set);

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    //console.log([...data]);

    // Convert formData to JSON format
    const object = {};
    object['id_participant'] = getCookie('id_participant');
    formData.forEach(function(value, key){
        object[key] = value;
    });

    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(form_data) {
        const response = await fetch(
            "http://localhost:8000/profiles_api/receive_form/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: form_data,
            }
        );
        //const result = await response.json();
        const result = await response;
        return result;
    }

    query(formJSON).then((response) => {
        //console.log(JSON.stringify(response));
        //console.log(response.json());
        response.json().then(body => console.log(body)|| body)
        .then(body => window.location.href = "consigna.html");
    });

});