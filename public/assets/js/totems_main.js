import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";
import { url, urlFront } from "./config.js";

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
    var stylesheet = iframeDoc.styleSheets[0];
    
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

mode_1.innerHTML = id_melody_1_mode_tildes['id_melody_mode'];
mode_2.innerHTML = id_melody_2_mode_tildes['id_melody_mode'];


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

// Listen for messages from the playlist iframe window (song change)
window.addEventListener('message', function(event) {
    if (event.origin === urlFront) {
      var index = event.data;
      //console.log('Received message from playlist_mini.html: ' + index['index']);
      currentSong = index['index'];
      audio.src = playlist.children[currentSong].getAttribute("data-src");
      audio.play();
      setActiveSong(currentSong);
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
var sheet_frame;
var mode_text;
var textContainer;

// create embeddings video elements
var video_path;
var distance_text;
const video = document.createElement('video');
var distanceTextContainer = document.createElement('div');
distanceTextContainer.style.marginTop = "20px";
distanceTextContainer.style.fontSize = "20px";
distanceTextContainer.style.fontWeight = "bold";

// Create Word Cloud element
const wordCloud = document.createElement("span");
wordCloud.classList.add('tagcloud');
const tagContainer = '.tagcloud';
const options = {radius:300, maxSpeed:'normal', initSpeed:'normal', direction:135, keep:true};
var words = userData['word_lists'][0];
var tagcloud;

// Create emotional thermometer element
var container_frame;

// Create image element
const image = document.createElement('img');
//image.src = "https://i.pinimg.com/originals/3c/f8/41/3cf8412096f10f0847e6e689fde63775.jpg";
image.style.width = "650px";
image.style.borderRadius = "10px";
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
            // set iframe src to sheet music URL
            document.getElementById('container').innerHTML =  "<h2>Acerca del modo</h2><span>Transcribimos la melodía que escuchaste. Volvé a escucharla y conocé más sobre este modo<span>";
            document.getElementById('container').appendChild(sheet_frame);
            sheet_frame.style.display = "block";
            sheet_frame.setAttribute("src", sheetURL);
            sheet_frame.setAttribute("height", "350");
            sheet_frame.setAttribute("width", "100%");
            sheet_frame.setAttribute("frameBorder", "0");
            sheet_frame.setAttribute("allowfullscreen", "allowfullscreen");
            sheet_frame.setAttribute("allow", "autoplay; midi");
            // add text to the webpage below 
            textContainer = document.createElement('div');
            textContainer.innerHTML = "<h4> " + mode_text + "</h4> ";
            document.getElementById('container').appendChild(textContainer);
            
            // document.getElementById('container').innerHTML += '<iframe src="' + sheetURL + '" height="450" width="100%" frameBorder="0" allowfullscreen allow="autoplay; midi"></iframe>';
            button.setAttribute('class', 'active');
        } else if (content === 'wordcloud') {
            document.getElementById('container').innerHTML = '<h2>Conceptos</h2><span>Identificamos los conceptos clave de tu texto</span>';
            document.getElementById('container').appendChild(wordCloud);
            if (typeof tagcloud === "undefined") { // If object does not already exist
                tagcloud = TagCloud(tagContainer, words, options);  // Creates word cloud element 
             }
            button.setAttribute('class', "active");
        } else if (content === 'thermometer') {
            document.getElementById('container').innerHTML = '<h2>Emociones</h2><span>Medimos la intensidad de las emociones que sentiste al escuchar la melodía</span>';
            document.getElementById('container').appendChild(container_frame);
            container_frame.style.display = "block";
            button.setAttribute('class', "active");
        } else if (content === 'images') {
            document.getElementById('container').innerHTML = '<h2>Imagen</h2><span>Captamos esta imagen de tu cabeza. ¿Coincide con lo que te imaginaste?</span>';
            document.getElementById('container').appendChild(image);
            button.setAttribute('class', "active");
        } else if (content === 'you-and-others') {
            document.getElementById('container').innerHTML = '<h2>Singularidad</h2><span>Calculamos la similitud entre tu respuesta y las del resto de las personas</span>';
            // References
            var refContainer = document.createElement('div');
            refContainer.style.display = "flex";
            refContainer.style.alignItems = "center"; 
            refContainer.innerHTML = '<img src="assets/images/singularidad_star.png" style="width:100px; height:100px;" alt="Image 1"><label for="label1" style="margin-right:50px;">Vos</label>  <img src="assets/images/singularidad_constelacion.png" style="width:100px; height:100px; margin-right:10px;" alt="Image 2"><label for="label2">El resto</label> <br> <img src="assets/images/singularidad_star.png" style="width:100px; height:100px"' 
            document.getElementById('container').appendChild(refContainer);
            // Text
            //var distanceTextContainer = document.createElement('div');
            distanceTextContainer.innerHTML = distance_text;
            // distanceTextContainer.style.marginTop = "20px";
            // distanceTextContainer.style.fontSize = "20px";
            // distanceTextContainer.style.fontWeight = "bold";
            document.getElementById('container').appendChild(distanceTextContainer);
            // Video
            document.getElementById('container').appendChild(video);
            button.setAttribute('class', 'active');
            
        } else if (content === 'songs') {
            document.getElementById('container').innerHTML = '<h2>Canciones</h2><span>Recopilamos canciones de distintos géneros que utilizan este modo</span>';
            document.getElementById('container').appendChild(playlist_frame);
            playlist_frame.style.display = "block";
            playlist_frame.onload = function() {	
                sendMetadata(currentSong);
            };
            //playlist_frame.setAttribute("src", "playlist.html"); // Set iframe source as playlist.html
            //playlist_frame.removeAttribute("hidden"); // Make iframe visible 
            button.setAttribute('class', "active");
            console.log(currentSong);
            //sendMetadata(currentSong);
        }
    });
});

