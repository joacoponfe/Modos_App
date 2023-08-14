import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url, urlFront } from "./config.js";

// Get cookies
const id_participant = getCookie('id_participant');
//const id_melody_mode = getCookie('id_melody_mode');

// Get document elements, iframe and iframe document elements
const id_string = document.getElementById("id_string");
const toggleSwitch = document.getElementById("switch");
const mode_1_text = document.getElementById("mode_1_text");
const mode_2_text = document.getElementById("mode_2_text");

// Get color themes
const rootStyles = getComputedStyle(document.documentElement);
const main_colors = {'jonico': rootStyles.getPropertyValue('--bs-cyan'), 'dorico': rootStyles.getPropertyValue('--bs-yellow'), 'frigio': rootStyles.getPropertyValue('--bs-pink'), 'lidio': rootStyles.getPropertyValue('--bs-purple'), 'mixolidio': rootStyles.getPropertyValue('--bs-red'), 'eolico': rootStyles.getPropertyValue('--bs-orange'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green')};
const main_colors_transparent = {'jonico': rootStyles.getPropertyValue('--bs-cyan-transparent'), 'dorico': rootStyles.getPropertyValue('--bs-yellow-transparent'), 'frigio': rootStyles.getPropertyValue('--bs-pink-transparent'), 'lidio': rootStyles.getPropertyValue('--bs-purple-transparent'), 'mixolidio': rootStyles.getPropertyValue('--bs-red-transparent'), 'eolico': rootStyles.getPropertyValue('--bs-orange-transparent'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green-transparent')};


// Change information according to the selected mode
toggleSwitch.addEventListener('change', async function() {
    if (this.checked) {
        console.log("Toggle switch is mode_2");
        setData(1);
        setCookie('id_melody_mode', id_melody_modes[0]['id_melody_mode']);
    } else {
        console.log("Toggle switch is mode_1");
        setData(0);
        setCookie('id_melody_mode', id_melody_modes[1]['id_melody_mode']);
    }
});

function setThermometerValues(iframeDoc, alegria, tristeza, sorpresa, asco, miedo, enojo, pos, neu, neg, decimal_places=0){
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

    // Avoid percentage sum to be greater or smaller than 100%
    var alegria_redondeado = parseInt((alegria * 100).toFixed(decimal_places));
    var tristeza_redondeado = parseInt((tristeza * 100).toFixed(decimal_places));
    var sorpresa_redondeado = parseInt((sorpresa * 100).toFixed(decimal_places));
    var asco_redondeado = parseInt((asco * 100).toFixed(decimal_places));
    var miedo_redondeado = parseInt((miedo * 100).toFixed(decimal_places));
    var enojo_redondeado = parseInt((enojo * 100).toFixed(decimal_places));

    var emotions_redondeados = {'alegria': alegria_redondeado,'tristeza': tristeza_redondeado, 'sorpresa': sorpresa_redondeado, 'asco': asco_redondeado, 'miedo': miedo_redondeado, 'enojo': enojo_redondeado};
    var emotion_redondeado_sum = alegria_redondeado + tristeza_redondeado + sorpresa_redondeado + asco_redondeado + miedo_redondeado + enojo_redondeado;

    if (emotion_redondeado_sum > 100){
        // Get list of keys from emotions_redondeados sorted from smallest to largest value
        var emotions_redondeados_sorted_keys = Object.keys(emotions_redondeados).sort(function(a,b){return emotions_redondeados[a]-emotions_redondeados[b]});
        var emotions_redondeados_sorted_values = emotions_redondeados_sorted_keys.map(function(x){return emotions_redondeados[x]});
        // Subtract from each value in emotions_redondeados_sorted_values, starting from the smallest to the largest, until sum is exactly 100, and never go below 0 for any emotion
        var subtract = emotion_redondeado_sum - 100;
        for (var i = 0; i < emotions_redondeados_sorted_values.length; i++){
            var emotion = emotions_redondeados_sorted_values[i];
            if (emotion - subtract >= 0){
                emotions_redondeados_sorted_values[i] -= subtract;
                break;
            } else {
                subtract -= emotion;
                emotions_redondeados_sorted_values[i] = 0;
            };
        };
        // Update emotions_redondeados
        for (var i = 0; i < emotions_redondeados_sorted_keys.length; i++){
            var key = emotions_redondeados_sorted_keys[i];
            emotions_redondeados[key] = emotions_redondeados_sorted_values[i];
        };
        // Update emotion_redondeado_sum
        emotion_redondeado_sum = emotions_redondeados['alegria'] + emotions_redondeados['tristeza'] + emotions_redondeados['sorpresa'] + emotions_redondeados['asco'] + emotions_redondeados['miedo'] + emotions_redondeados['enojo'];
    } if (emotion_redondeado_sum < 100){
        // Get list of keys from emotions_redondeados sorted from largest to smallest value
        var emotions_redondeados_sorted_keys = Object.keys(emotions_redondeados).sort(function(a,b){return emotions_redondeados[b]-emotions_redondeados[a]});
        var emotions_redondeados_sorted_values = emotions_redondeados_sorted_keys.map(function(x){return emotions_redondeados[x]});
        // Add to each value in emotions_redondeados_sorted_values, starting from the largest to the smallest, until sum is exactly 100, and never go above 100 for any emotion
        var add = 100 - emotion_redondeado_sum;
        for (var i = 0; i < emotions_redondeados_sorted_values.length; i++){
            var emotion = emotions_redondeados_sorted_values[i];
            if (emotion + add <= 100){
                emotions_redondeados_sorted_values[i] += add;
                break;
            } else {
                add -= (100 - emotion);
                emotions_redondeados_sorted_values[i] = 100;
            };
        };
        // Update emotions_redondeados
        for (var i = 0; i < emotions_redondeados_sorted_keys.length; i++){
            var key = emotions_redondeados_sorted_keys[i];
            emotions_redondeados[key] = emotions_redondeados_sorted_values[i];
        };
        // Update emotion_redondeado_sum
        emotion_redondeado_sum = emotions_redondeados['alegria'] + emotions_redondeados['tristeza'] + emotions_redondeados['sorpresa'] + emotions_redondeados['asco'] + emotions_redondeados['miedo'] + emotions_redondeados['enojo'];
    };

    var pos_redondeado = parseInt((pos * 100).toFixed(decimal_places));
    var neu_redondeado = parseInt((neu * 100).toFixed(decimal_places));
    var neg_redondeado = parseInt((neg * 100).toFixed(decimal_places));

    var valence_redondeados = [pos_redondeado, neu_redondeado, neg_redondeado];
    var valence_redondeados_sum = pos_redondeado + neu_redondeado + neg_redondeado;

    if (valence_redondeados_sum > 100){
        // Get minimum value
        var min_value = Math.min(pos, neu, neg);
        // Get index of minimum value
        var min_index = [pos, neu, neg].indexOf(min_value);
        var subtract = valence_redondeados_sum - 100;
        // Subtract from minimum value
        valence_redondeados[min_index] -= subtract;
        // Update valence_redondeados_sum
        valence_redondeados_sum = valence_redondeados[0] + valence_redondeados[1] + valence_redondeados[2];
    } if (valence_redondeados_sum < 100){
        // Get maximum value
        var max_value = Math.max(pos, neu, neg);
        // Get index of maximum value
        var max_index = [pos, neu, neg].indexOf(max_value);
        var add = 100 - valence_redondeados_sum;
        // Add to maximum value
        valence_redondeados[max_index] += add;
        // Update valence_redoneados_sum
        valence_redondeados_sum = valence_redondeados[0] + valence_redondeados[1] + valence_redondeados[2];
    };

    alegria_value.innerHTML = emotions_redondeados['alegria'].toString().concat("%");
    tristeza_value.innerHTML = emotions_redondeados['tristeza'].toString().concat("%");
    sorpresa_value.innerHTML = emotions_redondeados['sorpresa'].toString().concat("%");
    asco_value.innerHTML = emotions_redondeados['asco'].toString().concat("%");
    miedo_value.innerHTML = emotions_redondeados['miedo'].toString().concat("%");
    enojo_value.innerHTML = emotions_redondeados['enojo'].toString().concat("%");

    pos_value.innerHTML = valence_redondeados[0].toString().concat("%");
    neu_value.innerHTML = valence_redondeados[1].toString().concat("%");
    neg_value.innerHTML = valence_redondeados[2].toString().concat("%");

    // If any of the three valence values is below 5%, do not display the text or the label
    if (valence_redondeados[0] < 5){
        pos_value.innerHTML = "";
        var pos_label = iframeDoc.getElementById("pos-label");
        pos_label.innerHTML = "";
    } else if (valence_redondeados[1] < 5){
        neu_value.innerHTML = "";
        var neu_label = iframeDoc.getElementById("neu-label");
        neu_label.innerHTML = "";
    } else if (valence_redondeados[2] < 5){
        neg_value.innerHTML = "";
        var neg_label = iframeDoc.getElementById("neg-label");
        neg_label.innerHTML = "";
    };

    // Get the stylesheet containing the animation rules
    var stylesheet = iframeDoc.styleSheets[0];
    
    // Find the animation rule we want to modify
    const emotionRuleNames = ['alegria-bar', 'tristeza-bar', 'sorpresa-bar', 'asco-bar', 'miedo-bar', 'enojo-bar'];
    const emotionPercentages = [alegria, tristeza, sorpresa, asco, miedo, enojo];
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
                    // var shadow_inset = (1-emotionPercentage)*100;
                    // keyframe.style.boxShadow = `inset -${shadow_inset}em 0 0 0 #f7f7f7`;
                    var width = emotionPercentage*100;
                    keyframe.style.width = `${width}%`;
                };
            };
        };

    };

    const sentimentRuleNames = ['positive-bar', 'neutral-bar', 'negative-bar'];
    const sentimentPercentages = [pos, neu, neg];
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
const object = {'id_participant': id_participant};
const idJSON = JSON.stringify(object);
console.log(idJSON);

// Get individual data
async function get_totems_data(id_data) {
    const response = await fetch(
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

// Set user data
const userData = await get_totems_data(idJSON).then(response => response.json());
console.log(userData);

// If no data is found, change intro-text
if (userData['id_melody'].length === 0){
    const intro_text = document.getElementById("intro-text");
    intro_text.innerHTML = "No registramos suficientes palabras en tu texto <br> para hacer el análisis <br><br> Te invitamos a participar de nuevo";
    // Display text "Esta página se cerrará dentro de X segundos"
    var timer = document.createElement("div");
    timer.id = "timer";
    document.getElementById('container').appendChild(timer);
    var seconds = 15;
    var x = setInterval(function() {
        seconds -= 1;
        if (seconds <= 10) {
            document.getElementById("timer").innerHTML = "Esta página se cerrará dentro de ".concat(seconds.toString(), " segundos");
        }
        if (seconds < 0) {
            clearInterval(x);
            window.location.href = "totems_access.html";
        }
    }
    , 1000);
};

// Get melody mode names
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

// Get collective data
async function get_collective_data(id_melody_mode) {
    const response = await fetch(
        url + "/profiles_api/mode_data/",
        {
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: "POST",
            body: id_melody_mode,
        }
    );
    const result = await response;
    return result;
}

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

// Get collective data
const collectiveData_1 = await get_collective_data(JSON.stringify(id_melody_1_mode)).then(response => response.json());
const collectiveData_2 = await get_collective_data(JSON.stringify(id_melody_2_mode)).then(response => response.json());
const collectiveData = [collectiveData_1, collectiveData_2];
console.log(collectiveData);

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

// Set texts on toggle switch
mode_1_text.innerHTML = id_melody_1_mode_tildes['id_melody_mode'];
mode_2_text.innerHTML = id_melody_2_mode_tildes['id_melody_mode'];


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
    // If sheet music is playing, send message to parent window to stop sheet music playback
    try {
        sheet_frame.contentWindow.postMessage({'message': 'stopScore'}, '*');
    } catch (error) {
        // Nothing
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
    // If sheet music is playing, send message to parent window to stop sheet music playback
    try {
        sheet_frame.contentWindow.postMessage({'message': 'stopScore'}, '*');
    } catch (error) {
        // Nothing
    }
});
  
next.addEventListener("click", () => {
    currentSong++;
    if (currentSong === playlist.children.length) {
      currentSong = 0;
    }
    audio.src = playlist.children[currentSong].getAttribute("data-src");
    audio.play();
    setActiveSong(currentSong);
    // If sheet music is playing, send message to parent window to stop sheet music playback
    try {
        sheet_frame.contentWindow.postMessage({'message': 'stopScore'}, '*');
    } catch (error) {
        // Nothing
    }
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
    sendMetadata(index);
};

function sendMetadata(currentSong) {
    // Sends metadata to playlist page.
    const metadata = {'index' : currentSong, 'title': modeSongsData['titulos'][currentSong], 'artist': modeSongsData['artistas'][currentSong], 'album': modeSongsData['albumes'][currentSong], 'year': modeSongsData['anios'][currentSong], 'album-art': 'data:image/png;base64,'.concat(modeSongsData['encoded_images'][currentSong])};
    console.log(metadata);
    if (playlist_frame.contentWindow != null) { 
        playlist_frame.contentWindow.postMessage(metadata, '*');
    }
};

// Listen for messages from the iframes (song change from playlist iframe or play, pause, stop events from sheet iframe)
window.addEventListener('message', function(event) {
    if (event.origin === urlFront) {
      console.log(event.data['message']);
        if (event.data['message'] === 'songChange'){
        currentSong = event.data['currentSong'];
        audio.src = playlist.children[currentSong].getAttribute("data-src");
        audio.play();
        setActiveSong(currentSong);
      } else if (event.data['message'] === 'play') {
        console.log('User has played audio on sheet music iframe.')
        // Stop music from playlist
        audio.pause();
        playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
    }
});

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

// create sheet music iframe
var sheetURL;
var sheetID;
var sheet_frame = document.createElement('iframe'); 
var mode_text;
var textContainer;
var mode_text_0 = document.createElement('h5');
var mode_text_1 = document.createElement('h5');
var mode_text_2 = document.createElement('h5');
var mode_text_3 = document.createElement('h5');


const sheet_frame_container = document.createElement('div');
sheet_frame_container.classList.add('sheet_frame_container');
// var embed = new Flat.Embed(sheet_frame_container, {
//     embedParams: {
//         appId: '64c7f55e192e39aaabfb5b43',
//         branding: false,
//         themeScoreBackground: 'transparent',
//         layout: 'track',
//         themeControlsBackground: '#162331',
//         locale: 'es',
//         }
// });

// create embeddings video elements
var video_path;
var distance_text;
const embeddings_video_container = document.createElement('div');
embeddings_video_container.classList.add("embeddings_video_container");
const embeddings_video = document.createElement('video');
embeddings_video_container.appendChild(embeddings_video);

var distanceTextContainer = document.createElement('div');
distanceTextContainer.classList.add("distanceText");

var refContainer = document.createElement('div');
refContainer.classList.add("refContainer");
refContainer.innerHTML = '<img src="assets/images/singularidad_star.png" style="width:100px; height:100px; margin-right:0px" alt="Image 1"><label for="label1" style="margin-right:auto;">Vos</label>  <img src="assets/images/singularidad_constelacion.png" style="width:100px; height:100px; margin-right:30px;" alt="Image 2"><label for="label2" style="margin-right:50px">El resto</label> <br> <img src="assets/images/singularidad_star.png" style="width:100px; height:100px"' 
//document.getElementById('container').appendChild(refContainer);

var refBars = document.createElement('div');
refBars.classList.add("refBars");
refBars.innerHTML = '<img src="assets/images/barras_ref.png">';

// Create container for embeddings, references and phrases
const embeddings_container = document.createElement('div');
embeddings_container.classList.add('embeddings_container');
embeddings_container.appendChild(embeddings_video_container);
embeddings_container.appendChild(refContainer);
embeddings_container.appendChild(distanceTextContainer);
embeddings_container.appendChild(refBars);


// Create individual Word Cloud element
const wordCloud = document.createElement("span");
wordCloud.classList.add('tagcloud');
const tagContainer = '.tagcloud';
const options = {radius:300, maxSpeed:'normal', initSpeed:'normal', direction:135, keep:true, maxFontSize:50};
var individualWords = userData['word_lists'][0];
var tagcloud;

// Create collective Word Cloud element
const collectiveWordCloud = document.createElement("span");
collectiveWordCloud.classList.add('tagcloud2');
const collectiveTagContainer = '.tagcloud2';
const collectiveWordCloudOptions = {radius:200, maxSpeed:'normal', initSpeed:'normal', direction:135, keep:true, maxFontSize:20};
var collectiveWords = collectiveData_1['word_lists'];
var collectiveTagcloud;

// Create container for 'VOS' and 'EL RESTO' labels
const vosElResto = document.createElement('div');
const vos = document.createElement('h3');
const elResto = document.createElement('h3');
vos.innerHTML = 'VOS';
elResto.innerHTML = 'EL RESTO';
vosElResto.classList.add('vosElResto');
vosElResto.appendChild(vos);
vosElResto.appendChild(elResto);

// Create container for both Word Clouds
const wordClouds = document.createElement('div');
wordClouds.classList.add('wordClouds');
wordClouds.appendChild(wordCloud);
wordClouds.appendChild(collectiveWordCloud);

// Create individual emotional thermometer element
//var container_frame;
var container_frame = document.createElement('iframe'); 

// Create collective emotional thermometer element
//var collectiveThermometerFrame;
var collectiveThermometerFrame = document.createElement('iframe');

// Create container for both thermometers
const thermometers = document.createElement('div');
thermometers.classList.add('thermometers');
thermometers.appendChild(container_frame);
thermometers.appendChild(collectiveThermometerFrame);
//thermometers.appendChild(container_frame);
//thermometers.appendChild(collectiveThermometerFrame);

// Create flip card element for individual image
const flip_card = document.createElement('div');
flip_card.classList.add('flip-card');
const flip_card_inner = document.createElement('div');
flip_card_inner.classList.add('flip-card-inner');
const flip_card_front = document.createElement('div');
flip_card_front.classList.add('flip-card-front');
const flip_card_back = document.createElement('div');
flip_card_back.classList.add('flip-card-back');
flip_card_inner.appendChild(flip_card_front);
flip_card_inner.appendChild(flip_card_back);
flip_card.appendChild(flip_card_inner);

// Create back of card element
const back_image = document.createElement('img');
back_image.src = "assets/images/flip_card_back.png";
back_image.style.width = "625px";
back_image.style.borderRadius = "10px";
flip_card_back.appendChild(back_image);

// Create image element
const image = document.createElement('img');
image.classList.add('image');
image.style.width = "625px";
image.style.borderRadius = "10px";
image.alt = "No se encontró la imagen.";
flip_card_front.appendChild(image);

// Create collective image elements and flip cards
const collective_image_1 = document.createElement('img');
const collective_image_2 = document.createElement('img');
const collective_image_3 = document.createElement('img');
const collective_image_4 = document.createElement('img');

const flip_card_1 = document.createElement('div');
const flip_card_2 = document.createElement('div');
const flip_card_3 = document.createElement('div');
const flip_card_4 = document.createElement('div');

const flip_card_inner_1 = document.createElement('div');
const flip_card_inner_2 = document.createElement('div');
const flip_card_inner_3 = document.createElement('div');
const flip_card_inner_4 = document.createElement('div');

const flip_card_front_1 = document.createElement('div');
const flip_card_front_2 = document.createElement('div');
const flip_card_front_3 = document.createElement('div');
const flip_card_front_4 = document.createElement('div');

const flip_card_back_1 = document.createElement('div');
const flip_card_back_2 = document.createElement('div');
const flip_card_back_3 = document.createElement('div');
const flip_card_back_4 = document.createElement('div');

const collective_images = [collective_image_1, collective_image_2, collective_image_3, collective_image_4];
const flip_cards = [flip_card_1, flip_card_2, flip_card_3, flip_card_4];
const flip_card_inners = [flip_card_inner_1, flip_card_inner_2, flip_card_inner_3, flip_card_inner_4];
const flip_card_fronts = [flip_card_front_1, flip_card_front_2, flip_card_front_3, flip_card_front_4];
const flip_card_backs = [flip_card_back_1, flip_card_back_2, flip_card_back_3, flip_card_back_4];

for (let i = 0; i < collective_images.length; i++){
    collective_images[i].classList.add('collective_image');
    flip_cards[i].classList.add('flip-card');
    flip_card_inners[i].classList.add('flip-card-inner');
    flip_card_fronts[i].classList.add('flip-card-front');
    flip_card_backs[i].classList.add('flip-card-back');
    flip_card_inners[i].appendChild(flip_card_fronts[i]);
    flip_card_inners[i].appendChild(flip_card_backs[i]);
    flip_cards[i].appendChild(flip_card_inners[i]);
    flip_card_fronts[i].appendChild(collective_images[i]);
};

// collective_image_1.classList.add('collective_image');
// collective_image_2.classList.add('collective_image');
// collective_image_3.classList.add('collective_image');
// collective_image_4.classList.add('collective_image');

// flip_card_1.classList.add('flip-card');
// flip_card_2.classList.add('flip-card');
// flip_card_3.classList.add('flip-card');
// flip_card_4.classList.add('flip-card');

// flip_card_inner_1.classList.add('flip-card-inner');
// flip_card_inner_2.classList.add('flip-card-inner');
// flip_card_inner_3.classList.add('flip-card-inner');
// flip_card_inner_4.classList.add('flip-card-inner');

// flip_card_front_1.classList.add('flip-card-front');
// flip_card_front_2.classList.add('flip-card-front');
// flip_card_front_3.classList.add('flip-card-front');
// flip_card_front_4.classList.add('flip-card-front');

// flip_card_back_1.classList.add('flip-card-back');
// flip_card_back_2.classList.add('flip-card-back');
// flip_card_back_3.classList.add('flip-card-back');
// flip_card_back_4.classList.add('flip-card-back');

// flip_card_inner_1.appendChild(flip_card_front_1);
// flip_card_inner_1.appendChild(flip_card_back_1);
// flip_card_1.appendChild(flip_card_inner_1);
// flip_card_front_1.appendChild(collective_image_1);

// Create container for images (individual and collective)
const collective_images_container = document.createElement('div');
collective_images_container.classList.add('collective_images_container');
collective_images_container.appendChild(collective_image_1);
collective_images_container.appendChild(collective_image_2);
collective_images_container.appendChild(collective_image_3);
collective_images_container.appendChild(collective_image_4);
// collective_images_container.appendChild(flip_card_1);
// collective_images_container.appendChild(flip_card_2);
// collective_images_container.appendChild(flip_card_3);
// collective_images_container.appendChild(flip_card_4);


const images_container = document.createElement('div');
images_container.classList.add('images_container');
images_container.appendChild(image);
//images_container.appendChild(flip_card);
images_container.appendChild(collective_images_container);

// Create QR code image element
const qr_image = document.createElement('img');
qr_image.style.maxWidth = "100%";
qr_image.alt = "No se encontró el código QR.";

// Create playlist element
var playlist_frame;

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
            // set iframe src to sheet music URL
            document.getElementById('container').innerHTML =  "<h2>Acerca del modo</h2><span>Transcribimos la melodía que escuchaste. Volvé a oírla y conocé más sobre este modo.<span>";
            sheet_frame.setAttribute('src', 'score.html');
            sheet_frame.setAttribute("allowtransparency", "true");
            sheet_frame.style.width = "100%";
            sheet_frame.style.height = "360px";
            sheet_frame.style.marginTop = "20px";
            sheet_frame.style.border = "none";
            sheet_frame.style.display = "block";
            // Send sheet ID to iframe
            sheet_frame.onload = function() {
                sheet_frame.contentWindow.postMessage({'message': 'changeScore', 'sheetID': sheetID}, '*');
            };

            
            //sheet_frame_container.appendChild(sheet_frame);
            // var embed = new Flat.Embed(sheet_frame_container, {
            //     score: sheetID,
            //     embedParams: {
            //         appId: '64c7f55e192e39aaabfb5b43',
            //         branding: false,
            //         themeScoreBackground: 'transparent',
            //         layout: 'track',
            //         themeControlsBackground: '#162331',
            //         locale: 'es',
            //         }
            // });

            // console.log(embed);
            // embed.on('play', function () {
            //     console.log('User has started playing audio.');
            // });
            

            // // Set embed element style border radius to 10 px
            // embed.element.style.borderRadius = "10px";

            // embed.element.onplay = function () {
            //     // The score is playing
            //     alert('the score is playing');
            //     // Pause the music from playlist
            //     playlist_frame.contentWindow.postMessage('pause', '*');
            // };


            //iframe.setAttribute('style', 'borderRadius: 10px;');
            // embed.play().then(function () {
            //     // The score is playing
            //     alert('the score is playing');
            // });

            //document.getElementById('container').appendChild(sheet_frame_container);
            document.getElementById('container').appendChild(sheet_frame);
            //sheet_frame.style.display = "block";

            // sheet_frame.setAttribute("src", sheetURL);
            // sheet_frame.setAttribute("height", "350");
            // sheet_frame.setAttribute("width", "100%");
            // sheet_frame.setAttribute("style", "border-radius: 10px;");
            // sheet_frame.setAttribute("frameBorder", "0");
            // sheet_frame.setAttribute("allowfullscreen", "allowfullscreen");
            // sheet_frame.setAttribute("allow", "autoplay; midi");

            // add text to the webpage below 
            textContainer = document.createElement('div');
            textContainer.classList.add('mode_text_container');
            textContainer.appendChild(mode_text_0);
            textContainer.appendChild(mode_text_1);
            textContainer.appendChild(mode_text_2);
            textContainer.appendChild(mode_text_3);
            //textContainer.innerHTML = "<br> <h4> " + mode_text + "</h4> ";
            document.getElementById('container').appendChild(textContainer);
            // document.getElementById('container').innerHTML += '<iframe src="' + sheetURL + '" height="450" width="100%" frameBorder="0" allowfullscreen allow="autoplay; midi"></iframe>';
            button.setAttribute('class', 'active');
        } else if (content === 'wordcloud') {
            document.getElementById('container').innerHTML = '<h2>Conceptos</h2><span>Identificamos los conceptos clave de tu texto.</span>';
            document.getElementById('container').appendChild(vosElResto);
            document.getElementById('container').appendChild(wordClouds);
            if (typeof tagcloud === "undefined") { // If object does not already exist
                tagcloud = TagCloud(tagContainer, individualWords, options);  // Creates word cloud element
            }
            if (typeof collectiveTagcloud === "undefined") { // If object does not already exist
                collectiveTagcloud = TagCloud(collectiveTagContainer, collectiveWords, collectiveWordCloudOptions);  // Creates word cloud element
            }
            button.setAttribute('class', "active");
        } else if (content === 'thermometer') {
            document.getElementById('container').innerHTML = '<h2>Emociones</h2><span>Medimos la intensidad de las emociones que sentiste al escuchar la melodía.</span>';
            document.getElementById('container').appendChild(vosElResto);
            document.getElementById('container').appendChild(thermometers);
            // document.getElementById('thermometers').appendChild(container_frame);
            // document.getElementById('thermometers').appendChild(collectiveThermometerFrame);
            container_frame.style.display = "block";
            collectiveThermometerFrame.style.display = "block";
            button.setAttribute('class', "active");
        } else if (content === 'images') {
            document.getElementById('container').innerHTML = '<h2>Imagen</h2><span>Captamos esta imagen de tu cabeza. ¿Coincide con lo que te imaginaste?</span>';
            document.getElementById('container').appendChild(vosElResto);
            document.getElementById('container').appendChild(images_container);
            //document.getElementById('container').appendChild(image);
            //document.getElementById('container').appendChild(collective_images_container);
            button.setAttribute('class', "active");
        } else if (content === 'you-and-others') {
            document.getElementById('container').innerHTML = '<h2>Singularidad</h2><span>Calculamos la similitud entre tu respuesta y las del resto de las personas.</span>';
            document.getElementById('container').appendChild(embeddings_container);
            // Video
            //document.getElementById('container').appendChild(embeddings_video_container);
            embeddings_video.play();
            // References
            //var refContainer = document.createElement('div');
            //refContainer.classList.add("refContainer");
            //refContainer.innerHTML = '<img src="assets/images/singularidad_star.png" style="width:100px; height:100px;" alt="Image 1"><label for="label1" style="margin-right:50px;">Vos</label>  <img src="assets/images/singularidad_constelacion.png" style="width:100px; height:100px; margin-right:10px;" alt="Image 2"><label for="label2" style="margin-right:50px">El resto</label> <br> <img src="assets/images/singularidad_star.png" style="width:100px; height:100px"' 
            //document.getElementById('container').appendChild(refContainer);
            // Text
            //distanceTextContainer.innerHTML = distance_text;
            //document.getElementById('container').appendChild(distanceTextContainer);
            button.setAttribute('class', 'active');
        } else if (content === 'songs') {
            document.getElementById('container').innerHTML = '<h2>Canciones</h2><span>Recopilamos canciones de distintos géneros que utilizan este modo.</span>';
            document.getElementById('container').appendChild(playlist_frame);
            playlist_frame.style.display = "block";
            playlist_frame.onload = function() {	
                sendMetadata(currentSong);
            };
            button.setAttribute('class', "active");
            console.log(currentSong);
            
        } else if (content === 'exit') {
            button.setAttribute('class', "active"); 
            document.getElementById('container').innerHTML = '<div style="margin-top:300px; text-align:center"><p style="font-size:2em; text-align:center">¿Querés salir?</p><a id="exit-yes" class="btn-exit" href="totems_landing.html">Sí</a><a id="exit-no" class="btn-exit" href="totems_main.html">No</a></div>'
            var countdown = document.createElement('div');
            document.getElementById('container').appendChild(countdown);
            var timeleft = 5;
            if (button.getAttribute('class')==='active'){
                setInterval(function(){
                    if(timeleft <= 0 && button.getAttribute('class')==='active'){
                        window.location.href = "totems_landing.html";
                    } else {  
                        countdown.innerHTML = '<p style="font-size:1.6em; text-align:center; margin-top:25px">Esta sesión se cerrará en ' + `${timeleft}` + ' segundos</p>'
                    }
                    if (button.getAttribute('class')==='active'){
                        timeleft -= 1;
                    } else {
                        timeleft = 5;
                    }
                  }, 1000);
                }
        }
    });
});

