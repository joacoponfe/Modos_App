const sendButton = document.getElementById("sendButton");

//function generateUID() {
    // Generate unique identifier from user's name and the selected track.
//    const text_input = document.getElementById("text_input").value;
    //const ID = `ID_IONIAN_6_${name_input}`
//    alert(`¡Gracias por participar!`);
//   window.location.href = "start.html";
//}

var timeleft = 180; // 3 minutos
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Tiempo finalizado.";
    // tiempito
    window.location.href = "finalize1.html";
  } else {
    if(timeleft <= 60){
    document.getElementById("countdown").innerHTML = "Quedan " + timeleft + " segundos para escribir";
    }
  }
  timeleft -= 1;
}, 1000);

const submitReview = (e) => {
    e.preventDefault();
    const text = document.getElementById('text_input').value;
    const options = {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: new Headers({ 'Content-type': 'application/json' })
        //headers: {"Content-type": "application/json;charset=UTF-8"}
    }
    const emojiSection = document.getElementById('emojiSection');
    const prompt = document.getElementById('prompt');
    const outline = document.querySelector(':focus');

    fetch('api/nlp/s-analyzer', options)
      .then(res => res.json()) // Convert to JSON
      .then(({ analysis }) => {
        if (analysis < 0) {
            emojiSection.innerHTML = '<img src = "https://img.icons8.com/cotton/256/angry-face-icon--v2.png">';
            prompt.style.color = 'red';
            outline.style.borderColor = 'red';
        };
        if (analysis === 0) {
            emojiSection.innerHTML = '<img src="https://img.icons8.com/officel/80/000000/neutral-emoticon.png">';
            prompt.style.color = '#00367c';
            outline.style.borderColor = '#00367c';
        }
        if (analysis > 0) {
            emojiSection.innerHTML = '<img src="https://img.icons8.com/color/96/000000/happy.png">';
            prompt.style.color = 'green';
            outline.style.borderColor = 'green';
        }
      })
      .catch(err => {
        emojiSection.innerHTML = 'Ocurrió un error.'
        //emojiSection.innerHTML = text_input.value
        console.log(err);
      })
}

function saveText(){
  window.location.href = "finalize2.html"
}

//document.getElementById('text_input').addEventListener('keyup', submitReview);
//document.getElementById('sendButton').addEventListener('click', submitReview);
document.getElementById('sendButton').addEventListener('click', saveText);
