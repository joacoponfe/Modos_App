const form = document.getElementById("form");
import { getCookie } from "./cookies.js";
import { url } from "./config.js";

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    //console.log([...data]);

    // Convert formData to JSON format
    const object = {};
    object['id_participant'] = getCookie('id_participant');
    formData.forEach(function(value, key){
        object[key] = value;
    object['consent'] = 'on'; // hardcode consent, highly insecure and not recommended
    });

    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(form_data) {
        const response = await fetch(
            url + "/profiles_api/receive_form/",
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
        .then(body => window.location.href = "volume.html")
    })
    .catch((error) => {
        console.error('Error:', error);
        console.log("El servidor está caído.");
        window.location.href = "server_down.html";   
    });

});