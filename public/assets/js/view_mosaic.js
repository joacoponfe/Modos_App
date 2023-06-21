// Function to fetch local images and display them as a mosaic
function displayImageMosaic() {
    // Array of image URLs
    var imageUrls = [
        "images/stable_diff/stable_diff.jpg",
        "images/singularidad_star.png",
        "images/locrio_QR.png",
        "images/iconos_auriculares_solo.png",
    ];

    // Container element for the mosaic
    var mosaicContainer = document.getElementById("imageMosaic");

    // Create the mosaic container
    var mosaicGrid = document.createElement("div");
    mosaicGrid.className = "mosaic-grid";

    // Loop through the image URLs and create mosaic tiles
    for (var i = 0; i < imageUrls.length; i++) {
        // Create the tile container
        var tileContainer = document.createElement("div");
        tileContainer.className = "image-tile";

        // Create the image element
        var image = document.createElement("img");
        image.src = imageUrls[i];
        image.alt = "Image " + (i + 1);

        // Create the text element
        var text = document.createElement("p");
        text.textContent = "Generado por la mente de las iniciales " + (i + 1);

        // Append the image and text to the tile container
        tileContainer.appendChild(image);
        tileContainer.appendChild(text);

        // Append the tile container to the mosaic container
        mosaicGrid.appendChild(tileContainer);
    }

    // Append the mosaic grid to the mosaic container
    mosaicContainer.appendChild(mosaicGrid);
}

// Call the function to display the image mosaic
displayImageMosaic();