
// Get the first <body> element in the document
const body = document.getElementsByTagName("body")[0];

// Function to set the background color of the body
function setColor(name) {
    // Change the body's background color to the specified color name
    body.style.backgroundColor = name;
}

// Function to generate and apply a random background color
function randomColor() {
    // Generate random values for red, green, and blue (0 to 255)
    const red = Math.round(Math.random() * 255); 
    const green = Math.round(Math.random() * 255); 
    const blue = Math.round(Math.random() * 255); 

    // Create an RGB color string from the random values
    const color = `rgb(${red},${green},${blue})`;

    // Set the body's background color to the random color
    body.style.backgroundColor = color;
}


