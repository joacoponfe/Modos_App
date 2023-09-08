import { getCookie } from "./cookies.js";
import { setCookie } from "./cookies.js";

const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const volume = document.getElementById("volume_slider");

audio.src = "music/calibrate2.mp3";

// Functions for audio player controls
playPause.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    } else {
      audio.pause();
      playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
    }
});

volume.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

document.getElementById("next").onclick = function () {
    // Save volume setting
    const userVolume = audio.volume;
    setCookie("userVolume", userVolume);
    //console.log(userVolume);
    location.href = "consigna.html";
};