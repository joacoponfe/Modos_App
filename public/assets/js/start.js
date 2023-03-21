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
        timestamp: Date.now(),
        mode: "IONIAN",
        version: "1"
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

sendButton.addEventListener('click', generateID);

// module.exports = { userData };
