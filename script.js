const scenarios = {
  greeting: [
    "Hello",
    "Good morning",
    "How can I help you?"
  ],
  registration: [
    "May I have your name?",
    "Do you have an appointment?",
    "Please wait here"
  ],
  direction: [
    "Go straight",
    "Turn left",
    "First floor"
  ]
};

// โหลดประโยค
function loadScenario(type) {
  const list = document.getElementById("phraseList");
  list.innerHTML = "";

  scenarios[type].forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;

    // กดแล้วพูด
    li.onclick = () => speak(text);

    list.appendChild(li);
  });
}

// พูดเสียง
function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
}

// ฝึกพูด (mock)
function startSpeaking() {
  document.getElementById("speechResult").innerText =
    "🎧 ได้ยินว่า: Hello (mock)";
}

// AI Chat mock
function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const userText = input.value;
  if (!userText) return;

  chatBox.innerHTML += `<p>👩‍⚕️: ${userText}</p>`;

  // AI ตอบแบบง่าย
  let reply = "I understand.";
  if (userText.toLowerCase().includes("hello")) {
    reply = "Hello, how can I help you?";
  }

  chatBox.innerHTML += `<p>🤖: ${reply}</p>`;

  input.value = "";
}
