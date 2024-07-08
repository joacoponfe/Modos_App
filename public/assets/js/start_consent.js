import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

const form = document.getElementById("form");
const alert_conditions = document.getElementById("alert_conditions");

document.getElementById("next").onclick = function () {
    if (document.getElementById("consent").checked) {
        //alert("checked");
    } else {
        alert(alert_conditions.textContent);

    };
};

function generateRandomString() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let initials = '';
    let DNI = '';
    
    // Generate 3 random letters
    for (let i = 0; i < 3; i++) {
        initials += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Generate 4 random numbers
    for (let i = 0; i < 4; i++) {
        DNI += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    const object = {"initials": initials, "DNI": DNI};
    const formJSON = JSON.stringify(object);
    return formJSON;
}


form.addEventListener('submit', function (e) {
    e.preventDefault();


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

    setCookie('id_exists', true, 1);
    //console.log(getCookie('id_exists'));

    async function checkIdExists() {
        while (getCookie('id_exists')) {
            // Generate a random ID consisting of 3 letters and 4 numbers
            const formJSON = generateRandomString();

            try {
                const response = await query(formJSON);
                const body = await response.json();

                console.log(body);
                
                setCookie('id_participant', body['id_participant'], 1);
                setCookie('id_exists', body['id_exists'], 1);

                if (!body['id_exists']) {
                    window.location.href = "form_dynamic.html";
                    break;
                }
            } catch (error) {
                console.error('Error:', error);
                console.log("El servidor está caído.");
                window.location.href = "server_down.html";
                break; // Exit the loop if there's an error
            }
        }
    };
    checkIdExists();
    //console.log(getCookie('id_participant'));
    //window.location.href = "form_dynamic.html";
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



// function checkID(id_exists) {
//     console.log(id_exists);
//     if (id_exists) {
//         window.location.href = "checkID.html?" + getCookie('id_participant');
//     } else {
//         window.location.href = "form_dynamic.html?" + getCookie('id_participant');
//      }
// };