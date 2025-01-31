
// Get the reference to the input box where the user will type text
const input = document.getElementById("input");

// Function to reverse a given string
function reverseString(str){
    // Split the string, reverse the array, and join it back into a string
    return str.split("").reverse().join("");
}

// Function to check if the input is a palindrome
function check(){
    const value = input.value; // Get the user's input
    const reverse = reverseString(value); // Get the reversed version of the input

    // If the input and the reversed version are the same, it's a palindrome
    if(value === reverse){
        alert("P A L E N D R O M"); // Show message if it's a palindrome
    } else {
        alert("Not today!"); // Show message if it's not a palindrome
    }

    input.value = ""; // Clear the input box after checking
}
