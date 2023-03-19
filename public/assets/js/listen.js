var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Reproduciendo...";
  } else {
    document.getElementById("countdown").innerHTML = "La melodía comienza en " + timeleft + " segundos";
  }
  timeleft -= 1;
}, 1000);