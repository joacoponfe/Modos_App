import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url } from "./config.js";

// Get cookies
const id_participant = getCookie('id_participant');
//const id_melody_mode = getCookie('id_melody_mode');

// Get document elements, iframe and iframe document elements
const mode_1 = document.getElementById("mode_1");
const mode_2 = document.getElementById("mode_2");
const id_string = document.getElementById("id_string");

function setThermometerValues(iframeDoc, alegria_percentage, tristeza_percentage, sorpresa_percentage, asco_percentage, miedo_percentage, enojo_percentage, pos_percentage, neu_percentage, neg_percentage, decimal_places=0){
    var alegria_value = iframeDoc.getElementById('alegria-value');
    var tristeza_value = iframeDoc.getElementById("tristeza-value");
    var sorpresa_value = iframeDoc.getElementById("sorpresa-value");
    var asco_value = iframeDoc.getElementById("asco-value");
    var miedo_value = iframeDoc.getElementById("miedo-value");
    var enojo_value = iframeDoc.getElementById("enojo-value");
    //var otro_value = iframeDoc.getElementById("otro-value");
    var pos_value = iframeDoc.getElementById("pos-value");
    var neu_value = iframeDoc.getElementById("neu-value");
    var neg_value = iframeDoc.getElementById("neg-value");

    alegria_value.innerHTML = (alegria_percentage * 100).toFixed(decimal_places).toString().concat("%");
    tristeza_value.innerHTML = (tristeza_percentage * 100).toFixed(decimal_places).toString().concat("%");
    sorpresa_value.innerHTML = (sorpresa_percentage * 100).toFixed(decimal_places).toString().concat("%");
    asco_value.innerHTML = (asco_percentage * 100).toFixed(decimal_places).toString().concat("%");
    miedo_value.innerHTML = (miedo_percentage * 100).toFixed(decimal_places).toString().concat("%");
    enojo_value.innerHTML = (enojo_percentage * 100).toFixed(decimal_places).toString().concat("%");
    //otro_value.innerHTML = (otro_percentage * 100).toFixed(decimal_places).toString().concat("%");
    pos_value.innerHTML = (pos_percentage * 100).toFixed(decimal_places).toString().concat("%");
    neu_value.innerHTML = (neu_percentage * 100).toFixed(decimal_places).toString().concat("%");
    neg_value.innerHTML = (neg_percentage * 100).toFixed(decimal_places).toString().concat("%");

    // Get the stylesheet containing the animation rules
    var stylesheet = iframeDoc.styleSheets[1];
    
    // Find the animation rule we want to modify
    const emotionRuleNames = ['alegria-bar', 'tristeza-bar', 'sorpresa-bar', 'asco-bar', 'miedo-bar', 'enojo-bar'];
    const emotionPercentages = [alegria_percentage, tristeza_percentage, sorpresa_percentage, asco_percentage, miedo_percentage, enojo_percentage];
    for (var i = 0; i < emotionRuleNames.length; i++){
        var emotionRuleName = emotionRuleNames[i];
        var emotionPercentage = emotionPercentages[i];
        var animationRule = null;
        for (var j = 0; j < stylesheet.rules.length; j++) {
            var rule = stylesheet.rules[j];
            if (rule.type == CSSRule.KEYFRAMES_RULE && rule.name == emotionRuleName) {
                animationRule = rule;
                break; 
            };
        };

        if (animationRule) {
            // Modify the animation rule
            var keyframes = animationRule.cssRules;
            for (var k = 0; k < keyframes.length; k++){
                var keyframe = keyframes[k];
                if (keyframe.keyText == '100%'){
                    var shadow_inset = (1-emotionPercentage)*100;
                    keyframe.style.boxShadow = `inset -${shadow_inset}em 0 0 0 #f7f7f7`;
                };
            };
        };

    };

    const sentimentRuleNames = ['positive-bar', 'neutral-bar', 'negative-bar'];
    const sentimentPercentages = [pos_percentage, neu_percentage, neg_percentage];
    for (var i = 0; i < sentimentRuleNames.length; i++){
        var sentimentRuleName = sentimentRuleNames[i];
        var sentimentPercentage = sentimentPercentages[i];
        var animationRule = null;
        for (var j = 0; j < stylesheet.rules.length; j++){
            var rule = stylesheet.rules[j];
            if (rule.type == CSSRule.KEYFRAMES_RULE && rule.name == sentimentRuleName) {
                animationRule = rule;
                break; 
            };
        };

        if (animationRule) {
            // Modify the animation rule
            var keyframes = animationRule.cssRules;
            for (var k = 0; k < keyframes.length; k++){
                var keyframe = keyframes[k];
                if (keyframe.keyText == '100%'){
                    var width = sentimentPercentage*100;
                    keyframe.style.width = `${width}%`;
                };
            };
        };
    };

};

