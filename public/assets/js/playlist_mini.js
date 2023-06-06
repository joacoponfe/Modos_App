import { urlBack } from "./config.js";
import { getCookie } from "./cookies.js";

const id_melody_mode = getCookie('id_melody_mode');

const player = document.getElementById("player");
const playlist = document.getElementById("songs");

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

// QR element
const qr_image = document.getElementById("qr_image");

// Listen for messages from the parent window
window.addEventListener('message', function(event) {
  if (event.origin === urlBack) {
    var metadata = event.data;
    setMetadata(metadata);
    setActiveSong(metadata['index']);
  } 
});

function setMetadata(metadata) {
  songTitle.innerHTML = metadata['title'];
  artistName.innerHTML = metadata['artist'];
  albumName.innerHTML = metadata['album'];
  releaseYear.innerHTML = metadata['year'];
  albumArt.src = metadata['album-art'];
  // Send metadata to music bar on totems main page
  //const metadata = {'title': modeSongsData['titulos'][index], 'artist': modeSongsData['artistas'][index], 'album-art': 'data:image/png;base64,'.concat(modeSongsData['encoded_images'][index])};
  //window.parent.postMessage(metadata, '*');
};

const setActiveSong = (index) => {
  // remove "active" class from previously active song
  playlist.querySelector(".active-song").classList.remove("active-song");

  // add "active" class to currently playing song
  const activeSong = playlist.querySelectorAll("li")[index];
  activeSong.classList.add("active-song");
  //console.log(activeSong.getAttribute("data-src"));
  //console.log(activeSong.getAttribute("id"));
  
  // set file metadata
  //const genre = activeSong.getAttribute("id");
  //setMetadata(index);
};

function setQRCode(id_mode) {
  qr_image.src = 'images/'.concat(id_mode,'_QR.png');
}

setQRCode(id_melody_mode);

playlist.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    let currentSong = Array.from(playlist.children).indexOf(e.target);
    //audio.src = e.target.getAttribute("data-src");
    //audio.play();
    //playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    setActiveSong(currentSong);
    console.log(currentSong);
    // send to parent window
    const index = {'index': currentSong};
    window.parent.postMessage(index, '*');
  }
});