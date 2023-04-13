import { getCookie } from "./cookies.js";

// const id_melody_set = getCookie('id_melody_set');
// const iteration = getCookie('iteration');
// const melody_order = 1;

const id_melody_set = 1;
const iteration = 3;
const melody_order = 2;

fetch('melody_set.csv')
  .then(response => response.text())
  .then(text => {
    let column_name = "_".concat(id_melody_set)
    let row_number = (2 * iteration - 2) + melody_order - 1
    const data = Papa.parse(text, { header: true }).data;
    console.log(data); // Array of objects representing the CSV rows
    // Access a value from the first row
    console.log(data[row_number][column_name]);
  });

const sound = document.createElement('audio');
sound.id       = 'audio-player';
sound.src      = 'music/F2.mp3';
sound.type     = 'audio/mpeg';

var timeleft = 5;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Reproduciendo...";
    // play audio
    sound.load()
    sound.play()
  } else {
    document.getElementById("countdown").innerHTML = "La melodía comienza en " + timeleft + " segundos";
  }
  timeleft -= 1;
}, 1000);

sound.onended = function() {
  //alert("Espere a la instrucción del guía para continuar.");
  window.location.href = "text_input.html";
};