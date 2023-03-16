const myTags = [
    'alegría', 'esperanza', 'contento', 'paz',
    'bueno', 'soleado', 'armonioso', 'dulce',
    'aire', 'aire', 'alegría', 'paz',
    'aire', 'paz', 'paz', 'yendo',
    'árboles', 'vida', 'cajas', 'violeta',
    'castillo', 'monitores', 'papeles', 'impresora',
    'auriculares', 'billetera', 'magnífico', 'teclas',
    'piano', 'treinta', 'treinta', 'dieciocho',
    'televisor', 'computadora', 'escritorio', 'escritorio',
    'mate', 'silla', 'silla', 'billetera', 'parlante', 'parlante', 'dios', 'guerra',
    'guerra', 'silla', 'termo'
];


var tagCloud = TagCloud('.content', myTags,{

  // radius in px
  radius: 250,

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
var colors = ['#044d59', '#59044f', '#ab0322', '#03ab87', '#abe305', '#49574a', '#d0e60e']
var random_color = colors[Math.floor(Math.random() * colors.length)];
document.querySelector('.content').style.color = random_color;