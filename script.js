const scenarios = {
  greeting: [
    { en: "Hello, welcome to our hospital.", th: "สวัสดีค่ะ ยินดีต้อนรับสู่โรงพยาบาลค่ะ" },
    { en: "How can I help you today?", th: "วันนี้มีอะไรให้ช่วยไหมคะ?" },
    { en: "Please have a seat here.", th: "เชิญนั่งตรงนี้ก่อนค่ะ" }
  ],
  registration: [
    { en: "May I have your name, please?", th: "ขอทราบชื่อด้วยค่ะ" },
    { en: "Do you have an appointment?", th: "ได้นัดไว้หรือเปล่าคะ?" },
    { en: "Please wait a moment.", th: "กรุณารอสักครู่ค่ะ" }
  ],
  direction: [
    { en: "Go straight and turn left.", th: "เดินตรงไปแล้วเลี้ยวซ้ายค่ะ" },
    { en: "The X-ray room is on the second floor.", th: "ห้องเอกซเรย์อยู่ชั้นสองค่ะ" }
  ],
  care: [
    { en: "Are you in pain?", th: "คุณเจ็บไหมคะ?" },
    { en: "I will take your temperature.", th: "เดี๋ยวจะขอวัดไข้นะคะ" }
  ]
};

// โหลดประโยคเมื่อเริ่มแอป
window.onload = () => loadScenario('greeting');

function loadScenario(type) {
  // Update UI buttons
  document.querySelectorAll('.btn-cat').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const list = document.getElementById("phraseList");
  list.innerHTML = "";

  scenarios[type].forEach(item => {
    const div = document.createElement("div");
    div.className = "phrase-item";
    div.innerHTML = `
      <div>
        <div style="font-weight:500">${item.en}</div>
        <div style="font-size:12px; color:#888">${item.th}</div>
      </div>
      <button class="btn-play"><i class="fas fa-volume-up"></i></button>
    `;
    div.onclick = () => speak(item.en);
    list.appendChild(div);
  });
}

function speak(text) {
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 0.9; // หน่วงให้ช้าลงนิดนึงเพื่อให้ฟังง่าย
  window.speechSynthesis.speak(speech);
}

// ระบบ AI Recognition ของจริง
function startSpeaking() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  
  const micBtn = document.getElementById("micBtn");
  const resultDisp = document.getElementById("speechResult");

  micBtn.style.background = "#444";
  resultDisp.innerText = "Listening...";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultDisp.innerText = "You said: " + transcript;
    micBtn.style.background = "#ff5252";
    
    // ตรงนี้สามารถเพิ่ม Logic การให้คะแนนความถูกต้องได้
  };

  recognition.onerror = () => {
    resultDisp.innerText = "Error occurred. Try again.";
    micBtn.style.background = "#ff5252";
  };

  recognition.start();
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  if (!input.value) return;

  // User Message
  chatBox.innerHTML += `<div class="msg user">${input.value}</div>`;
  
  // Simple AI Response Logic
  setTimeout(() => {
    let reply = "I'm sorry, I don't understand. Could you repeat?";
    const text = input.value.toLowerCase();
    
    if(text.includes("hello") || text.includes("hi")) reply = "Hello! I have a headache.";
    if(text.includes("name")) reply = "My name is John Doe.";
    if(text.includes("wait")) reply = "Sure, I can wait here.";

    chatBox.innerHTML += `<div class="msg ai">${reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    speak(reply);
  }, 1000);

  input.value = "";
}
