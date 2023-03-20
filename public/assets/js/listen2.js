const sound = document.createElement('audio');
sound.id       = 'audio-player';
sound.src      = 'music/F2.mp3';
sound.type     = 'audio/mpeg';

var timeleft = 10;
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
  window.location.href = "text_input2.html";
};