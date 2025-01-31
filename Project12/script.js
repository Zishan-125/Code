
let boxes = document.querySelectorAll(".boxes");
let turn1 = document.querySelector(".turn1");
let turn2 = document.querySelector(".turn2");
let msg = document.querySelector(".msg");
let span = document.querySelector("#result");
let reset = document.getElementById("reset");
let ng = document.getElementById("ng");

let turnX = true;
let clickSound = new Audio("snap.mp3");
let winnerSound = new Audio("win.mp3");
let drawSound = new Audio("draw.mp3"); // Sound effect for a draw
let resetSound = new Audio("reset.mp3");
let WinnerCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Reset button event listener
reset.addEventListener("click", () => {
    resetSound.play();
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.add("hover");
        box.classList.remove("highlight"); // Remove highlight from winning boxes
    });
    msg.classList.add("hide");
    turnX = true;
});

// New game button event listener
ng.addEventListener("click", () => {
    resetSound.play();
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.add("hover");
        box.classList.remove("highlight"); // Remove highlight from winning boxes
    });
    msg.classList.add("hide");
    turnX = true;
});

// Add click event to each box
boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting of already marked boxes
        clickSound.play();

        if (turnX) {
            box.innerText = "X";
            box.style.color = "rgb(28, 28, 167)";
            turn2.classList.add("b-s");
            turn1.classList.remove("b-s");
            turnX = false;
        } else {
            box.innerText = "O";
            box.style.color = "rgb(53, 125, 137)";
            turn1.classList.add("b-s");
            turn2.classList.remove("b-s");
            turnX = true;
        }
        checkWinnerOrDraw();
    });
});

// Check winner or draw function
function checkWinnerOrDraw() {
    // Check for a winner
    for (let condition of WinnerCondition) {
        let box1 = boxes[condition[0]].innerText;
        let box2 = boxes[condition[1]].innerText;
        let box3 = boxes[condition[2]].innerText;

        if (box1 !== "" && box1 === box2 && box2 === box3) {
            showResult(box1);
            winnerSound.play();
            highlightWinner(condition); // Highlight winning boxes
            return;
        }
    }

    // Check for a draw
    let allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allFilled) {
        showResult("Draw");
        drawSound.play();
    }
}

// Show result function
function showResult(result) {
    boxes.forEach(box => {
        box.disabled = true;
        box.classList.remove("hover");
    });

    msg.classList.remove("hide");
    if (result === "Draw") {
        span.innerText = result;
        span.style.color = "orange";
    } else {
        span.innerText = result;
        if (result === "X") {
            span.style.color = "rgb(28, 28, 167)";
        } else {
            span.style.color = "rgb(53, 125, 137)";
        }
    }
}

// Highlight winning boxes function
function highlightWinner(condition) {
    condition.forEach(index => {
        boxes[index].classList.add("highlight"); // Add highlight class to winning boxes
    });
}