// Redirect to playlist page when clicking on metadata section of miniplayer
document.getElementById('metadata-section').addEventListener('click', event => {
    // Prevent the default link behavior   
    event.preventDefault();
    // Redirect to playlist page
    document.getElementById('container').innerHTML = '<h2>Canciones</h2><span>Recopilamos canciones de distintos géneros que utilizan este modo</span>';
    document.getElementById('container').appendChild(playlist_frame);
    playlist_frame.style.display = "block";
    playlist_frame.onload = function() {	
        sendMetadata(currentSong);
    };
    // Set all buttons to "inactive" and then set playlist button to "active"
    sidebarButtons.forEach(button => {
        button.setAttribute('class', '');
    });
    document.getElementById("songs").setAttribute('class', 'active');
});

// Set data according to selected mode
setData(0); // Defaults to first mode
// Autoplay audio
audio.autoplay = true;

let modeSongsData = [];
let currentSong = 0;
audio.src = playlist.children[currentSong].getAttribute("data-src");

async function getModeSongsData(userData, id_mode){
    // Get playlist songs for selected mode and their metadata
    const object = {};
    object['id_melody_mode'] = id_melody_modes[id_mode]['id_melody_mode'];
    const modeJSON = JSON.stringify(object);
    const modeSongs = await get_mode_songs(modeJSON);
    const modeSongsData = await modeSongs.json();
    return modeSongsData;
}

