import { getCookie } from "./cookies.js";
import { url } from "./config.js";
import { language } from "./config.js";
import esTranslations from '../locales/es.json' assert { type: "json" };
import enTranslations from '../locales/en.json' assert { type: "json" };

// Set dictionary for translation
const translations = {
  es: esTranslations,
  en: enTranslations,
};

var text_page_load = new Date().toISOString().slice(0, 19).replace('T', ' ');
var text_start;

const send = document.getElementById("send");

var timeleft = 180; // 3 minutos
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("limit").innerHTML = translations[language]['text_input']['time_up'];
    document.getElementById('imagined').disabled = true;
    // tiempito
    //window.location.href = "finalize1.html";
  } else {
    if(timeleft <= 30){
    document.getElementById("limit").innerHTML = translations[language]['text_input']['time_left_1'] + timeleft + translations[language]['text_input']['time_left_2'];
    }
  }
  timeleft -= 1;
}, 1000);

const saveText = (e) => {
  e.preventDefault();
  const text_submit = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const text = document.getElementById('imagined').value;
  const object = {};
  object['id_participant'] = getCookie('id_participant');
  object['id_melody'] = getCookie('id_melody');
  object['iteration'] = getCookie('iteration');
  object['melody_order'] = 1;
  object['text_input'] = text;
  object['text_page_load'] = text_page_load;
  object['text_start'] = text_start;
  if (text_start === undefined) { // if text_start is undefined, set text_start as text_submit
    object['text_start'] = text_submit;
  };
  console.log(object['text_start']);
  object['text_submit'] = text_submit;

  const textJSON = JSON.stringify(object);
  console.log(textJSON);

  if (text !== "Imaginé " || confirm(translations[language]['text_input']['empty_text'])) {
    async function query(text_data) {
      const response = await fetch(
        url + "/profiles_api/receive_text/",
        {
          headers: new Headers({ 'Content-type': 'application/json' }),
          method: "POST",
          body: text_data,
        }
      );
      const result = await response;
      return result;
    }

    query(textJSON)
      .then((response) => {
        response.json().then(body => console.log(body))
          .then(body => window.location.href = "finalize1.html")
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log("El servidor está caído.");
        window.location.href = "server_down.html";
      });
  }
}

var eventHandler = function(event){
  text_start = new Date().toISOString().slice(0, 19).replace('T', ' ');
  //alert(`Text start timestamp: ${text_start}`);
  document.getElementById('imagined').removeEventListener('keypress', eventHandler);
}

document.getElementById('imagined').addEventListener('keypress', eventHandler);
document.getElementById('send').addEventListener('click', saveText);

// Make default text "Me imaginé..."
document.querySelector('#imagined').addEventListener('input', function(e){
  var defaultText = 'Imaginé ',
      defaultTextLength = defaultText.length;
  if(this.selectionStart === this.selectionEnd && this.selectionStart < defaultTextLength) {
      this.value = defaultText;
  }
});