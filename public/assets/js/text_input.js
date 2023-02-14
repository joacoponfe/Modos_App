const name_input = document.getElementById("name_input").value;
const sendButton = document.getElementById("sendButton");

function generateUID() {
    // Generate unique identifier from user's name and the selected track.
    const name_input = document.getElementById("name_input").value;
    const ID = `ID_IONIAN_6_${name_input}`
    alert(`¡Hola ${name_input}, empecemos!`);
    window.location.href = "play.html"
}

sendButton.addEventListener('click', generateUID);