function getsheetMusicURLs(id_melody){
    // this function maps the melody number to the corresponding sheet music URL
    // define a dictionary object that maps melody numbers to sheet music URLs:
    // define a dictionary that has 7 empty entries each written on a seperate line of code
    const sheetMusicURLs = {'j1': '6474c8058acf87912684ecdd', 
                            'd1': '6474c805fd74836107c2b9d3',
                            'e1': '6474c8165bdbfe13645be0a9',
                            'f1': '6474c81009c5ae72a2732286',
                            'li1': '6474c80bfd74836107c2ba82',
                            'lo1': '6474c80b8acf87912684ed72',
                            'm1': '6474c810bb924612e524371a',
                            'j2': '6474c819bb924612e52437dd', 
                            'd2': '6474c816bb924612e52437a4',
                            'e2': '6474c8211684fd086b6ed8b1',
                            'f2': '6474c8215bdbfe13645be1ed',
                            'li2': '6474c81c8acf87912684eee8',
                            'lo2': '6474c8199ba7d68e053993a3',
                            'm2': '6474c81c5bdbfe13645be154',
                            'j3': '6475eff66438c0562a5588bb', 
                            'd3': '6475eff6caa146ae4c9a6a45',
                            'e3': '6475eff13c32afab16905c3a',
                            'f3': '6475effe35fd81b830086392',
                            'li3': '6475eff999f206a2aae8e02c',
                            'lo3': '6475eff93c32afab16905cc1',
                            'm3': '6475eff02c779769340a2fa3',
                            'j4': '6475f0013efd8647a7287fe1',
                            'd4': '6475f007b42e498bcfb77c1e',
                            'e4': '6475f0054bed9084450a4d2c',
                            'f4': '6475f00425ef19ce6b466ade',
                            'li4': '6475f001dae23f88df88d8d9',
                            'lo4': '6475f0083efd8647a7288051',
                            'm4': '6475effe3c32afab16905d24',
                            'j5': '6475f16925ef19ce6b468bdc',
                            'd5': '6475f1774c7e46a3fbb6a0c5',
                            'e5': '6475f1724c7e46a3fbb6a04e',
                            'f5': '6475f172ca54dfbf6d82ee35',
                            'li5': '6475f16c3c32afab169081f9',
                            'lo5': '6475f16acaa146ae4c9a8d45',
                            'm5': '6475f16d25ef19ce6b468c56',
                            'j6': '6475f17a6438c0562a55abf1',
                            'd6': '6475f17725ef19ce6b468d47',
                            'e6': '6475f1832c779769340a54d1',
                            'f6': '6475f18225ef19ce6b468e3d',
                            'li6': '6475f17d351ecd6e91917424',
                            'lo6': '6475f17acaa146ae4c9a8eab',
                            'm6': '6475f17e25ef19ce6b468dbe',
                            'j7': '64764f8425ef19ce6b4f3b20',
                            'd7': '64764f60b42e498bcfc03d07',
                            'e7': '64764f60ca54dfbf6d8b9014',
                            'f7': '64764f793c32afab16993b25',
                            'li7': '64764f81d7d2035e10ddff7a',
                            'lo7': '64764f68caa146ae4ca32f5d',
                            'm7': '64764f656438c0562a5e5c9f',
                        }

    return sheetMusicURLs[id_melody];
}

