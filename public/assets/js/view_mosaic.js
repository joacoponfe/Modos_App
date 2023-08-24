// Function to fetch local images and display them as a mosaic
function displayImageMosaic() {
    // Array of image URLs
    var imageUrls = [
        "images/stable_diff/AMG555_lo1.jpg",
        "images/stable_diff/ASW912_ej.jpg",
        "images/stable_diff/BAM490_f2.jpg",
        "images/stable_diff/RAG239_f5.jpg",
        "images/stable_diff/GDG532_j6.jpg",
        "images/stable_diff/IS787_e7.jpg",
        "images/stable_diff/LPC332_li1.jpg",
        "images/stable_diff/DES111_j7.jpg"
    ];
    var initials = ['AMG', 'ASW', 'BAM','RAG', 'GDG', 'IS', 'LPC', 'DES'];

    // Container element for the mosaic
    var mosaicGrid = document.getElementById("imageMosaic");

    // // Create the mosaic container
    // var mosaicGrid = document.createElement("div");
    // mosaicGrid.className = "mosaic-grid";

    // Loop through the image URLs and create mosaic tiles
    for (var i = 0; i < imageUrls.length; i++) {
        // Create the tile container
        var tileContainer = document.createElement("div");
        tileContainer.className = "image-tile";

        // Create the image element
        var image = document.createElement("img");
        image.src = imageUrls[i];
        image.alt = "Image " + (i + 1);
        image.style.borderRadius = "10px";

        // Create the text element
        var text = document.createElement("p");
        text.textContent = "Generado por la mente de " + initials[i];

        // Append the image and text to the tile container
        tileContainer.appendChild(image);
        tileContainer.appendChild(text);

        // Append the tile container to the mosaic container
        mosaicGrid.appendChild(tileContainer);
    }

    // Append the mosaic grid to the mosaic container
    //mosaicContainer.appendChild(mosaicGrid);
}

// Call the function to display the image mosaic
displayImageMosaic();