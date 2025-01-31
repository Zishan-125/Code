// বোর্ড এলিমেন্ট খুঁজে বের করা
let board = document.querySelector(".board");

// খাবার এবং সাপের অবস্থানের জন্য প্রয়োজনীয় ভেরিয়েবল ডিক্লেয়ার করা
let FoodX, FoodY; // খাবারের অবস্থান
let SnakeBody = []; // সাপের শরীরের অংশ
let SnakeX = 3; // সাপের হেডের প্রাথমিক এক্স-কোঅর্ডিনেট
let SnakeY = 5; // সাপের হেডের প্রাথমিক ওয়াই-কোঅর্ডিনেট
let velocityX = 0; // সাপের এক্স-দিকের গতি
let velocityY = 0; // সাপের ওয়াই-দিকের গতি
let gameOver = false; // গেম ওভার হয়েছে কিনা তা চেক করার জন্য
let setIntervalID; // ইন্টারভ্যাল আইডি সংরক্ষণ করার জন্য

// স্কোর এবং হাই স্কোর ডিক্লেয়ার করা
let score = 0; // প্রাথমিক স্কোর
let highScore = localStorage.getItem("highScore") || 0; // আগের হাই স্কোর লোড করা (না থাকলে ০)

// স্কোর এবং হাই স্কোর দেখানোর জন্য এলিমেন্ট তৈরি করা
let scoreDisplay = document.createElement("div");
let highScoreDisplay = document.createElement("div");
let controls = document.createElement("div");

// সাউন্ড ফাইল লোড করা
let gameOverSound = new Audio("gameover.mp3");
let turnSound = new Audio("turn.mp3");
let eatSound = new Audio("eatsound.mp3");

// বোতাম নিয়ন্ত্রণের জন্য
let keys = document.querySelectorAll(".key");

// স্কোর এবং হাই স্কোর দেখানোর জন্য HTML-এ এলিমেন্ট যুক্ত করা
scoreDisplay.classList.add("score-display");
highScoreDisplay.classList.add("high-score-display");
controls.classList.add("controls");
document.body.insertBefore(scoreDisplay, board);
document.body.insertBefore(highScoreDisplay, board);

// স্কোর এবং হাই স্কোর আপডেট দেখানোর ফাংশন
function updateScoreDisplay() {
    scoreDisplay.innerHTML = `Score: ${score}`;
    highScoreDisplay.innerHTML = `HighScore: ${highScore}`;
}

// খাবারের জন্য র‍্যান্ডম পজিশন তৈরি করা
function randomFoodPosition() {
    FoodX = Math.floor(Math.random() * 14) + 1; // এক্স পজিশন
    FoodY = Math.floor(Math.random() * 14) + 1; // ওয়াই পজিশন
}

// সাপের গতিবিধি নিয়ন্ত্রণ করা
function moveSnake(e) {
    let turned = false; // সাপ ঘুরেছে কিনা চেক করা
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        turned = true;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        turned = true;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        turned = true;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        turned = true;
    }

    // সাপ ঘুরলে সাউন্ড বাজানো
    if (turned) {
        turnSound.play();
    }

    main();
}

// স্ক্রিনের ভার্চুয়াল কী বোতামের জন্য ইভেন্ট লিস্টেনার যোগ করা
keys.forEach((key) => {
    key.addEventListener("click", () => moveSnake({ key: key.dataset.key }));
});

// গেম ওভার দেখানোর জন্য
function showGameOver() {
    clearInterval(setIntervalID); // গেম থামানো
    gameOverSound.play(); // গেম ওভার সাউন্ড বাজানো
    document.removeEventListener("keydown", moveSnake);

    // হাই স্কোর আপডেট করা
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore); // নতুন হাই স্কোর সেভ করা
    }
    updateScoreDisplay(); // স্কোর আপডেট দেখানো
}

// গেমের মূল লজিক
function main() {
    if (gameOver) {
        return showGameOver(); // গেম ওভার হলে ফাংশন বন্ধ করা
    }

    // সাপ খাবার খায় কিনা চেক করা
    if (SnakeX === FoodX && SnakeY === FoodY) {
        randomFoodPosition(); // নতুন খাবারের পজিশন সেট করা
        eatSound.play(); // খাবার খাওয়ার সাউন্ড বাজানো
        SnakeBody.push([]); // সাপের শরীরের নতুন অংশ যোগ করা
        score += 8; // স্কোর বাড়ানো
        updateScoreDisplay(); // স্কোর দেখানো
    }

    // সাপের শরীর আপডেট করা
    for (let i = SnakeBody.length - 1; i > 0; i--) {
        SnakeBody[i] = [...SnakeBody[i - 1]];
    }

    // সাপের মাথার পজিশন আপডেট করা
    SnakeX += velocityX;
    SnakeY += velocityY;
    SnakeBody[0] = [SnakeX, SnakeY];

    // সাপ দেয়াল বা নিজের সাথে ধাক্কা খায় কিনা চেক করা
    if (SnakeX <= 0 || SnakeX > 14 || SnakeY <= 0 || SnakeY > 14) {
        gameOver = true;
    }
    for (let i = 1; i < SnakeBody.length; i++) {
        if (SnakeBody[0][0] === SnakeBody[i][0] && SnakeBody[0][1] === SnakeBody[i][1]) {
            gameOver = true;
        }
    }

    // বোর্ড রেন্ডার করা
    let setHtml = `<div class="food" style="grid-area: ${FoodY} / ${FoodX};"></div>`;
    for (let i = 0; i < SnakeBody.length; i++) {
        setHtml += `<div class="snake-head" id="div${i}" style="grid-area: ${SnakeBody[i][1]} / ${SnakeBody[i][0]};"></div>`;
    }
    board.innerHTML = setHtml;
}

// গেম শুরুর সেটআপ
randomFoodPosition(); // প্রথম খাবারের পজিশন সেট করা
main(); // গেম শুরু করা
setIntervalID = setInterval(main, 500); // গেম লুপ
document.addEventListener("keydown", moveSnake); // কীবোর্ড নিয়ন্ত্রণ যোগ করা

// নতুন গেম শুরু করার জন্য রিসেট ফাংশন
function reset() {
    location.reload(); // পেজ রিলোড করে নতুন গেম শুরু করা
}

// স্কোর এবং হাই স্কোরের প্রাথমিক আপডেট
updateScoreDisplay();