// Pull info from database from user's last iteration (last two modes they listened to)
const object = {};
object['id_participant'] = id_participant;
const idJSON = JSON.stringify(object);
console.log(idJSON);

async function get_totems_data(id_data) {
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

const totemsData = await get_totems_data(idJSON);
const userData = await totemsData.json();
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

//const id_melody_modes = {'1': id_melody_1_mode, '2': id_melody_2_mode};
const id_melody_modes = [id_melody_1_mode, id_melody_2_mode];

// Correct for tildes
const id_melody_1_mode_tildes = Object.assign({}, id_melody_1_mode); // Create copies 
const id_melody_2_mode_tildes = Object.assign({}, id_melody_2_mode);
const id_melody_modes_tildes = [id_melody_1_mode_tildes, id_melody_2_mode_tildes];


for (let x in id_melody_modes_tildes){
    let id_melody_mode = id_melody_modes_tildes[x];
    if (id_melody_mode['id_melody_mode'] === "jonico"){
        id_melody_mode['id_melody_mode'] = "jónico";
    }   else if (id_melody_mode['id_melody_mode'] === "dorico"){
        id_melody_mode['id_melody_mode'] = "dórico";
    }   else if (id_melody_mode['id_melody_mode'] === "eolico"){
        id_melody_mode['id_melody_mode'] = 'eólico';
    };
};

mode_1.innerHTML = "Modo " + id_melody_1_mode_tildes['id_melody_mode'];
mode_2.innerHTML = "Modo " + id_melody_2_mode_tildes['id_melody_mode'];


// Get playlist elements
//const audioPlayer = document.createElement('audio');
const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const playlist = document.getElementById("genres");
const progressBar = document.getElementById("progress-bar");
const progress = document.querySelector(".progress");
const volume = document.getElementById("volume");
const mute = document.getElementById("mute");

//const currentTime = document.querySelector("#current-time");
//const duration = document.querySelector("#duration");

// Metadata elements
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const albumName = document.getElementById("album-name");
const releaseYear = document.getElementById("release-year");
const albumArt = document.getElementById("album-art");

// Song elements
const classicTrack = document.getElementById("clasica");
const jazzTrack = document.getElementById("jazz");
const metalargTrack = document.getElementById("metalarg");
const metalintTrack = document.getElementById("metalint");
const popTrack = document.getElementById("pop");



// Playlist functions
playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      audio.pause();
      playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
});

prev.addEventListener("click", () => {
    currentSong--;
    if (currentSong < 0) {
      currentSong = playlist.children.length - 1;
    }
    audio.src = playlist.children[currentSong].getAttribute("data-src");
    audio.play();
    setActiveSong(currentSong);
});
  
next.addEventListener("click", () => {
    currentSong++;
    if (currentSong === playlist.children.length) {
      currentSong = 0;
    }
    audio.src = playlist.children[currentSong].getAttribute("data-src");
    audio.play();
    setActiveSong(currentSong);
});

volume.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

mute.addEventListener("click", () => {
    if (audio.muted) {
        audio.muted = false;
        mute.innerHTML = '<i class="bi bi-volume-up-fill"></i>'
    } else {
        audio.muted = true;
        mute.innerHTML = '<i class="bi bi-volume-mute-fill"></i>'
    }
});

audio.addEventListener("timeupdate", (e) => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
    //currentTime.textContent = formatTime(audio.currentTime);
    //duration.textContent = formatTime(audio.duration);
});
  
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

progressBar.addEventListener("click", (e) => {
    const percent =
      (e.clientX - progressBar.offsetLeft) / progressBar.offsetWidth;
    audio.currentTime = percent * audio.duration;
    progress.style.width = `${percent}%`;
});

audio.addEventListener("ended", (e) => {
    if (currentSong === playlist.children.length - 1) {
      currentSong = 0;
    } else {
      currentSong++;
    }
    audio.src = playlist.children[currentSong].getAttribute("data-src");
    audio.play();
    setActiveSong(currentSong);
});

