import { url } from "./config.js";
import { language } from "./config.js";
import esTranslations from '../locales/es.json' assert { type: "json" };
import enTranslations from '../locales/en.json' assert { type: "json" };

// Set dictionary for translation
const translations = {
    es: esTranslations,
    en: enTranslations,
  };


var modes = ['jonico', 'lidio', 'mixolidio',"dorico", "frigio", "eolico", "locrio"];
var currentIndex = 0; // Initialize the index

// Function to update id_melody_mode and cycle through major_modes
function updateMelodyMode() {
    id_melody_mode = modes[currentIndex];
    currentIndex = (currentIndex + 1) % modes.length; // Cycle through the list
  }

// Function to update the "h1" (Titulo de la página) text
function updateTitleText(mode) {
    const ionianModeElement = document.getElementById('dorian_mode');
    ionianModeElement.style.opacity = 0; // Start the fade-out effect
    setTimeout(() => {
      ionianModeElement.textContent = `Modo ${mode}`; // Update the text
      ionianModeElement.style.opacity = 1; // Start the fade-in effect
    }, 700); // Adjust the duration to match your CSS transition (0.5s in this example)
  }

  function updateNumberText(Number) {
    const num = document.getElementById('num');
    num.style.transition = "opacity 1s"; // Add a CSS transition property
  
    // Start the fade-out effect
    num.style.opacity = 0;
  
    setTimeout(() => {
      num.textContent = Number.toString(); // Update the text
  
      // Start the fade-in effect
      num.style.opacity = 1;
    }, 1000); // Adjust the duration to match your CSS transition (0.5s in this example)
  }



// Function to fetch local images and display them as a mosaic
async function updateData() {
     // Define id_melody_mode locally
     let id_melody_mode = modes[currentIndex];

    async function query(id_melody_mode) {
        const response = await fetch(
            url + "/profiles_api/mode_data/",
            {
                headers: new Headers({ 'Content-type': 'application/json' }),
                method: "POST",
                body: id_melody_mode,
            }
        );
        const result = await response;
        return result;
    }


     // Create request object
     const object = { 'id_melody_mode': id_melody_mode };
     const requestJSON = JSON.stringify(object);

     const response = await query(requestJSON);
    const modeData = await response.json();
    console.log(modeData);

    // Get array of images in base64 format
    const imageUrls = modeData['image_list'];
    
    var num_participants = modeData['num_participants'];
    // Set the new value for the element
     var newNumber = num_participants;
     updateNumberText(newNumber);

     // Update the title with the current mode
    updateTitleText(id_melody_mode);


    // Clear existing image tiles
    var mosaicGrid = document.getElementById("imageMosaic");
     // Apply a brief timeout before fading out the mosaic container
    mosaicGrid.style.transition = "opacity 1s"; // Add a CSS transition property
    mosaicGrid.style.opacity = 0;
    mosaicGrid.innerHTML = ""; // Clear the container

    // Change color of text
    const rootStyles = getComputedStyle(document.documentElement);
    const main_colors = {'jonico': rootStyles.getPropertyValue('--bs-cyan'), 'dorico': rootStyles.getPropertyValue('--bs-yellow'), 'frigio': rootStyles.getPropertyValue('--bs-pink'), 'lidio': rootStyles.getPropertyValue('--bs-purple'), 'mixolidio': rootStyles.getPropertyValue('--bs-red'), 'eolico': rootStyles.getPropertyValue('--bs-orange'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green')};
    const main_colors_transparent = {'jonico': rootStyles.getPropertyValue('--bs-cyan-transparent'), 'dorico': rootStyles.getPropertyValue('--bs-yellow-transparent'), 'frigio': rootStyles.getPropertyValue('--bs-pink-transparent'), 'lidio': rootStyles.getPropertyValue('--bs-purple-transparent'), 'mixolidio': rootStyles.getPropertyValue('--bs-red-transparent'), 'eolico': rootStyles.getPropertyValue('--bs-orange-transparent'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green-transparent')};
    document.documentElement.style.setProperty('--main-color', main_colors[id_melody_mode]);
    document.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_mode]);


    // Loop through the image URLs and create mosaic tiles
    for (var i = 0; i < imageUrls.length; i++) {
        // Create the tile container
        var tileContainer = document.createElement("div");
        tileContainer.className = "image-tile";
        
        // Create the image element
        var image = document.createElement("img");
        //image.src = imageUrls[i];
        image.src = 'data:image/png;base64,'.concat(imageUrls[i]['image']); 
        image.alt = "Image " + (i + 1);
        image.style.borderRadius = "10px";

        // Create the text element
        var text = document.createElement("p");
        text.classList.add("img-caption");
        //text.textContent = "Generado por la mente de " + imageUrls[i]['user'];
        text.textContent = translations[language]['view_mosaic']['generated_by'] + imageUrls[i]['user'];

        // Append the image and text to the tile container
        tileContainer.appendChild(image);
        tileContainer.appendChild(text);

        // Append the tile container to the mosaic container
        mosaicGrid.appendChild(tileContainer);
    }
    
     // Apply a brief timeout before fading in the mosaic container
     setTimeout(() => {
        // Fade in the mosaic container
        mosaicGrid.style.opacity = 1;
    }, 350); // Adjust the duration to match your CSS transition (0.5s in this example)
}


// Call updateData function initially
updateMelodyMode(); // Update the initial mode
updateData().then((response) => {
    //console.log('Datos actualizados exitosamente.');
})
// .catch((error) => {
//     console.log("El servidor está caído.");
//     window.location.href = "server_down.html";
// });

// Call updateData function every minute
setInterval(() => {
    updateMelodyMode(); // Update id_melody_mode
    console.log(id_melody_mode);
    updateData().then((response) => {
    });
}, 5 * 1000); // 60 seconds = 1 minute