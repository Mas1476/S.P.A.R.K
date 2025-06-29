const micBtn = document.getElementById("micBtn");
const chatBox = document.getElementById("chatBox");

const responses = {
  hello: "Hello there! I am SPARK, your AI assistant.",
  salam: "Wa Alaikum Assalam! How can I help you?",
  name: "I am S.P.A.R.K. – your Smart Processing Artificial Responsive Knowledgebase.",
  time: () => "Current time is: " + new Date().toLocaleTimeString(),
  date: () => "Today's date is: " + new Date().toLocaleDateString(),
  bye: "Goodbye! Have a productive day!",
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en";
  speechSynthesis.speak(utter);
}

function respond(message) {
  const msg = message.toLowerCase();
  let reply = "I'm not sure how to respond to that.";

  for (const key in responses) {
    if (msg.includes(key)) {
      reply = typeof responses[key] === "function" ? responses[key]() : responses[key];
      break;
    }
  }

  addMessage("user", message);
  addMessage("bot", reply);
  speak(reply);
}

function addMessage(type, text) {
  const div = document.createElement("div");
  div.className = type;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function startListening() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    respond(transcript);
  };
}

micBtn.addEventListener("click", () => {
  startListening();
});
