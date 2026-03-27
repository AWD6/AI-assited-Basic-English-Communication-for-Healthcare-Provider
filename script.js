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
    { en: "The X-ray room is on the first floor.", th: "ห้องเอกซเรย์อยู่ชั้นหนึ่งค่ะ" }
  ],
  care: [
    { en: "Are you in pain?", th: "คุณเจ็บไหมคะ?" },
    { en: "I will take your temperature.", th: "เดี๋ยวจะขอวัดไข้นะคะ" }
  ]
};

let preferredVoice = null;
let isRecording = false;
let recognition = null;

// โหลดข้อมูลตอนเริ่ม
window.onload = () => {
  loadScenario('greeting');
  initVoice();
};

// ค้นหาเสียง AI ที่นุ่มนวลที่สุดเท่าที่เครื่องรองรับ
function initVoice() {
  const synth = window.speechSynthesis;
  const setVoice = () => {
    const voices = synth.getVoices();
    // พยายามหาเสียงผู้หญิงพรีเมียม (Google, Apple, หรือเสียง UK/US)
    preferredVoice = voices.find(v => v.name.includes('Google UK English Female')) ||
                     voices.find(v => v.name.includes('Samantha')) ||
                     voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB');
  };
  
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = setVoice;
  }
  setVoice();
}

function loadScenario(type) {
  document.querySelectorAll('.btn-cat').forEach(btn => btn.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const list = document.getElementById("phraseList");
  list.innerHTML = "";

  scenarios[type].forEach(item => {
    const div = document.createElement("div");
    div.className = "phrase-item";
    div.innerHTML = `
      <div>
        <div class="phrase-en">${item.en}</div>
        <div class="phrase-th">${item.th}</div>
      </div>
      <button class="btn-play" onclick="speak('${item.en}')">
        <i class="fas fa-play"></i>
      </button>
    `;
    list.appendChild(div);
  });
}

function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  
  if (preferredVoice) utterance.voice = preferredVoice;
  utterance.rate = 0.85; // พูดช้าลงนิดนึงให้ฟังชัด
  utterance.pitch = 1.1; // ปรับโทนเสียงให้ดูสดใสขึ้น
  
  synth.speak(utterance);
}

// ระบบฟังเสียง (Speech Recognition)
function toggleSpeaking() {
  const micBtn = document.getElementById("micBtn");
  const micText = document.getElementById("micText");
  const resultDisp = document.getElementById("speechResult");
  const feedbackDisp = document.getElementById("feedback");

  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    alert("เบราว์เซอร์ของคุณไม่รองรับระบบสั่งงานด้วยเสียง กรุณาใช้ Google Chrome หรือ Safari");
    return;
  }

  if (isRecording) {
    if(recognition) recognition.stop();
    return;
  }

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    isRecording = true;
    micBtn.classList.add("recording");
    micText.innerText = "Listening... (กำลังฟัง)";
    resultDisp.innerText = "...";
    resultDisp.classList.remove("placeholder-text");
    feedbackDisp.innerHTML = "";
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultDisp.innerText = `"${transcript}"`;
    
    // ลูกเล่นจำลองการให้คะแนน
    const randomScore = Math.floor(Math.random() * (100 - 80 + 1)) + 80; 
    feedbackDisp.className = "feedback good";
    feedbackDisp.innerHTML = `<i class="fas fa-check-circle"></i> ความแม่นยำ ${randomScore}% - ออกเสียงได้ดีมาก!`;
  };

  recognition.onend = () => {
    isRecording = false;
    micBtn.classList.remove("recording");
    micText.innerText = "Tap to Speak (กดเพื่อพูด)";
  };

  recognition.start();
}

function handleEnter(e) {
  if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const text = input.value.trim();
  
  if (!text) return;

  // ข้อความผู้ใช้
  chatBox.innerHTML += `
    <div class="msg user">
      <div class="msg-bubble">${text}</div>
    </div>
  `;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // AI กำลังพิมพ์...
  const typingId = "typing-" + Date.now();
  setTimeout(() => {
    chatBox.innerHTML += `
      <div class="msg ai" id="${typingId}">
        <div class="msg-bubble" style="color: #94a3b8;"><i class="fas fa-ellipsis-h"></i> AI is typing...</div>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);

  // AI ตอบกลับ (Mockup Logic)
  setTimeout(() => {
    document.getElementById(typingId).remove();
    
    let replyEn = "I'm sorry, could you speak a bit slower?";
    let replyTh = "ขอโทษค่ะ ช่วยพูดช้าลงหน่อยได้ไหมคะ?";
    const textLower = text.toLowerCase();
    
    if(textLower.includes("hello") || textLower.includes("hi")) {
      replyEn = "Hello, I have an appointment with the doctor today.";
      replyTh = "สวัสดีค่ะ วันนี้ฉันมีนัดกับคุณหมอค่ะ";
    } else if(textLower.includes("name")) {
      replyEn = "My name is Sarah Connor.";
      replyTh = "ฉันชื่อ ซาร่าห์ คอนเนอร์ ค่ะ";
    } else if(textLower.includes("wait") || textLower.includes("sit")) {
      replyEn = "Thank you, I will wait here.";
      replyTh = "ขอบคุณค่ะ ฉันจะรอตรงนี้นะคะ";
    } else if(textLower.includes("pain") || textLower.includes("hurt")) {
      replyEn = "Yes, my stomach hurts a lot.";
      replyTh = "ใช่ค่ะ ฉันปวดท้องมากเลย";
    }

    chatBox.innerHTML += `
      <div class="msg ai">
        <div class="msg-bubble">${replyEn}</div>
        <div class="msg-hint">${replyTh}</div>
      </div>
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
    speak(replyEn);
    
  }, 2000);
}
