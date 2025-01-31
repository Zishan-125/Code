

// Function to initialize functionality for each Quran-Reciter
function initializeQuranReciter(reciter) {
    const progress = reciter.querySelector("#progress");
    const surah = reciter.querySelector("#surah");
    const ctrlIcon = reciter.querySelector("#ctrlIcon");

    let intervalId = null;

    // Set up the progress slider when metadata is loaded
    surah.onloadedmetadata = function () {
        progress.max = Math.floor(surah.duration); // Ensure max is an integer
        progress.value = 0; // Start the slider at 0
    };

    // Play or pause the audio
    function playPause() {
        if (ctrlIcon.classList.contains("fa-pause")) {
            surah.pause();
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");
            clearInterval(intervalId);
        } else {
            // Pause other playing audios before starting this one
            document.querySelectorAll(".Quran-Reciter").forEach((otherReciter) => {
                const otherSurah = otherReciter.querySelector("#surah");
                const otherCtrlIcon = otherReciter.querySelector("#ctrlIcon");
                if (otherSurah !== surah) {
                    otherSurah.pause();
                    otherCtrlIcon.classList.remove("fa-pause");
                    otherCtrlIcon.classList.add("fa-play");
                    clearInterval(otherReciter.intervalId);
                }
            });

            surah.play();
            ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");

            // Update the slider as the audio plays
            intervalId = setInterval(() => {
                progress.value = Math.floor(surah.currentTime);
            }, 500);
        }
    }

    // Attach playPause function to the play button
    ctrlIcon.addEventListener("click", playPause);

    // Update the audio's current time when the slider changes
    progress.oninput = function () {
        surah.currentTime = progress.value;
    };

    // Ensure the slider reaches the end when the audio finishes
    surah.onended = function () {
        progress.value = progress.max; // Set slider to max value
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
        clearInterval(intervalId);

        // Play the next reciter automatically
        const nextReciter = reciter.nextElementSibling;
        if (nextReciter && nextReciter.classList.contains("Quran-Reciter")) {
            const nextAudio = nextReciter.querySelector("#surah");
            const nextIcon = nextReciter.querySelector("#ctrlIcon");
            if (nextAudio && nextIcon) {
                nextAudio.play();
                nextIcon.classList.add("fa-pause");
                nextIcon.classList.remove("fa-play");

                const nextProgress = nextReciter.querySelector("#progress");
                const updateNextProgress = setInterval(() => {
                    nextProgress.value = Math.floor(nextAudio.currentTime);
                }, 500);

                nextAudio.onended = function () {
                    clearInterval(updateNextProgress);
                    nextProgress.value = nextProgress.max;
                    nextIcon.classList.remove("fa-pause");
                    nextIcon.classList.add("fa-play");
                };
            }
        }
    };

    // Store the interval ID in the reciter element for cleanup
    reciter.intervalId = intervalId;
}

// Apply the initialization to all Quran-Reciter elements
document.querySelectorAll(".Quran-Reciter").forEach((reciter) => {
    initializeQuranReciter(reciter);
});

// Search Functionality
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const products = document.querySelectorAll(".Quran-Reciter");
    const surahNames = document.querySelectorAll(".Surah__Name ");
   

    surahNames.forEach((match, i) => {
        const textValue = match.textContent || match.innerHTML;
        products[i].style.display =
            textValue.toUpperCase().indexOf(searchbox) > -1 ? "" : "none";
    });
};






    
  
    




document.getElementById("currentYear").textContent = new Date().getFullYear();

// Generate QR Code for the website
const qrCodeContainer = document.getElementById("qrCode");
const websiteURL = "https://arbsofttech.com/";

if (qrCodeContainer) {
    const qrCode = new QRCode(qrCodeContainer, {
        text: websiteURL,
        width: 128, // Width of the QR Code
        height: 128, // Height of the QR Code
        colorDark: "#000000", // QR Code color
        colorLight: "#ffffff", // Background color
        correctLevel: QRCode.CorrectLevel.H, // Error correction level
    });
}

