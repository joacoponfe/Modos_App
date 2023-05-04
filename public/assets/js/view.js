import { url } from "./config.js";

// Create request object
const object = {};
object['id_melody_mode'] = 'mixolidio';

const requestJSON = JSON.stringify(object);
// console.log(requestJSON);

async function query(id_melody_mode) {
    const response = await fetch(
        //"http://localhost:8000/profiles_api/mode_data/",
        url + "/profiles_api/mode_data/",
        {
            headers: new Headers({ 'Content-type': 'application/json' }),
            method: "POST",
            body: id_melody_mode,
        }
    );
    //const result = await response.json();
    const result = await response;
    return result;
}

// query(requestJSON).then((response) => {
    // console.log(JSON.stringify(response));
    // console.log(response.json());
    // response.json().then(body => console.log(body) || body)
    // .then(body => myTags = body['word_list'] || body)
    // .then(body => alegria = body['alegria'] || body)
    // .then(body => sorpresa = body['sorpresa'] || body)
    // .then(body => miedo = body['miedo'] || body)
    // .then(body => asco = body['asco'] || body)
    // .then(body => enojo = body['enojo'] || body)
    // .then(body => pos = body['pos'] || body)
    // .then(body => neu = body['neu'] || body)
    // .then(body => neg = body['neg'] || body)

    // .then(body => num_participants = body['num_participants'] || body)
    // .then(body => last_refresh = body['last_refresh']|| body)
// });

const response = await query(requestJSON);
const response_json =  await response.json()
console.log(response_json)

const myTags = response_json['word_lists'] // Todavía no se puede usar, ya que tiene la frecuencia de cada palabra.

// const myTags = [
//     'alegría', 'esperanza', 'contento', 'paz',
//     'bueno', 'soleado', 'armonioso', 'dulce',
//     'aire', 'aire', 'alegría', 'paz',
//     'aire', 'paz', 'paz', 'yendo',
//     'árboles', 'vida', 'cajas', 'violeta',
//     'castillo', 'monitores', 'papeles', 'impresora',
//     'auriculares', 'billetera', 'magnífico', 'teclas',
//     'piano', 'treinta', 'treinta', 'dieciocho',
//     'televisor', 'computadora', 'escritorio', 'escritorio',
//     'mate', 'silla', 'silla', 'billetera', 'parlante', 'parlante', 'dios', 'guerra',
//     'guerra', 'silla', 'termo'
// ];


var tagCloud = TagCloud('.content', myTags,{

  // radius in px
  radius: 300,

  // animation speed
  // slow, normal, fast
  maxSpeed: 'fast',
  initSpeed: 'fast',

  // 0 = top
  // 90 = left
  // 135 = right-bottom
  direction: 135,
  
  // interact with cursor move on mouse out
  keep: true
  
});

//To change the color of text randomly
//var colors = ['#34A853', '#FBBC05', '#4285F4', '#7FBC00', 'FFBA01', '01A6F0', '#F00105', '#AB0C76'];
//var colors = ['#044d59', '#59044f', '#ab0322', '#03ab87', '#abe305', '#49574a', '#d0e60e']
var colors = ['#044d59'];
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.querySelector('.content').style.color = random_color;