function getVideoPath(id_melody_mode, distance){
    // this function concatanates 'assets/videos/' with the mode and distance to get the video path
    // if distance is less than 0.2, set distance to 0.2, else if distance is less than 0.4 set distance to 0.4 etc
    console.log('%%%%%%%distance%%%%%%%%%');
    console.log(distance);

    if (distance < 0.1){
        distance = "0.1";
    } else if (distance < 0.2){
        distance = "0.2";
    } else if (distance < 0.3){
        distance = "0.3";
    } else if (distance < 0.4){
        distance = "0.4";
    } else if (distance < 0.5){
        distance = "0.5";
    } else if (distance < 0.6){
        distance = "0.6";
    } else if (distance < 0.7){
        distance = "0.7";
    } else if (distance < 0.8){
        distance = "0.8";
    } else if (distance < 0.9){
        distance = "0.9"; 
    } else if (distance <= 2.0){  
        distance = "1";
    } else {
        distance = "0.4";
    }

    return 'assets/videos/'.concat(id_melody_mode, '/distance_',distance,'.mp4');
}

function getDistanceText(distance){
    // this function returns the text to be displayed in the distance section
    if (distance < 0.2){
        return '¡Tu mente refleja la <br> conciencia musical colectiva!'
    } else if (distance < 0.4){
        return '¡Tu mente se acerca a la <br> conciencia musical colectiva!'
    } else if (distance < 0.6){
        return '¡Tu experiencia musical es, <br> a la vez, común y única!'
    } else if (distance < 0.8){
        return '¡Vivís la música <br> de manera particular!'
    } else if (distance < 1.0){
        return '¡Vivís la música de forma <br> totalmente única!'
    } else {
        return '¡Tu mente refleja la <br> conciencia musical colectiva!'
    }

}

