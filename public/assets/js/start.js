const initials_input = document.getElementById("initials_input").value;
const DNI_input = document.getElementById("DNI_input").value;
const sendButton = document.getElementById("sendButton");

const generateID =(e) => {
    e.preventDefault();
    // userData.initials = document.getElementById("initials_input").value;
    // userData.DNI = document.getElementById("DNI_input").value;
    // userData.timestamp = Date.now();
    // userData.mode = "IONIAN";
    // userData.version = "1";
    // console.log(userData);
    
    // Create a JavaScript object with the user data
    const userData = {
        initials: document.getElementById("initials_input").value,
        DNI: document.getElementById("DNI_input").value,
        timestamp: Date.now()
    };
    const options = {
        method: 'POST',
        body: JSON.stringify({ userData }),
        headers: new Headers({ 'Content-type': 'application/json' })
        //headers: {"Content-type": "application/json;charset=UTF-8"}
    }
    const response = fetch("/api", options);
    // Convert the object to JSON format
    const jsonData = JSON.stringify(userData);
    console.log(jsonData);


    

    // // Send a POST request with the JSON data as the body
    // fetch('/start', {
    //     method: "POST",
    //     body: jsonData,
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(() => {
    //         alert('¡Hola ${name_input}, empecemos!');
    //         window.location.href = "play.html";
    //     })
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));

    // const name_input = document.getElementById("name_input").value;
    // const ID = `ID_IONIAN_6_${name_input}`;
    //alert(`¡Hola ${userData.name}, empecemos!`);
    window.location.href = "form.html";
}

const form = document.getElementById("form");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const formData = new FormData(form);

    console.log([...formData]);
    
    // Convert formData to JSON format
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    
    const formJSON = JSON.stringify(object);
    console.log(formJSON);

    async function query(id_data) {
        const response = await fetch(
            "http://localhost:8000/profiles_api/receive_id/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                //body: JSON.stringify({ 'userData':'alelo' }),
                body: id_data,
            }
        );
        //const result = await response.json();
        const result = await response;
        return result;
    }

    query(formJSON).then((response) => {
        //console.log(JSON.stringify(response));
        //console.log(response.json());
        response.json().then(body => console.log(body));
    });

    //window.location.href = "form.html";
});
//sendButton.addEventListener('click', generateID);

// module.exports = { userData };
