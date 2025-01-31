let prompt = document.querySelector("#prompt");
let chatContainer = document.querySelector(".chat-container");
let imagebtn = document.querySelector("#image");
let imageInput = document.querySelector("#image input");
let image = document.querySelector(".fa-image");

const API__URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBbgwXboBSzNr60DjRq_7fE9BI__atZ6d8";

let user = {
  message: null,
  file: {
    mime_type: null,
    data: null,
  },
};

async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");
  let requestBody = {
    contents: [
      {
        parts: [
          { text: user.message },
          ...(user.file.data ? [{ inline_data: user.file }] : []),
        ],
      },
    ],
  };

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    let response = await fetch(API__URL, requestOptions);
    let data = await response.json();

    let apiResponse =
      data?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "$1")
        ?.trim() || "Sorry, I couldn't process your request.";

    text.innerHTML = apiResponse;
  } catch (error) {
    console.error(error);
    text.innerHTML = "Error: Unable to fetch response. Please try again.";
  } finally {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "smooth",
    });
  }
}

function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handleChatResponse(userMessage) {
  if (!userMessage.trim()) return;

  user.message = userMessage;
  let userHtml = `
    <img src="user.jpg" id="userImage" width="10%">
    <div class="user-chat-area">
      ${user.message}
      ${
        user.file.data
          ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />`
          : ""
      }
    </div>
  `;
  prompt.value = "";

  let userChatBox = createChatBox(userHtml, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  chatContainer.scrollTo({
    top: chatContainer.scrollHeight,
    behavior: "smooth",
  });

  setTimeout(() => {
    let aiHtml = `
      <img src="ai.jpg" id="aiImage" width="10%" alt="AI">
      <div class="ai-chat-area">
        <img src="load.gif" alt="Loading..." class="load" width="50px">
      </div>
    `;
    let aiChatBox = createChatBox(aiHtml, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);

    generateResponse(aiChatBox);
  }, 600);
}

prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleChatResponse(prompt.value);
  }
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) {
    console.error("No file selected!");
    return;
  }

  const reader = new FileReader();

  // When the file is loaded, set it as the background of the image button
  reader.onload = (event) => {
    const base64string = event.target.result;

    // Set the chosen image as the button's background
    imagebtn.style.backgroundImage = `url(${base64string})`;
    imagebtn.style.backgroundSize = "cover"; // Ensure the image fills the button
    imagebtn.style.backgroundPosition = "center"; // Center the image
    imagebtn.style.borderRadius = "50%"; // Optional: Make it circular
    image.style.display = "none";
    

    // Update the `user.file` object
    user.file = {
      mime_type: file.type,
      data: base64string.split(",")[1], // Only Base64 data
    };

    console.log("Image preview updated on the button!");
  };

  reader.readAsDataURL(file);
});

imagebtn.addEventListener("click", () => {
  imageInput.click();
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