function getModeText(id_melody_mode){
    // this function returns the text to be displayed in the mode section
    if (id_melody_mode === 'jonico'){
        //return '<ul><li>Muy empleado en la música occidental, en múltiples géneros.</li><li>Único modo griego mayor con séptima mayor y cuarta natural.</li><li>Históricamente vinculado con ‘dulzura’, ‘encanto’, ‘alegría’ y ‘placer’.</li><li>Suele emplearse para comunicar emociones positivas.</li></ul>';
        return ['Muy empleado en la música occidental, <br> en múltiples géneros.', 'Único modo griego mayor <br> con séptima mayor y cuarta natural.', 'Históricamente vinculado <br> con ‘dulzura’, ‘encanto’, ‘alegría’ y ‘placer’.', 'Suele emplearse <br> para comunicar emociones positivas.'];
    } else if (id_melody_mode === 'dorico'){
        //return '<ul><li>Muy común en el rock, el jazz, el funk y el pop.</li><li>Único modo griego menor con sexta natural.</li><li>Históricamente vinculado con ‘seriedad’, ‘brillantez’, ‘constancia’ y ‘virtud’.</li><li>Muy utilizado para comunicar emociones positivas y sensaciones lúdicas.</li></ul>';
        return ['Muy común en el rock, el jazz, el funk <br> y el pop.', 'Único modo griego menor <br> con sexta natural.', 'Históricamente vinculado <br> con ‘seriedad’, ‘brillantez’, ‘constancia’ y ‘virtud’.', 'Muy utilizado para comunicar emociones positivas y sensaciones lúdicas.'];
    } else if (id_melody_mode === 'frigio'){
        //return '<ul><li>Común en el metal y algunos subgéneros del flamenco.</li><li>Único modo griego menor con segunda menor y quinta natural.</li><li>Históricamente vinculado a ‘dureza, ‘ira’, ‘crueldad’ y ‘lamento’.</li><li>Muy utilizado para comunicar emociones negativas y para generar tensión.</li></ul>';
        return ['Común en el metal <br> y algunos subgéneros del flamenco.', 'Único modo griego menor <br> con segunda menor y quinta natural.', 'Históricamente vinculado <br> a ‘dureza, ‘ira’, ‘crueldad’ y ‘lamento’.', 'Muy utilizado para comunicar emociones negativas y para generar tensión.'];
    } else if (id_melody_mode === 'lidio'){
        //return '<ul><li>Suele emplearse para generar climas particulares en el rock y la música de cine.</li><li>Único modo griego mayor con séptima mayor y cuarta aumentada.</li><li>Históricamente vinculado a ‘simplicidad’, ‘modestia’, ‘suavidad’ y ‘superación’.</li><li>Muy utilizado para comunicar emociones positivas y sensaciones oníricas.</li></ul>';
        return ['Suele emplearse para generar <br> climas particulares en el rock <br> y la música de cine.', 'Único modo griego mayor <br> con séptima mayor y cuarta aumentada.', 'Históricamente vinculado <br> a ‘simplicidad’, ‘modestia’, ‘suavidad’ <br> y ‘superación’.', 'Muy utilizado para comunicar <br> emociones positivas y sensaciones oníricas.'];
    } else if (id_melody_mode === 'mixolidio'){
        //return '<ul><li>Común en el rock, el blues y el funk.</li><li>Único modo griego mayor con séptima menor.</li><li>Históricamente vinculado a ‘entusiasmo’, ‘suavidad’ y ‘lujuria’.</li><li>Muchos artistas lo emplean para comunicar emociones positivas.</li></ul>';
        return ['Común en el rock, el blues y el funk.', 'Único modo griego mayor <br> con séptima menor.', 'Históricamente vinculado <br> a ‘entusiasmo’, ‘suavidad’ y ‘lujuria’.', 'Muchos artistas lo emplean <br> para comunicar emociones positivas.'];
    } else if (id_melody_mode === 'eolico'){
        //return '<ul><li>Común en occidente, en géneros como el rock, el pop, el jazz y la música clásica.</li><li>Único modo griego menor con segunda menor y sexta menor.</li><li>Históricamente vinculado a ‘calma’, ‘tristeza’, y ‘pesadez’ y ‘añoranza’.</li><li>Suele usarse para comunicar melancolía.</li></ul>';
        return ['Común en occidente, en géneros <br> como el rock, el pop, el jazz <br> y la música clásica.', 'Único modo griego menor <br> con segunda menor y sexta menor.', 'Históricamente vinculado <br> a ‘calma’, ‘tristeza’, ‘pesadez’ y ‘añoranza’.', 'Suele usarse para comunicar melancolía.'];
    } else if (id_melody_mode === 'locrio'){
        //return '<ul><li>Es el modo menos utilizado en el mundo.</li><li>Único modo griego con segunda menor y quinta disminuida.</li><li>Históricamente vinculado a ‘miedo’, ‘peligro’ y ‘confusión’.</li><li>Armónicamente es muy inestable y suele evocar incomodidad.</li></ul>';
        return ['Es el modo menos utilizado <br> en el mundo.', 'Único modo griego <br> con segunda menor y quinta disminuida.', 'Históricamente vinculado <br> a ‘miedo’, ‘peligro’ y ‘confusión’.', 'Armónicamente es muy inestable <br> y suele evocar incomodidad.'];
    } else {
        return 'hello, world!' + Math.floor(Math.random() * 100);
    }
}; 

