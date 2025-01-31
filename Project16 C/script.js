// Selectors
const htmlInput = document.querySelector(".html-editor textarea");
const cssInput = document.querySelector(".css-editor textarea");
const jsInput = document.querySelector(".js-editor textarea");

const save = document.querySelector("#save");
const output = document.querySelector("#output");
const outputContainer = document.querySelector(".output-container");
const up = document.querySelector("#up");
const copyButtons = document.querySelectorAll(".copy");

// Function to Update Preview
function updatePreview() {
  // Get the iframe's document
  const iframeDoc = output.contentDocument || output.contentWindow.document;

  try {
    // Write the combined HTML, CSS, and JavaScript into the iframe
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${cssInput.value}</style>
      </head>
      <body>
        ${htmlInput.value}
        <script>${jsInput.value}<\/script>
      </body>
      </html>
    `);
    iframeDoc.close();
    showTemporaryMessage("Preview updated successfully!", "success");
  } catch (err) {
    showTemporaryMessage("Error in rendering preview. Check your code!", "error");
  }
}

// Event Listener for Save Button
save.addEventListener("click", updatePreview);

// Toggle Fullscreen for Output
up.addEventListener("click", () => {
  outputContainer.classList.toggle("output-full-active");
  up.style.transform = outputContainer.classList.contains("output-full-active")
    ? "rotate(180deg)"
    : "rotate(0deg)";
  const mode = outputContainer.classList.contains("output-full-active")
    ? "Fullscreen Mode Activated"
    : "Fullscreen Mode Deactivated";
  showTemporaryMessage(mode, "info");
});

// Copy Button Logic
copyButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let textToCopy = "";
    if (btn.classList.contains("copy1")) {
      textToCopy = htmlInput.value;
    } else if (btn.classList.contains("copy2")) {
      textToCopy = cssInput.value;
    } else {
      textToCopy = jsInput.value;
    }

    navigator.clipboard.writeText(textToCopy).then(
      () => {
        showTemporaryMessage("Code copied to clipboard!", "success");
      },
      () => {
        showTemporaryMessage("Failed to copy code.", "error");
      }
    );
  });
});

// Temporary Message Function
function showTemporaryMessage(message, type) {
  const messageBox = document.createElement("div");
  messageBox.textContent = message;
  messageBox.style.position = "fixed";
  messageBox.style.bottom = "20px";
  messageBox.style.right = "20px";
  messageBox.style.padding = "10px 20px";
  messageBox.style.borderRadius = "5px";
  messageBox.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
  messageBox.style.color = "#fff";
  messageBox.style.zIndex = "1000";
  messageBox.style.transition = "opacity 0.3s ease-in-out";
  messageBox.style.opacity = "1";

  // Apply Styling Based on Message Type
  switch (type) {
    case "success":
      messageBox.style.backgroundColor = "#28a745";
      break;
    case "error":
      messageBox.style.backgroundColor = "#dc3545";
      break;
    case "info":
      messageBox.style.backgroundColor = "#007bff";
      break;
    default:
      messageBox.style.backgroundColor = "#333";
  }

  document.body.appendChild(messageBox);

  // Remove Message After 3 Seconds
  setTimeout(() => {
    messageBox.style.opacity = "0";
    setTimeout(() => messageBox.remove(), 300);
  }, 3000);
}

document.getElementById("currentYear").textContent = new Date().getFullYear();

