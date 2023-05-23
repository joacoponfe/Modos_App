import { url } from "./config.js";
import { getCookie } from "./cookies.js";

const id_melody_mode = getCookie('id_melody_mode');

const player = document.getElementById("player");
const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const playlist = document.getElementById("songs");
const progressBar = document.getElementById("progress-bar");
const progress = document.querySelector(".progress");
const volume = document.getElementById("volume");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");

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


playlist.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    currentSong = Array.from(playlist.children).indexOf(e.target);
    audio.src = e.target.getAttribute("data-src");
    audio.play();
    playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    setActiveSong(currentSong);
  }
});

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

audio.addEventListener("timeupdate", (e) => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
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

function setMetadata(index) {
  songTitle.innerHTML = modeSongsData['titulos'][index];
  artistName.innerHTML = modeSongsData['artistas'][index];
  albumName.innerHTML = modeSongsData['albumes'][index];
  releaseYear.innerHTML = modeSongsData['anios'][index];
  albumArt.src = 'data:image/png;base64,'.concat(modeSongsData['encoded_images'][index]);
  // Send metadata to music bar on totems main page
  const metadata = {'title': modeSongsData['titulos'][index], 'artist': modeSongsData['artistas'][index], 'album-art': 'data:image/png;base64,'.concat(modeSongsData['encoded_images'][index])};
  window.parent.postMessage(metadata, '*');
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
}

function setQRCode(id_mode) {
  qr_image.src = 'images/'.concat(id_mode,'_QR.png');
}

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

const object = {};
object['id_melody_mode'] = id_melody_mode;
const modeJSON = JSON.stringify(object);
console.log(modeJSON);
const res = await get_mode_songs(modeJSON);
const modeSongsData = await res.json();

// Initialization parameters
setMetadata(0);
setAudioFiles(id_melody_mode);
setQRCode(id_melody_mode);
let currentSong = 0;
audio.src = playlist.children[currentSong].getAttribute("data-src");