audio.addEventListener("playing", (e) => {
    playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

function setMetadata(index) {
    songTitle.innerHTML = modeSongsData['titulos'][index];
    artistName.innerHTML = modeSongsData['artistas'][index];
    //albumName.innerHTML = modeSongsData['albumes'][index];
    //releaseYear.innerHTML = modeSongsData['anios'][index];
    albumArt.src = 'data:image/png;base64,'.concat(modeSongsData['encoded_images'][index]);
    // Send metadata to playlist page
    const metadata = {'title': modeSongsData['titulos'][index], 'artist': modeSongsData['artistas'][index], 'album': modeSongsData['albumes'][index], 'year': modeSongsData['anios'][index], 'album-art': 'data:image/png;base64,'.concat(modeSongsData['encoded_images'][index])};
    if (typeof playlist_frame != "undefined") { 
        playlist_frame.contentWindow.postMessage(metadata, '*');
    }
};

function setAudioFiles(id_mode) {
    var id_mode_letter;
    if (id_mode === 'jonico'){
      id_mode_letter = 'j';
    } if (id_mode === 'dorico') {
      id_mode_letter = "d";
    } if (id_mode === 'frigio') {
      id_mode_letter = "f";
    } if (id_mode === 'lidio') {
      id_mode_letter = "li";
    } if (id_mode === 'mixolidio') {
      id_mode_letter = 'm';
    } if (id_mode === 'eolico') {
      id_mode_letter = 'e';
    } if (id_mode === 'locrio') {
      id_mode_letter = 'lo';
    }
  
    const audioTracksDir = 'music/snippets/';
    classicTrack.setAttribute("data-src", audioTracksDir.concat(id_mode_letter, '_clasica.wav'));
    jazzTrack.setAttribute("data-src", audioTracksDir.concat(id_mode_letter, '_jazz.wav'));
    metalargTrack.setAttribute("data-src", audioTracksDir.concat(id_mode_letter, '_metalarg.wav'));
    metalintTrack.setAttribute("data-src", audioTracksDir.concat(id_mode_letter, '_metalint.wav'));
    popTrack.setAttribute("data-src", audioTracksDir.concat(id_mode_letter, '_pop.wav'));
};

const setActiveSong = (index) => {
    // remove "active" class from previously active song
    playlist.querySelector(".active-song").classList.remove("active-song");
  
    // add "active" class to currently playing song
    const activeSong = playlist.querySelectorAll("li")[index];
    activeSong.classList.add("active-song");
    console.log(activeSong.getAttribute("data-src"));
    console.log(activeSong.getAttribute("id"));
    
    // set file metadata
    const genre = activeSong.getAttribute("id");
    setMetadata(index);
};

// BACKEND REQUEST
async function get_mode_songs(request) {
    const response = await fetch(
      url + "/profiles_api/get_mode_songs/",
      {
        headers: new Headers({ 'Content-type': 'application/json' }),
        method: "POST",
        body: request,
    }
  );
  const result = await response;
  return result;
};


// Create Word Cloud element
const wordCloud = document.createElement("span");
wordCloud.classList.add('tagcloud');
const tagContainer = '.tagcloud';
const options = {radius:200, maxSpeed:'fast', initSpeed:'fast', direction:135, keep:true};
var words = userData['word_lists'][0];
var tagcloud;

// Create emotional thermometer element
var container_frame;

// Create image element
const image = document.createElement('img');
//image.src = "https://i.pinimg.com/originals/3c/f8/41/3cf8412096f10f0847e6e689fde63775.jpg";
image.style.maxWidth = "100%";
image.alt = "No se encontró la imagen.";

// Create QR code image element
const qr_image = document.createElement('img');
qr_image.style.maxWidth = "100%";
qr_image.alt = "No se encontró el código QR.";

// Create playlist element
var playlist_frame;
//const player = document.createElement("div");
//const audio = document.createElement("audio");
//const controls = document.createElement("div");
//const progressBar = document.createElement("div");

// Get references to the buttons in the sidebar menus
const sidebarButtons = document.querySelectorAll('.sidebar a');

// Add a counter for word cloud button clicks (to avoid rendering more than once)
var wordCloudButtonClicks = 0;

// Add a click event listener to each button on the sidebar
sidebarButtons.forEach(button => {
    button.addEventListener('click', event => {

        // Prevent the default link behavior
        event.preventDefault();

        // Set all buttons to "inactive"
        sidebarButtons.forEach(button => {
            button.setAttribute('class', '');
        });
        
        // Get the value of the "data-content" attribute of the clicked button
        const content = button.getAttribute('data-content');

        // Increment the click counter for the word cloud button
        if (content === 'wordcloud') {
            wordCloudButtonClicks++;
        }

        // Update the content in the "container" div based on the value of the "data-content" attribute
        if (content === 'music') {
            document.getElementById('container').innerHTML = "<h2>Melodía</h2><br>Volvé a escuchar la melodía<br>";
            document.getElementById('container').appendChild(audio);
            button.setAttribute('class', "active");
        } else if (content === 'wordcloud') {
            document.getElementById('container').innerHTML = '<h2>Conceptos predominantes</h2><br>';
            document.getElementById('container').appendChild(wordCloud);
            if (typeof tagcloud === "undefined") { // If object does not already exist
                tagcloud = TagCloud(tagContainer, words, options);  // Creates word cloud element 
             }
            button.setAttribute('class', "active");
        } else if (content === 'thermometer') {
            document.getElementById('container').innerHTML = '<h2>Termómetro emocional</h2>';
            document.getElementById('container').appendChild(container_frame);
            container_frame.style.display = "block";
            button.setAttribute('class', "active");
        } else if (content === 'images') {
            document.getElementById('container').innerHTML = '<h2>Imagen</h2><br>';
            document.getElementById('container').appendChild(image);
            button.setAttribute('class', "active");
        } else if (content === 'you-and-others') {
            document.getElementById('container').innerHTML = '<h2>Vos y el resto</h2><br>';
            button.setAttribute('class', "active");
        } else if (content === 'songs') {
            document.getElementById('container').innerHTML = '<h2>Canciones representativas</h2>';
            document.getElementById('container').appendChild(playlist_frame);
            //document.getElementById('container').appendChild(qr_image);
            playlist_frame.style.display = "block";
            //playlist_frame.setAttribute("src", "playlist.html"); // Set iframe source as playlist.html
            //playlist_frame.removeAttribute("hidden"); // Make iframe visible 
            button.setAttribute('class', "active");
        }
    });
});

document.getElementById('metadata-section').addEventListener('click', event => {
    // Prevent the default link behavior   
    event.preventDefault();
    // Redirect to playlist page
    document.getElementById('container').innerHTML = '<h2>Canciones representativas</h2>';
    document.getElementById('container').appendChild(playlist_frame);
    playlist_frame.style.display = "block";
});

// Get references to the mode tabs in the sidebar menu
const modeButtons = document.querySelectorAll('.sidebar button');

// Add a click event listener to each mode button
modeButtons.forEach(button => {
    button.addEventListener('click', event => {

        // Prevent the default link behavior
        event.preventDefault();

        // Set all buttons to "inactive"
        modeButtons.forEach(button => {
            button.setAttribute('class', '');
        });

        // Get the value of the "mode" attribute of the clicked button
        const mode = button.getAttribute('id');
        console.log(mode);
        
        // Update the content based on the selected mode
        if (mode === 'mode_1') {
            setData(0);
            button.setAttribute('class', "active");
        } else if (mode === 'mode_2') {
            setData(1);
            button.setAttribute('class', "active");
        };
    });
});

// Set data according to selected mode
setData(0); // Defaults to first mode
// Autoplay
audio.autoplay = true;

let modeSongsData = [];
let currentSong = 0;
//audio.src = playlist.children[currentSong].getAttribute("data-src");

async function getModeSongsData(id_mode){
    // Get playlist songs for selected mode and their metadata
    const object = {};
    object['id_melody_mode'] = id_melody_modes[id_mode]['id_melody_mode'];
    const modeJSON = JSON.stringify(object);
    const modeSongs = await get_mode_songs(modeJSON);
    const modeSongsData = await modeSongs.json();
    return modeSongsData;
}

async function setData(id_mode){
    
    // Get playlist songs for selected mode
    const object = {};
    object['id_melody_mode'] = id_melody_modes[id_mode]['id_melody_mode'];
    const modeJSON = JSON.stringify(object);
    const modeSongs = await get_mode_songs(modeJSON);
    modeSongsData = await modeSongs.json();
    //console.log(modeSongsData);
    // Initialization parameters
    setMetadata(0);
    setAudioFiles(id_melody_modes[id_mode]['id_melody_mode']);
    currentSong = 0;
    audio.src = playlist.children[currentSong].getAttribute("data-src");

    // Set id_melody_mode cookie (read by playlist.html)
    setCookie('id_melody_mode', id_melody_modes[id_mode]['id_melody_mode']);
    
    // Updates information displayed on website according to the selected mode.
    var word_list = userData['word_lists'][id_mode];                                                        // Get word list
    var encoded_image = userData['encoded_images'][id_mode];                                                // Get encoded image
    var embedding_path_folder = userData['embedding_path_folder'][id_mode];                                 // Get embeddings video
    var id_melody = userData['id_melody'][id_mode];                                                         // Get id_melody
    var alegria = userData['alegria'][id_mode];                                                             // Get "alegria"
    var tristeza = userData['tristeza'][id_mode];                                                           // Get "tristeza"
    var sorpresa = userData['sorpresa'][id_mode];                                                           // Get "sorpresa"
    var asco = userData['asco'][id_mode];                                                                   // Get "asco"
    var miedo = userData['miedo'][id_mode];                                                                 // Get "miedo"
    var enojo = userData['enojo'][id_mode];                                                                 // Get "enojo"
    //var otro = userData['otro'][id_mode];                                                                   // Get "otro"
    var pos = userData['pos'][id_mode];                                                                     // Get "pos"
    var neu = userData['neu'][id_mode];                                                                     // Get "neu"
    var neg = userData['neg'][id_mode];                                                                     // Get "neg"
    
    //audio.src = 'music/'.concat(id_melody,'.mp3')                                                     // Set melody to be played
    
    words = word_list                                                                                       // Set word list
    if (wordCloudButtonClicks >= 1) {
        if (typeof tagcloud != "undefined") {                                                               // If object exists
            tagcloud.destroy();                                                                             // destroy it
        }
        tagcloud = TagCloud(tagContainer, words, options);                                                  // and create new one
    };
    
    // Set emotional thermometer
    if (typeof container_frame != "undefined") {                                                            // If thermometer exists
        container_frame.remove();                                                                           // Destroy it
        container_frame = document.createElement('iframe');                                                 // And create new one
        container_frame.setAttribute("src", "thermometer.html?cache-buster=123");
        container_frame.style.width = "100%";
        container_frame.style.height = "1000px";
        container_frame.style.border = "none";
        container_frame.style.display = "block";
        container_frame.addEventListener('load', function() {
            var iframeDoc = container_frame.contentWindow.document;
            setThermometerValues(iframeDoc, alegria, tristeza, sorpresa, asco, miedo, enojo, pos, neu, neg);
        });
        
        var activeButton = null;                                                                            // Only render thermometer if active sidebar button is "thermometer"
        sidebarButtons.forEach(function(button) {
            if (button.getAttribute("class") === "active") {
              activeButton = button.getAttribute("id");
            }
        });
          
        if (activeButton) {
            console.log('The active button is:', activeButton);
          } else {
            console.log('No button is currently active.');
          }
        if (activeButton === "thermometer"){
            document.getElementById('container').appendChild(container_frame);
        }
        
    } else {
        container_frame = document.createElement('iframe');
        container_frame.setAttribute("src", "thermometer.html?cache-buster=123");
        container_frame.style.width = "100%";
        container_frame.style.height = "1000px";
        container_frame.style.border = "none";
        container_frame.style.display = "none";
        container_frame.addEventListener('load', function() {
            var iframeDoc = container_frame.contentWindow.document;
            setThermometerValues(iframeDoc, alegria, tristeza, sorpresa, asco, miedo, enojo, pos, neu, neg);
        });
    };
    

    image.src = 'data:image/png;base64,'.concat(encoded_image);                                             // Set image source

    // Set embeddings
    
    // Set playlist
    if (typeof playlist_frame != "undefined") {                                                             // If playlist exists
        playlist_frame.remove();                                                                            // destroy it
        playlist_frame = document.createElement('iframe');                                                  // and create new one
        playlist_frame.setAttribute("src", "playlist_mini.html");
        playlist_frame.style.width = "100%";
        playlist_frame.style.height = "1200px";
        playlist_frame.style.border = "none";
        playlist_frame.style.display = "block";

        var activeButton = null;                                                                            // Only render playlist if active sidebar button is "songs"
        sidebarButtons.forEach(function(button) {
            if (button.getAttribute("class") === "active") {
              activeButton = button.getAttribute("id");
            }
        });
          
        if (activeButton) {
            //console.log('The active button is:', activeButton);
          } else {
            //console.log('No button is currently active.');
          }
        if (activeButton === "songs"){
            document.getElementById('container').appendChild(playlist_frame);
        }
        
    } else {
        playlist_frame = document.createElement('iframe');
        playlist_frame.setAttribute("src", "playlist_mini.html");
        playlist_frame.style.width = "100%";
        playlist_frame.style.height = "1200px";
        playlist_frame.style.border = "none";
        playlist_frame.style.display = "none";

    };

};