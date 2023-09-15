import { url } from "./config.js";
import { language } from "./config.js";
import esTranslations from '../locales/es.json' assert { type: "json" };
import enTranslations from '../locales/en.json' assert { type: "json" };

// Set dictionary for translation
const translations = {
    es: esTranslations,
    en: enTranslations,
  };

// Create request object
const object = {'id_melody_mode':id_melody_mode};

const requestJSON = JSON.stringify(object);

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

// Function to fetch local images and display them as a mosaic
async function updateData() {
    const response = await query(requestJSON);
    const modeData = await response.json();
    console.log(modeData);

    // Get array of images in base64 format
    const imageUrls = modeData['image_list'];
    
    var num_participants = modeData['num_participants'];
    var numberElement = document.querySelector('.number');
    // Set the new value for the element
    var newNumber = num_participants;
    numberElement.textContent = newNumber;

    // Change color of text
    const rootStyles = getComputedStyle(document.documentElement);
    const main_colors = {'jonico': rootStyles.getPropertyValue('--bs-cyan'), 'dorico': rootStyles.getPropertyValue('--bs-yellow'), 'frigio': rootStyles.getPropertyValue('--bs-pink'), 'lidio': rootStyles.getPropertyValue('--bs-purple'), 'mixolidio': rootStyles.getPropertyValue('--bs-red'), 'eolico': rootStyles.getPropertyValue('--bs-orange'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green')};
    const main_colors_transparent = {'jonico': rootStyles.getPropertyValue('--bs-cyan-transparent'), 'dorico': rootStyles.getPropertyValue('--bs-yellow-transparent'), 'frigio': rootStyles.getPropertyValue('--bs-pink-transparent'), 'lidio': rootStyles.getPropertyValue('--bs-purple-transparent'), 'mixolidio': rootStyles.getPropertyValue('--bs-red-transparent'), 'eolico': rootStyles.getPropertyValue('--bs-orange-transparent'), 'locrio': rootStyles.getPropertyValue('--bs-mustard-green-transparent')};
    document.documentElement.style.setProperty('--main-color', main_colors[id_melody_mode]);
    document.documentElement.style.setProperty('--main-color-transparent', main_colors_transparent[id_melody_mode]);
    
    // Array of image URLs
    // var imageUrls = [
    //     "images/stable_diff/AMG555_lo1.jpg",
    //     "images/stable_diff/ASW912_ej.jpg",
    //     "images/stable_diff/BAM490_f2.jpg",
    //     "images/stable_diff/RAG239_f5.jpg",
    //     "images/stable_diff/GDG532_j6.jpg",
    //     "images/stable_diff/IS787_e7.jpg",
    //     "images/stable_diff/LPC332_li1.jpg",
    //     "images/stable_diff/DES111_j7.jpg"
    // ];
    //var initials = ['AMG', 'ASW', 'BAM','RAG', 'GDG', 'IS', 'LPC', 'DES'];

    // Container element for the mosaic
    var mosaicGrid = document.getElementById("imageMosaic");

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
    // // Append the mosaic grid to the mosaic container
    // mosaicContainer.appendChild(mosaicGrid);

    // Get current timestamp
    var current_timestamp = new Date();
    console.log('Datos actualizados exitosamente: '.concat(current_timestamp.toString()).concat('.'));
}


// Call updateData function initially
updateData().then((response) => {
    //console.log('Datos actualizados exitosamente.');
})
.catch((error) => {
    console.log("El servidor está caído.");
    window.location.href = "server_down.html";
});