async function setData(id_mode){
    // Change CSS color
    document.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]);                             // Set color theme
    document.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);     // Set color theme (transparent)

    // Set id_melody_mode cookie (read by playlist.html)
    setCookie('id_melody_mode', id_melody_modes[id_mode]['id_melody_mode']);
    
    // Updates information displayed on website according to the selected mode.
    individualWords = userData['word_lists'][id_mode];                                                      // Get individual word list
    collectiveWords = collectiveData[id_mode]['word_lists'];                                                // Get collective word list
    var encoded_image = userData['encoded_images'][id_mode];                                                // Get encoded image
    var embedding_path_folder = userData['embedding_path_folder'][id_mode];                                 // Get embeddings video
    var id_melody = userData['id_melody'][id_mode];                                                         // Get id_melody
    var alegria = userData['alegria'][id_mode];                                                             // Get "alegria"
    var tristeza = userData['tristeza'][id_mode];                                                           // Get "tristeza"
    var sorpresa = userData['sorpresa'][id_mode];                                                           // Get "sorpresa"
    var asco = userData['asco'][id_mode];                                                                   // Get "asco"
    var miedo = userData['miedo'][id_mode];                                                                 // Get "miedo"
    var enojo = userData['enojo'][id_mode];                                                                 // Get "enojo"
    //var otro = userData['otro'][id_mode];                                                                 // Get "otro"
    var pos = userData['pos'][id_mode];                                                                     // Get "pos"
    var neu = userData['neu'][id_mode];                                                                     // Get "neu"
    var neg = userData['neg'][id_mode];                                                                     // Get "neg"
    var distance = userData['semantic_distance'][id_mode];                                                  // Get "distance"
    var alegria_collective = collectiveData[id_mode]['alegria'];                                            // Get collective "alegria"
    var tristeza_collective = collectiveData[id_mode]['tristeza'];                                          // Get collective "tristeza"
    var sorpresa_collective = collectiveData[id_mode]['sorpresa'];                                          // Get collective "sorpresa"
    var asco_collective = collectiveData[id_mode]['asco'];                                                  // Get collective "asco"
    var miedo_collective = collectiveData[id_mode]['miedo'];                                                // Get collective "miedo"
    var enojo_collective = collectiveData[id_mode]['enojo'];                                                // Get collective "enojo"
    //var otro_collective = collectiveData[id_mode]['otro'];                                                // Get collective "otro"
    var pos_collective = collectiveData[id_mode]['pos'];                                                    // Get collective "pos"
    var neu_collective = collectiveData[id_mode]['neu'];                                                    // Get collective "neu"
    var neg_collective = collectiveData[id_mode]['neg'];                                                    // Get collective "neg"
    //audio.src = 'music/'.concat(id_melody,'.mp3')                                                         // Set melody to be played
    
    sheetURL = 'https://flat.io/embed/'.concat(await getsheetMusicURLs(id_melody), '?branding=false&themePrimary=%23162331&themeScoreBackground=transparent&appId=64c7f55e192e39aaabfb5b43&layout=track&themeControlsBackground=%23162331&locale=es');      // Set sheet music source
    sheetID = await getsheetMusicURLs(id_melody);

    mode_text = getModeText(id_melody_modes[id_mode]['id_melody_mode']);                                            // Set mode text
    mode_text_0.innerHTML = '<img class="emoji" src="assets/images/icons/notas.png">' + mode_text[0];
    mode_text_1.innerHTML = '<img class="emoji" src="assets/images/icons/piano.png">' + mode_text[1];
    mode_text_2.innerHTML = '<img class="emoji" src="assets/images/icons/nube.png">' + mode_text[2];
    mode_text_3.innerHTML = '<img class="emoji" src="assets/images/icons/caretas.png">' + mode_text[3];

    //if (typeof sheet_frame != "undefined") {                                                                  // If sheet music exists
    if (sheet_frame.contentWindow != null) {                                                                    // If sheet music exists
        sheet_frame.contentWindow.postMessage({'message': 'stopScore'}, '*');
        sheet_frame.contentWindow.postMessage({'message': 'changeScore', 'sheetID': sheetID}, '*');                                                   // Update sheet music
    };                                                                                                            
        //sheet_frame.remove();                                                                                 // Destroy it
        // also TRY to delete textContainer
        //textContainer.remove();
        // sheet_frame = document.createElement('iframe');                                                      // And create new one
        // sheet_frame.setAttribute("src", sheetURL);
        // sheet_frame.setAttribute("height", "350");
        // sheet_frame.setAttribute("width", "100%");
        // sheet_frame.setAttribute("frameBorder", "0");
        // sheet_frame.setAttribute("allowfullscreen", "allowfullscreen");
        // sheet_frame.setAttribute("allow", "autoplay; midi");
        // add text to the webpage below 
        // textContainer = document.createElement('div');
        // textContainer.classList.add('mode_text_container');
        //textContainer.innerHTML = "<br> <h4> " + mode_text + "</h4>";
        // textContainer.appendChild(mode_text_0);
        // textContainer.appendChild(mode_text_1);
        // textContainer.appendChild(mode_text_2);
        // textContainer.appendChild(mode_text_3);
        
        // var activeButton = null;                                                                            // Only render thermometer if active sidebar button is "music"
        // sidebarButtons.forEach(function(button) {
        //     if (button.getAttribute("class") === "active") {
        //       activeButton = button.getAttribute("id");
        //     }
        // });
          
        // if (activeButton) {
        //     console.log('The active button is:', activeButton);
        //   } else {
        //     console.log('No button is currently active.');
        //   }
        // if (activeButton === "music"){
        //     // sheet_frame_container.appendChild(sheet_frame);
        //     //document.getElementById('container').appendChild(sheet_frame_container);
        //     //document.getElementById('container').appendChild(sheet_frame);
        //     //document.getElementById('container').appendChild(textContainer);
        // }
        
    // } else {
    //     // sheet_frame = document.createElement('iframe');                                                 // And create new one
    //     // sheet_frame.setAttribute("src", sheetURL);
    //     // sheet_frame.setAttribute("height", "350");
    //     // sheet_frame.setAttribute("width", "100%");
    //     // sheet_frame.setAttribute("frameBorder", "0");
    //     // sheet_frame.setAttribute("allowfullscreen", "allowfullscreen");
    //     // sheet_frame.setAttribute("allow", "autoplay; midi");
    //     // // add text to the webpage below 
    //     // //textContainer = document.createElement('div');
    //     // //textContainer.innerHTML = "";
    //     // // textContainer.appendChild(mode_text_0);
    //     // // textContainer.appendChild(mode_text_1);
    //     // // textContainer.appendChild(mode_text_2);
    //     // // textContainer.appendChild(mode_text_3);
    //     // document.getElementById('container').appendChild(textContainer);
    // };

    //words = word_list;                                                                                        // Set word list
    //collectiveWords = collective_word_list;                                                                   // Set collective word list
    if (wordCloudButtonClicks >= 1) {
        if (typeof tagcloud != "undefined") {                                                                   // If object exists
            tagcloud.destroy();                                                                                 // destroy it
        }
        if (typeof collectiveTagcloud != "undefined") {                                                         // If object exists
            collectiveTagcloud.destroy();                                                                       // destroy it
        }
        tagcloud = TagCloud(tagContainer, individualWords, options);                                            // and create new one
        collectiveTagcloud = TagCloud(collectiveTagContainer, collectiveWords, collectiveWordCloudOptions);     // and create new one
    };
    
    // Set emotional thermometer
    if (typeof container_frame != "undefined") {                                                            // If thermometer exists
        container_frame.remove();                                                                           // Destroy it
        container_frame = document.createElement('iframe');                                                 // And create new one
        thermometers.appendChild(container_frame);
        container_frame.setAttribute("src", "thermometer.html?cache-buster=123");
        container_frame.style.marginTop = "0px";
        container_frame.style.width = "100%";
        container_frame.style.height = "1000px";
        container_frame.style.border = "none";
        container_frame.style.display = "block";
        container_frame.addEventListener('load', function() {
            var iframeDoc = container_frame.contentWindow.document;
            setThermometerValues(iframeDoc, alegria, tristeza, sorpresa, asco, miedo, enojo, pos, neu, neg); // Set thermometer values
            iframeDoc.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]); // Change color
            iframeDoc.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);
            //iframeDoc.getElementById("title").innerHTML = "VOS"; // Change title
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
            //document.getElementById('container').appendChild(container_frame);
        }
        
    } else {
        container_frame = document.createElement('iframe');
        container_frame.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]);
        container_frame.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);
        container_frame.setAttribute("src", "thermometer.html?cache-buster=123");
        container_frame.setAttribute("allowtransparency", "true");
        container_frame.style.marginTop = "0px";
        container_frame.style.width = "100%";
        container_frame.style.height = "1000px";
        container_frame.style.border = "none";
        container_frame.style.display = "none";        
        container_frame.addEventListener('load', function() {
            var iframeDoc = container_frame.contentWindow.document;
            setThermometerValues(iframeDoc, alegria, tristeza, sorpresa, asco, miedo, enojo, pos, neu, neg); // Set thermometer values
            iframeDoc.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]); // Change color
            iframeDoc.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);
            //iframeDoc.getElementById("title").innerHTML = "VOS"; // Change title
        });
    };
    
    if (typeof collectiveThermometerFrame != "undefined") {                                                            // If collective thermometer exists
        collectiveThermometerFrame.remove();                                                                           // Destroy it
        collectiveThermometerFrame = document.createElement('iframe');                                                 // And create new one
        thermometers.appendChild(collectiveThermometerFrame);
        collectiveThermometerFrame.setAttribute("src", "thermometer.html?cache-buster=123");
        collectiveThermometerFrame.style.marginTop = "0px";
        collectiveThermometerFrame.style.width = "100%";
        collectiveThermometerFrame.style.height = "1000px";
        collectiveThermometerFrame.style.border = "none";
        collectiveThermometerFrame.style.display = "block";
        collectiveThermometerFrame.addEventListener('load', function() {
            var iframeDoc = collectiveThermometerFrame.contentWindow.document;
            setThermometerValues(iframeDoc, alegria_collective, tristeza_collective, sorpresa_collective, asco_collective, miedo_collective, enojo_collective, pos_collective, neu_collective, neg_collective); // Set thermometer values
            iframeDoc.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]); // Change color
            iframeDoc.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);
            //iframeDoc.getElementById("title").innerHTML = "EL RESTO"; // Change title
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
            //document.getElementById('thermometers').appendChild(collectiveThermometerFrame);
            //document.getElementById('container').appendChild(thermometers);
        }
    
    } else {
        collectiveThermometerFrame = document.createElement('iframe');
        collectiveThermometerFrame.setAttribute("src", "thermometer.html?cache-buster=123");
        collectiveThermometerFrame.setAttribute("allowtransparency", "true");
        collectiveThermometerFrame.style.marginTop = "0px";
        collectiveThermometerFrame.style.width = "100%";
        collectiveThermometerFrame.style.height = "1000px";
        collectiveThermometerFrame.style.border = "none";
        collectiveThermometerFrame.style.display = "none";
        collectiveThermometerFrame.addEventListener('load', function() {
            var iframeDoc = collectiveThermometerFrame.contentWindow.document;
            setThermometerValues(iframeDoc, collectiveData[id_mode]['alegria'], collectiveData[id_mode]['tristeza'], collectiveData[id_mode]['sorpresa'], collectiveData[id_mode]['asco'], collectiveData[id_mode]['miedo'], collectiveData[id_mode]['enojo'], collectiveData[id_mode]['pos'], collectiveData[id_mode]['neu'], collectiveData[id_mode]['neg']); // Set thermometer values
            iframeDoc.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]); // Change color
            iframeDoc.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);
            //iframeDoc.getElementById("title").innerHTML = "EL RESTO"; // Change title
        });
    };



    image.src = 'data:image/png;base64,'.concat(encoded_image);                                             // Set image source

    // Check if encoded_image is in image_list, and if so, remove it
    if (collectiveData[id_mode]['image_list'].includes(encoded_image)){
        var index = collectiveData[id_mode]['image_list'].indexOf(encoded_image);
        if (index > -1) {
            collectiveData[id_mode]['image_list'].splice(index, 1);
        }
    }
    
    collective_image_1.src = 'data:image/png;base64,'.concat(collectiveData[id_mode]['image_list'][0]);     // Set collective image 1 source
    collective_image_2.src = 'data:image/png;base64,'.concat(collectiveData[id_mode]['image_list'][1]);     // Set collective image 2 source
    collective_image_3.src = 'data:image/png;base64,'.concat(collectiveData[id_mode]['image_list'][2]);     // Set collective image 3 source
    collective_image_4.src = 'data:image/png;base64,'.concat(collectiveData[id_mode]['image_list'][3]);     // Set collective image 4 source

    // Set embeddings
    console.log(id_melody_modes[id_mode]['id_melody_mode']);
    console.log(distance);
    video_path = getVideoPath(id_melody_modes[id_mode]['id_melody_mode'], distance);
    distance_text = getDistanceText(distance);
    //console.log(video_path);
    //console.log(distance_text);
    embeddings_video.setAttribute('src', video_path);
    embeddings_video.setAttribute('width', '650px');
    embeddings_video.setAttribute('autoplay', 'autoplay');
    embeddings_video.setAttribute('loop', 'loop');
    embeddings_video.setAttribute('muted', 'muted');
    distanceTextContainer.innerHTML = distance_text;

    // Set playlist
    if (typeof playlist_frame != "undefined") {                                                             // If playlist exists
        playlist_frame.remove();                                                                            // destroy it
        playlist_frame = document.createElement('iframe');                                                  // and create new one
        playlist_frame.setAttribute("src", "playlist_mini.html");
        playlist_frame.setAttribute("allowtransparency", "true");
        playlist_frame.style.width = "100%";
        playlist_frame.style.height = "1200px";
        playlist_frame.style.border = "none";
        playlist_frame.style.display = "block";
        playlist_frame.addEventListener('load', function() {
            var iframeDoc = playlist_frame.contentWindow.document;
            iframeDoc.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]); // Change color
            iframeDoc.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']])
        });
        

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
            document.getElementById('container').innerHTML = '<h2>Canciones</h2><span>Recopilamos canciones de distintos géneros que utilizan este modo</span>';
            document.getElementById('container').appendChild(playlist_frame);
            playlist_frame.style.display = "block";
            //sendMetadata(currentSong);
        }
        
    } else {
        playlist_frame = document.createElement('iframe');
        playlist_frame.setAttribute("src", "playlist_mini.html");
        playlist_frame.setAttribute("allowtransparency", "true");
        playlist_frame.style.width = "100%";
        playlist_frame.style.height = "1200px";
        playlist_frame.style.border = "none";
        playlist_frame.style.display = "none";
        playlist_frame.addEventListener('load', function() {
            var iframeDoc = playlist_frame.contentWindow.document;
            iframeDoc.documentElement.style.setProperty('--main-color', main_colors[id_melody_modes[id_mode]['id_melody_mode']]); // Change color
            iframeDoc.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_modes[id_mode]['id_melody_mode']]);
        });

    };
    
    //console.log(playlist_frame.contentWindow);
    
    // Get playlist songs for selected mode
    const object = {};
    object['id_melody_mode'] = id_melody_modes[id_mode]['id_melody_mode'];
    const modeJSON = JSON.stringify(object);
    const modeSongs = await get_mode_songs(modeJSON);
    modeSongsData = await modeSongs.json();
    //console.log(modeSongsData);
    
    // Initialization parameters
    currentSong = 0;
    setMetadata(currentSong);
    setAudioFiles(id_melody_modes[id_mode]['id_melody_mode']);
}; 
