

let display = document.querySelector("#display");

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function sinf() {
    display.value = Math.sin(toRadians(parseFloat(display.value)));
}

function cosf() {
    display.value = Math.cos(toRadians(parseFloat(display.value)));
}

function tanf() {
    const value = parseFloat(display.value);
    if (value % 180 === 90) {
        display.value = "Undefined Value"; // Tan 90, 270, etc., is undefined
    } else {
        display.value = Math.tan(toRadians(value));
    }
}



function sqrtf(){
    display.value= Math.sqrt(display.value);
}