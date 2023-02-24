const text_input = document.getElementById("text_input").value;
const sendButton = document.getElementById("sendButton");

function generateUID() {
    // Generate unique identifier from user's name and the selected track.
    const text_input = document.getElementById("text_input").value;
    //const ID = `ID_IONIAN_6_${name_input}`
    alert(`¡Gracias por participar!`);
    window.location.href = "start.html";
}

sendButton.addEventListener('click', generateUID);

const submitReview = (e) => {
    e.preventDefault();
    const text_input = document.getElementById('text_input').value;
    const options = {
        method: 'POST',
        body: JSON.stringify({ text_input }),
        headers: new Headers({ 'Content-Type': 'application/json' })
    }

    const emojiSection = document.getElementById('emojiSection');
    const prompt = document.getElementById('prompt');
    const outline = document.querySelector(':focus');

    fetch('/api/nlp/s-analyzer', options)
      .then(res => res.json())
      .then(({ analysis }) => {
        if (analysis < 0) {
            emojiSection.innerHTML = '<img src = "https://img.icons8.com/emoji/96/000000/angry-face.png">';
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
        //emojiSection.innerHTML = text_input
      })
}

document.getElementById('text_input').addEventListener('keyup', submitReview);
