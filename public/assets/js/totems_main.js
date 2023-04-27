import { getCookie } from "./cookies.js";
import { url } from "./config.js";

// Get document elements
const mode_1 = document.getElementById("mode_1");
const mode_2 = document.getElementById("mode_2");
const id_string = document.getElementById("id_string");

// Get cookies
const id_participant = getCookie('id_participant');
const current_mode = 1;

// Pull info from database from user's last iteration (last two modes they listened to)
const object = {};
object['id_participant'] = id_participant;
const idJSON = JSON.stringify(object);
console.log(idJSON);

async function query(id_data) {
    const response = await fetch(
        //"http://localhost:8000/profiles_api/receive_id/",
        url + "/profiles_api/get_totems_data/",
        {
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: "POST",
            body: id_data,
        }
    );
    const result = await response;
    return result;
};

const res = await query(idJSON);
const userData = await res.json();
console.log(userData);

async function get_melody_mode(id_melody) {
    const response = await fetch(
        url + "/profiles_api/get_melody_mode/",
        {
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: "POST",
            body: id_melody,
        }
    );
    const result = await response;
    return result;
};

// Set participant ID in HTML page
id_string.innerHTML = id_participant;

// Get melody mode strings and update texts in html page
const id_melodies = userData['id_melody'];
const id_melody_1_JSON = JSON.stringify({"id_melody": id_melodies[0]});
const id_melody_2_JSON = JSON.stringify({"id_melody": id_melodies[1]});
const response1 = await get_melody_mode(id_melody_1_JSON);
const response2 = await get_melody_mode(id_melody_2_JSON);
const id_melody_1_mode = await response1.json();
const id_melody_2_mode = await response2.json();

const id_melody_modes = {'1': id_melody_1_mode, '2': id_melody_2_mode};

// Correct for tildes
for (let x in id_melody_modes){
    let id_melody_mode = id_melody_modes[x];
    if (id_melody_mode['id_melody_mode'] === "jonico"){
        id_melody_mode['id_melody_mode'] = "jónico";
    }   else if (id_melody_mode['id_melody_mode'] === "dorico"){
        id_melody_mode['id_melody_mode'] = "dórico";
    }   else if (id_melody_mode['id_melody_mode'] === "eolico"){
        id_melody_mode['id_melody_mode'] = 'eólico';
    };
};

mode_1.innerHTML = "Modo " + id_melody_1_mode['id_melody_mode'];
mode_2.innerHTML = "Modo " + id_melody_2_mode['id_melody_mode'];


// Create an audio element
const audioPlayer = document.createElement('audio');
// Set the source of the audio file
audioPlayer.src = 'music/J1.mp3';
// Set the controls attribute to display the audio player controls
audioPlayer.controls = true;

// Create Word Cloud element
const wordCloud = document.createElement("span");
wordCloud.classList.add('tagcloud');
const tagContainer = '.tagcloud';

const words = [
    'alegría', 'esperanza', 'contento', 'paz',
    'bueno', 'soleado', 'armonioso', 'dulce',
    'aire', 'aire', 'alegría', 'paz',
    'aire', 'paz', 'paz', 'yendo',
    'árboles', 'vida', 'cajas', 'violeta',
    'castillo', 'monitores', 'papeles', 'impresora',
    'auriculares', 'billetera', 'magnífico', 'teclas',
    'piano', 'treinta', 'treinta', 'dieciocho',
    'televisor', 'computadora', 'escritorio', 'escritorio',
    'mate', 'silla', 'silla', 'billetera', 'parlante', 'parlante', 'dios', 'guerra',
    'guerra', 'silla', 'termo'
];

const options = {radius:200, maxSpeed:'fast', initSpeed:'fast', direction:135, keep:true};
//const tagCloud = TagCloud(tagContainer, words, options);

// Create emotional thermometer element


// Create image element
const image = document.createElement('img');
image.src = "https://i.pinimg.com/originals/3c/f8/41/3cf8412096f10f0847e6e689fde63775.jpg";

// Create playlist element
const player = document.createElement("div");
const audio = document.createElement("audio");
const controls = document.createElement("div");
const progressBar = document.createElement("div");


// Get references to the buttons in the sidebar menu
const buttons = document.querySelectorAll('.sidebar a');

// Add a counter for word cloud button clicks (to avoid rendering more than once)
var wordCloudButtonClicks = 0;
//console.log(wordCloudButtonClicks);

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', event => {
        // Get button ID
        //const buttonID = event.target.getAttribute('data-content');

        // Prevent the default link behavior
        event.preventDefault();

        // Set all buttons to "inactive"
        buttons.forEach(button => {
            button.setAttribute('class', '');
        });
        
        // Get the value of the "data-content" attribute of the clicked button
        const content = button.getAttribute('data-content');

        // Increment the click counter for the word cloud button
        if (content === 'wordcloud') {
            wordCloudButtonClicks++;
        }
        //console.log(wordCloudButtonClicks);

        // Update the content in the "container" div based on the value of the "data-content" attribute
        if (content === 'music') {
            document.getElementById('container').innerHTML = "<h2>Melodía</h2><br>Volvé a escuchar la melodía<br>";
            document.getElementById('container').appendChild(audioPlayer);
            button.setAttribute('class', "active");
        } else if (content === 'wordcloud') {
            document.getElementById('container').innerHTML = '<h2>Conceptos predominantes</h2><br>';
            document.getElementById('container').appendChild(wordCloud);
            console.log(container);
            if (wordCloudButtonClicks === 1) {
                var tagCloud = TagCloud(tagContainer, words, options);
            };
            button.setAttribute('class', "active");
        } else if (content === 'thermometer') {
            document.getElementById('container').innerHTML = '<h2>Termómetro emocional</h2><iframe src="thermometer.html"  width="100%" height="1000px" style="border:none;"></iframe>';
            button.setAttribute('class', "active");
        } else if (content === 'images') {
            document.getElementById('container').innerHTML = '<h2>Imagen</h2><br>';
            document.getElementById('container').appendChild(image);
            button.setAttribute('class', "active");
        } else if (content === 'you-and-others') {
            document.getElementById('container').innerHTML = '<h2>Vos y el resto</h2><br>';
            button.setAttribute('class', "active");
        } else if (content === 'songs') {
            document.getElementById('container').innerHTML = '<h2>Canciones representativas</h2><iframe src="playlist.html"  width="100%" height="1000px" style="border:none;"></iframe>';
            button.setAttribute('class', "active");
        }
    });
});

// Set data according to selected mode
function setData(id_mode){
    //const text_path_folder = userData['text_path_folder'][id_mode];
    const word_lists = userData['word_lists'][id_mode];
    const encoded_image = userData['encoded_images'][id_mode];
    const embedding_path_folder = userData['embedding_path_folder'][id_mode];
    const id_melody = userData['id_melody'][id_mode];
    // Set image source
    image.src = 'data:image/png;base64,'.concat(encoded_image);
}

setData(0);
