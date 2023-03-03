const name_input = document.getElementById("name_input").value;
const sendButton = document.getElementById("sendButton");

function generateID() {
    console.log(userData);
    userData.name = document.getElementById("name_input").value;
    userData.timestamp = Date.now();
    userData.mode = "IONIAN";
    userData.version = "1";
    console.log(userData);
    
    // Create a JavaScript object with the user data
    //const userData = {
    //    name: document.getElementById("name_input").value,
    //    timestamp: Date.now(),
    //    mode: "IONIAN",
    //    version: "1"
    //};
    
    // Convert the object to JSON format
    //const jsonData = JSON.stringify(userData);
    //console.log(jsonData);

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
    alert(`¡Hola ${userData.name}, empecemos!`);
    window.location.href = "play.html";
}

sendButton.addEventListener('click', generateID);

module.exports = { userData };
