// Create an audio element
const audioPlayer = document.createElement('audio');
// Set the source of the audio file
audioPlayer.src = 'music/J1.mp3';
// Set the controls attribute to display the audio player controls
audioPlayer.controls = true;

// Create Word Cloud element
const wordCloud = document.createElement("span");
wordCloud.classList.add('tagcloud');
const tagContainer = '.tagcloud';

const words = [
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

const options = {radius:200, maxSpeed:'fast', initSpeed:'fast', direction:135, keep:true};
//const tagCloud = TagCloud(tagContainer, words, options);

// Create emotional thermometer element


// Create image element
const image = document.createElement('img');
image.src = "https://i.pinimg.com/originals/3c/f8/41/3cf8412096f10f0847e6e689fde63775.jpg";

// Create playlist element
const player = document.createElement("div");
const audio = document.createElement("audio");
const controls = document.createElement("div");
const progressBar = document.createElement("div");


// Get references to the buttons in the sidebar menu
const buttons = document.querySelectorAll('.sidebar a');

// Add a counter for word cloud button clicks (to avoid rendering more than once)
var wordCloudButtonClicks = 0;
//console.log(wordCloudButtonClicks);

// Add a click event listener to each button
buttons.forEach(button => {
    button.addEventListener('click', event => {
        // Get button ID
        //const buttonID = event.target.getAttribute('data-content');

        // Prevent the default link behavior
        event.preventDefault();

        // Set all buttons to "inactive"
        buttons.forEach(button => {
            button.setAttribute('class', '');
        });
        
        // Get the value of the "data-content" attribute of the clicked button
        const content = button.getAttribute('data-content');

        // Increment the click counter for the word cloud button
        if (content === 'wordcloud') {
            wordCloudButtonClicks++;
        }
        //console.log(wordCloudButtonClicks);

        // Update the content in the "container" div based on the value of the "data-content" attribute
        if (content === 'music') {
            document.getElementById('container').innerHTML = "<h2>Melodía</h2><br>Volvé a escuchar la melodía<br>";
            document.getElementById('container').appendChild(audioPlayer);
            button.setAttribute('class', "active");
        } else if (content === 'wordcloud') {
            document.getElementById('container').innerHTML = '<h2>Conceptos predominantes</h2><br>';
            document.getElementById('container').appendChild(wordCloud);
            console.log(container);
            if (wordCloudButtonClicks === 1) {
                var tagCloud = TagCloud(tagContainer, words, options);
            };
            button.setAttribute('class', "active");
        } else if (content === 'thermometer') {
            document.getElementById('container').innerHTML = '<h2>Termómetro emocional</h2><br>';
            button.setAttribute('class', "active");
        } else if (content === 'images') {
            document.getElementById('container').innerHTML = '<h2>Imagen</h2><br>';
            document.getElementById('container').appendChild(image);
            button.setAttribute('class', "active");
        } else if (content === 'you-and-others') {
            document.getElementById('container').innerHTML = '<h2>Vos y el resto</h2><br>';
            button.setAttribute('class', "active");
        } else if (content === 'songs') {
            document.getElementById('container').innerHTML = '<h2>Canciones representativas</h2><iframe src="playlist.html"  width="100%" height="1000px" style="border:none;"></iframe>';
            button.setAttribute('class', "active");
        }
    });
});