// Redirect to playlist page when clicking on metadata section of miniplayer
document.getElementById('metadata-section').addEventListener('click', event => {
    // Prevent the default link behavior   
    event.preventDefault();
    // Redirect to playlist page
    document.getElementById('container').innerHTML = '<h2>Canciones representativas</h2>';
    document.getElementById('container').appendChild(playlist_frame);
    playlist_frame.style.display = "block";
    // Set all buttons to "inactive" and then set playlist button to "active"
    sidebarButtons.forEach(button => {
        button.setAttribute('class', '');
    });
    document.getElementById("songs").setAttribute('class', 'active');
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
    } else if (distance <= 1.0){  
        distance = "1.0";
    } else {
        distance = "0.4";
    }

    // return 'assets/videos/'.concat(id_melody_mode, '/embedding_distance_',distance,'.mp4');
    return 'assets/videos/'.concat('jonico', '/embedding_distance_',distance,'.mp4'); // Hasta que Dani genere los videos que faltan
}

function getDistanceText(distance){
    // this function returns the text to be displayed in the distance section
    if (distance < 0.2){
        return 'Tu mente refleja la conciencia musical colectiva.'
    } else if (distance < 0.4){
        return 'Tu mente se acerca a la conciencia musical colectiva.'
    } else if (distance < 0.6){
        return 'Tu experiencia musical es, a la vez, común y única.'
    } else if (distance < 0.8){
        return 'Vivís la música de manera particular.'
    } else if (distance < 1.0){
        return 'Vivís la música de forma totalmente única.'
    } else {
        return 'Tu mente refleja la conciencia musical colectiva.'
    }

}

function getModeText(id_melody_mode){
    // this function returns the text to be displayed in the mode section
    if (id_melody_mode === 'jonico'){
        return '-Muy empleado en la música occidental, en múltiples géneros. <br> -Único modo griego mayor con séptima mayor y cuarta natural. <br> -Históricamente vinculado con ‘dulzura’, ‘encanto’, ‘alegría’ y ‘placer’.<br> -Suele emplearse para comunicar emociones positivas.';
    } else if (id_melody_mode === 'dorico'){
        return '-Muy común en el rock, el jazz, el funk y el pop. <br> -Único modo griego menor con sexta natural. <br> - Históricamente vinculado con ‘seriedad’, ‘brillantez’, ‘constancia’ y ‘virtud’. <br> -Muy utilizado para comunicar emociones positivas y sensaciones lúdicas.';
    } else if (id_melody_mode === 'frigio'){
        return '-Común en el metal y algunos subgéneros del flamenco. <br> -Único modo griego menor con segunda menor y quinta natural. <br> - Históricamente vinculado a ‘dureza, ‘ira’, ‘crueldad’ y ‘lamento’. <br> -Muy utilizado para comunicar emociones negativas y para generar tensión.';
    } else if (id_melody_mode === 'lidio'){
        return '-Suele emplearse para generar climas particulares en el rock y la música de cine. <br> -Único modo griego mayor con séptima mayor y cuarta aumentada. <br> -Históricamente vinculado a ‘simplicidad’, ‘modestia’, ‘suavidad’ y ‘superación’. <br> -Muy utilizado para comunicar emociones positivas y sensaciones oníricas.';
    } else if (id_melody_mode === 'mixolidio'){
        return '-Común en el rock, el blues y el funk. <br> -Único modo griego mayor con séptima menor. <br> -Históricamente vinculado a ‘entusiasmo’, ‘suavidad’ y ‘lujuria’. <br> -Muchos artistas lo emplean para comunicar emociones positivas.';
    } else if (id_melody_mode === 'eolico'){
        return '-Común en occidente, en géneros como el rock, el pop, el jazz y la música clásica. <br> -Único modo griego menor con segunda menor y sexta menor. <br> -Históricamente vinculado a ‘calma’, ‘tristeza’, y ‘pesadez’ y ‘añoranza’. <br> -Suele usarse para comunicar melancolía.';
    } else if (id_melody_mode === 'locrio'){
        return '-Es el modo menos utilizado en el mundo. <br> -Único modo griego con segunda menor y quinta disminuida. <br> -Históricamente vinculado a ‘miedo’, ‘peligro’ y ‘confusión’. <br> -Armónicamente es muy inestable y suele evocar incomodidad.';
    } else {
        return 'hello, world!' + Math.floor(Math.random() * 100);
    }
}; 

