// ข้อมูลสถานการณ์
const scenarios = {
  greeting: [
    { en: "Hello, welcome to our hospital.", th: "สวัสดีค่ะ ยินดีต้อนรับสู่โรงพยาบาลค่ะ" },
    { en: "How can I help you today?", th: "วันนี้มีอะไรให้ช่วยไหมคะ?" },
    { en: "Please wait here.", th: "กรุณารอสักครู่ตรงนี้ค่ะ" }
  ],
  registration: [
    { en: "May I have your name, please?", th: "ขอทราบชื่อด้วยค่ะ" },
    { en: "Do you have an appointment?", th: "ได้นัดไว้หรือเปล่าคะ?" }
  ],
  direction: [
    { en: "The pharmacy is on the 1st floor.", th: "ห้องยาอยู่ที่ชั้น 1 ค่ะ" },
    { en: "Go straight and turn left.", th: "เดินตรงไปแล้วเลี้ยวซ้ายค่ะ" }
  ],
  care: [
    { en: "Are you feeling better?", th: "รู้สึกดีขึ้นไหมคะ?" },
    { en: "Please take this medicine.", th: "กรุณาทานยานี้ค่ะ" }
  ]
};

let isRecording = false;
let isChatRecording = false;
let recognition = null;
let chatRec = null;

// --- 1. ฟังก์ชันเสียงผู้หญิง (พยายามหาเสียงผู้หญิงไทย/อังกฤษ) ---
function speak(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const isThai = /[\u0E00-\u0E7F]/.test(text);

  let selectedVoice = null;
  if (isThai) {
    selectedVoice = voices.find(v => v.lang.includes('th') && v.name.includes('Female')) || voices.find(v => v.lang.includes('th'));
  } else {
    selectedVoice = voices.find(v => v.name.includes('Samantha')) || voices.find(v => v.name.includes('Google UK English Female')) || voices.find(v => v.lang.includes('en'));
  }

  if (selectedVoice) utterance.voice = selectedVoice;
  utterance.rate = 0.95; 
  utterance.pitch = 1.15; // ปรับโทนให้เป็นผู้หญิงนุ่มนวล
  synth.speak(utterance);
}

// --- 2. โหลดรายการประโยค ---
function loadScenario(type) {
  // เปลี่ยนปุ่ม Active
  document.querySelectorAll('.btn-cat').forEach(b => b.classList.remove('active'));
  event.currentTarget.classList.add('active');

  const list = document.getElementById("phraseList");
  list.innerHTML = "";
  scenarios[type].forEach(item => {
    const div = document.createElement("div");
    div.className = "phrase-item";
    div.innerHTML = `
      <div><div class="phrase-en">${item.en}</div><div class="phrase-th">${item.th}</div></div>
      <button class="btn-play" onclick="speak('${item.en}')"><i class="fas fa-volume-up"></i></button>`;
    list.appendChild(div);
  });
}

// --- 3. ฝึกพูด (Speaking Practice) ---
function toggleSpeaking() {
  const micBtn = document.getElementById("micBtn");
  const resultDisp = document.getElementById("speechResult");
  const feedback = document.getElementById("feedback");

  if (isRecording) { recognition.stop(); return; }

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    isRecording = true;
    micBtn.classList.add("recording");
    resultDisp.innerText = "Listening... (พูดประโยคภาษาอังกฤษ)";
    feedback.innerHTML = "";
  };

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    resultDisp.innerText = `You said: "${text}"`;
    const score = Math.floor(Math.random() * 16) + 85; // จำลองคะแนน
    feedback.innerHTML = `<span class="feedback good">✨ Accuracy: ${score}% - สำเนียงดีมากค่ะ!</span>`;
  };

  recognition.onend = () => { isRecording = false; micBtn.classList.remove("recording"); };
  recognition.start();
}

// --- 4. Smart AI Role Play (พูดไทย/อังกฤษได้) ---
function toggleChatMic() {
  const micBtn = document.getElementById("chatMicBtn");
  const input = document.getElementById("userInput");

  if (isChatRecording) { chatRec.stop(); return; }

  chatRec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  chatRec.lang = 'th-TH'; // เน้นไทยแต่จับอังกฤษได้

  chatRec.onstart = () => { isChatRecording = true; micBtn.classList.add("recording"); };
  chatRec.onresult = (event) => { input.value = event.results[0][0].transcript; sendMessage(); };
  chatRec.onend = () => { isChatRecording = false; micBtn.classList.remove("recording"); };
  chatRec.start();
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const text = input.value.trim();
  if (!text) return;

  // เพิ่มข้อความผู้ใช้
  chatBox.innerHTML += `<div class="msg user"><div class="msg-bubble">${text}</div></div>`;
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  // AI กำลังพิมพ์ (จำลอง)
  setTimeout(() => {
    let replyEn = "I see. Can you tell me more about it?";
    let replyTh = "เข้าใจแล้วค่ะ ช่วยอธิบายเพิ่มเติมหน่อยได้ไหมคะ?";
    
    // Logic ค้นหาคำตอบอัจฉริยะ (Simple AI)
    const lowerText = text.toLowerCase();
    if (lowerText.includes("สวัสดี") || lowerText.includes("hello")) {
      replyEn = "Hello! I feel a bit dizzy today."; replyTh = "สวัสดีค่ะ วันนี้ฉันรู้สึกเวียนหัวนิดหน่อยค่ะ";
    } else if (lowerText.includes("ชื่อ") || lowerText.includes("name")) {
      replyEn = "My name is Emily. I'm a tourist."; replyTh = "ฉันชื่อเอมิลี่ เป็นนักท่องเที่ยวค่ะ";
    } else if (lowerText.includes("ปวด") || lowerText.includes("pain") || lowerText.includes("เจ็บ")) {
      replyEn = "It hurts right here on my arm."; replyTh = "เจ็บตรงแขนข้างนี้ค่ะ";
    } else if (lowerText.includes("ทาง") || lowerText.includes("where")) {
      replyEn = "Could you show me the way to the restroom?"; replyTh = "ช่วยบอกทางไปห้องน้ำหน่อยได้ไหมคะ?";
    }

    chatBox.innerHTML += `
      <div class="msg ai">
        <div class="msg-bubble">${replyEn}</div>
        <div class="msg-hint">${replyTh}</div>
      </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    speak(replyEn);
  }, 1000);
}

function handleEnter(e) { if (e.key === 'Enter') sendMessage(); }

// เตรียมเสียงให้พร้อมเมื่อโหลดหน้าเว็บ
window.onload = () => {
  loadScenario('greeting');
  window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
};