async function setData(id_mode){
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
    //var otro = userData['otro'][id_mode];                                                                 // Get "otro"
    var pos = userData['pos'][id_mode];                                                                     // Get "pos"
    var neu = userData['neu'][id_mode];                                                                     // Get "neu"
    var neg = userData['neg'][id_mode];                                                                     // Get "neg"
    var distance = userData['semantic_distance'][id_mode];                                                           // Get "distance"
    //audio.src = 'music/'.concat(id_melody,'.mp3')                                                         // Set melody to be played
    
    sheetURL = 'https://flat.io/embed/'.concat(await getsheetMusicURLs(id_melody), '?layout=track&locale=es');    // Set sheet music source
    mode_text = getModeText(id_melody_modes[id_mode]['id_melody_mode']);                                    // Set mode text
    
    if (typeof sheet_frame != "undefined") {                                                                // If sheet music exists
        sheet_frame.remove();                                                                               // Destroy it
        // also TRY to delete textContainer
        textContainer.remove();
        sheet_frame = document.createElement('iframe');                                                     // And create new one
        sheet_frame.setAttribute("src", sheetURL);
        sheet_frame.setAttribute("height", "350");
        sheet_frame.setAttribute("width", "100%");
        sheet_frame.setAttribute("frameBorder", "0");
        sheet_frame.setAttribute("allowfullscreen", "allowfullscreen");
        sheet_frame.setAttribute("allow", "autoplay; midi");
        // add text to the webpage below 
        textContainer = document.createElement('div');
        textContainer.innerHTML = "<h4> " + mode_text + "</h4>";
        
        var activeButton = null;                                                                            // Only render thermometer if active sidebar button is "music"
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
        if (activeButton === "music"){
            document.getElementById('container').appendChild(sheet_frame);
            document.getElementById('container').appendChild(textContainer);
        }
        
    } else {
        
        sheet_frame = document.createElement('iframe');                                                 // And create new one
        sheet_frame.setAttribute("src", sheetURL);
        sheet_frame.setAttribute("height", "350");
        sheet_frame.setAttribute("width", "100%");
        sheet_frame.setAttribute("frameBorder", "0");
        sheet_frame.setAttribute("allowfullscreen", "allowfullscreen");
        sheet_frame.setAttribute("allow", "autoplay; midi");
        // add text to the webpage below 
        textContainer = document.createElement('div');
        textContainer.innerHTML = "";
        document.getElementById('container').appendChild(textContainer);
    };

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
        container_frame.setAttribute("allowtransparency", "true");
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
    console.log(id_melody_modes[id_mode]['id_melody_mode']);
    console.log(distance);
    video_path = getVideoPath(id_melody_modes[id_mode]['id_melody_mode'], distance);
    distance_text = getDistanceText(distance);
    //console.log(video_path);
    //console.log(distance_text);
    video.setAttribute('src', video_path);
    video.setAttribute('autoplay', 'autoplay');
    video.setAttribute('loop', 'loop');
    distanceTextContainer.innerHTML = distance_text;

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
            playlist_frame.style.display = "block";
            //sendMetadata(currentSong);
        }
        
    } else {
        playlist_frame = document.createElement('iframe');
        playlist_frame.setAttribute("src", "playlist_mini.html");
        playlist_frame.style.width = "100%";
        playlist_frame.style.height = "1200px";
        playlist_frame.style.border = "none";
        playlist_frame.style.display = "none";
        // document.getElementById('container').appendChild(playlist_frame);

    };
    
    console.log(playlist_frame.contentWindow);
    
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
