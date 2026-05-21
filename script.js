/*  ============================================================
   HEAL English — script.js (v4 - WITH EDIT/DELETE PHRASES)
   ============================================================ */

const STORAGE_KEY = 'heal_english_v2';

// ── Default Data ─────────────────────────────────────────────
const defaultScenarios = [
  {
    id: 'greeting', labelEn: 'Greeting', labelTh: 'การทักทาย', icon: '👋',
    phrases: [
      { id:'g1', en:'Hello, welcome to our hospital.', th:'สวัสดีค่ะ ยินดีต้อนรับสู่โรงพยาบาลค่ะ', zh:'您好，欢迎来到我们医院。', phonetic_en:'เฮลโล วัลคัม ทู เอาเวอร์ ฮอสพิทัล', phonetic_zh:'หนี่ว เฮา 欢迎 ไหลไต่ว่อ เหวอ่ เหมิน หยี่หยวน', context:'First contact with patient at entrance or reception', contextTh:'ใช้เมื่อต้อนรับผู้ป่วยที่ทางเข้าหรือเคาน์เตอร์' },
      { id:'g2', en:'How can I help you today?', th:'วันนี้มีอะไรให้ช่วยไหมคะ?', zh:'我今天能帮您什么？', phonetic_en:'เฮาว์ แคน ไอ เฮลป์ ยู ทูเดย์', phonetic_zh:'โว่ จิ่นเทียน เหนิง บ้านหวู่ หนิน', context:'Opening a patient encounter or service interaction', contextTh:'ใช้เปิดการสนทนาเพื่อสอบถามความต้องการผู้ป่วย' },
      { id:'g3', en:'Please wait here for a moment.', th:'กรุณารอสักครู่ตรงนี้ค่ะ', zh:'请在这里稍等片刻。', phonetic_en:'พลีส เวท เฮียร์ ฟอร์ เอ โมเมนต์', phonetic_zh:'ชิ่ง ไจ่ จ่างหลี่ เซา เต่ง เพี่ยนเกอะ', context:'Asking patient to wait while you prepare or check information', contextTh:'ใช้ขอให้ผู้ป่วยรอขณะเตรียมข้อมูลหรือดำเนินการ' },
      { id:'g4', en:'Good morning! How are you feeling today?', th:'สวัสดีตอนเช้าค่ะ วันนี้รู้สึกเป็นอย่างไรบ้างคะ?', zh:'早上好！今天感觉怎么样？', phonetic_en:'กูด มอร์นิง เฮาว์ อาร์ ยู ฟีลิง ทูเดย์', phonetic_zh:'จ้าว เซิ่ง ฮ่าว จิ่นเทียน เกินจวี่ เจ่นมะ ยาง', context:'Morning greeting when visiting a patient in ward', contextTh:'ใช้ทักทายตอนเช้าเมื่อเยี่ยมผู้ป่วยในหอผู้ป่วย' }
    ]
  },
  {
    id: 'registration', labelEn: 'Registration', labelTh: 'การลงทะเบียน', icon: '📋',
    phrases: [
      { id:'r1', en:'May I have your full name, please?', th:'ขอทราบชื่อ-นามสกุลด้วยค่ะ', zh:'请问您的全名是什么？', phonetic_en:'เมย์ ไอ แฮฟ ยอร์ ฟูล เนม พลีส', phonetic_zh:'ชิ่ง เวิ่น หนิน ตี่ ชวน่อ ชือ่ เม่อ', context:'Collecting patient identity at registration desk', contextTh:'ใช้เก็บข้อมูลตัวตนผู้ป่วยที่เคาน์เตอร์ลงทะเบียน' },
      { id:'r2', en:'Do you have an appointment today?', th:'ได้นัดไว้หรือเปล่าคะ?', zh:'您今天有预约吗？', phonetic_en:'ดู ยู แฮฟ แอน อะพอยต์เมนต์ ทูเดย์', phonetic_zh:'หนิน จิ่นเทียน หยวว ยู่เยว่ม่า', context:'Checking if patient has a prior appointment', contextTh:'ใช้ตรวจสอบว่าผู้ป่วยมีนัดล่วงหน้าหรือไม่' },
      { id:'r3', en:'Please fill in this form.', th:'กรุณากรอกแบบฟอร์มนี้ด้วยค่ะ', zh:'请填写这张表格。', phonetic_en:'พลีส ฟิล อิน ดิส ฟอร์ม', phonetic_zh:'ชิ่ง เที่ยนเสียะ จ่างจ้าง เปี่ยวเก่อ', context:'Handing over a patient registration form', contextTh:'ใช้ขณะมอบแบบฟอร์มลงทะเบียนให้ผู้ป่วยกรอก' },
      { id:'r4', en:'Can I see your passport or ID card?', th:'ขอดูหนังสือเดินทางหรือบัตรประชาชนได้ไหมคะ?', zh:'我可以看一下您的护照或身份证吗？', phonetic_en:'แคน ไอ ซี ยอร์ พาสปอร์ต ออร์ ไอดี การ์ด', phonetic_zh:'โว่ เกอะ อี่ เซี่ยะ หนิน ตี่ ฮู่จ้าว หวือ เซิ่นฟี่ จ่าง ม่า', context:'Verifying identity of foreign or new patients', contextTh:'ใช้ยืนยันตัวตนผู้ป่วยต่างชาติหรือผู้ป่วยใหม่' }
    ]
  },
  {
    id: 'direction', labelEn: 'Direction', labelTh: 'การบอกทาง', icon: '🗺️',
    phrases: [
      { id:'d1', en:'The pharmacy is on the first floor.', th:'ห้องยาอยู่ที่ชั้น 1 ค่ะ', zh:'药房在一楼。', phonetic_en:'เดอะ ฟาร์มาซี อิซ ออน เดอะ เฟิร์สต์ ฟลอร์', phonetic_zh:'ยาว่ว ฟาง ไจ่ อี่ หลาว', context:'Directing patient to the pharmacy after consultation', contextTh:'ใช้บอกทางไปห้องยาหลังพบแพทย์' },
      { id:'d2', en:'Go straight ahead and turn left.', th:'เดินตรงไปแล้วเลี้ยวซ้ายค่ะ', zh:'一直走，然后左转。', phonetic_en:'โก สเตรท อะเฮด แอนด์ เทิร์น เลฟท์', phonetic_zh:'อี่ จือ่ จ้าว เหรนเฮา จ้วว โจ่ว', context:'Giving basic directions within the hospital building', contextTh:'ใช้บอกทิศทางพื้นฐานภายในอาคารโรงพยาบาล' },
      { id:'d3', en:'The elevator is at the end of the corridor.', th:'ลิฟต์อยู่ที่ปลายทางเดินค่ะ', zh:'电梯在走廊尽头。', phonetic_en:'เดอะ เอลิเวเตอร์ อิซ แอท เดอะ เอนด์ ออฟ เดอะ คอริดอร์', phonetic_zh:'เตียนต้ี ไจ่ จ้าว หลาง จิ่นเตว่', context:'Helping patient find the elevator to another floor', contextTh:'ใช้ช่วยผู้ป่วยหาลิฟต์เพื่อขึ้น-ลงชั้น' },
      { id:'d4', en:'The restroom is around the corner.', th:'ห้องน้ำอยู่แถวหัวมุมค่ะ', zh:'洗手间就在转角处。', phonetic_en:'เดอะ เรสรูม อิซ อะราวนด์ เดอะ คอร์เนอร์', phonetic_zh:'ซี่โซ่วจี่ง จิ่ว ไจ่ จวน่ว จ้าว เฉิ่ว', context:'Pointing patient to the nearest restroom', contextTh:'ใช้บอกทางไปห้องน้ำที่ใกล้ที่สุด' }
    ]
  },
  {
    id: 'care', labelEn: 'During Care', labelTh: 'ขณะรับบริการ', icon: '🩺',
    phrases: [
      { id:'c1', en:'Are you feeling better now?', th:'รู้สึกดีขึ้นไหมคะ?', zh:'您现在感觉好一些了吗？', phonetic_en:'อาร์ ยู ฟีลิง เบตเตอร์ เนาว์', phonetic_zh:'หนิน เซี่ยนไจ่ เกินจวี่ ฮ่าว อี่เซี่ยะ ลิ่ว ม่า', context:'Checking patient\'s condition after treatment or medication', contextTh:'ใช้ตรวจสอบอาการผู้ป่วยหลังรับการรักษาหรือทานยา' },
      { id:'c2', en:'Please take this medicine twice a day.', th:'กรุณาทานยานี้วันละ 2 ครั้งค่ะ', zh:'请每天服用此药两次。', phonetic_en:'พลีส เทค ดิส เมดิซิน ทไวส์ เอ เดย์', phonetic_zh:'ชิ่ง เมี่ยเทียน ฟู่หยง ซือ่ ยาว เลี่ยง ซือ่', context:'Giving medication instructions to patient', contextTh:'ใช้อธิบายวิธีทานยาให้ผู้ป่วย' },
      { id:'c3', en:'Do you have any allergies?', th:'คุณมีอาการแพ้อะไรบ้างไหมคะ?', zh:'您有任何过敏症吗？', phonetic_en:'ดู ยู แฮฟ เอนี อะเลอร์จีส', phonetic_zh:'หนิน หยวว เหรนเฮา กวว่อ เมิ่นจ่ง ม่า', context:'Screening for drug or food allergies before treatment', contextTh:'ใช้คัดกรองการแพ้ยาหรืออาหารก่อนให้การรักษา' },
      { id:'c4', en:'Please relax, this won\'t hurt much.', th:'กรุณาผ่อนคลายนะคะ จะไม่เจ็บมากค่ะ', zh:'请放松，这不会太疼的。', phonetic_en:'พลีส รีแลกส์ ดิส วอนท์ เฮิร์ต มัช', phonetic_zh:'ชิ่ง ฟ่างซ่อง จ่ะ บู่ฮวี่ ไต่ เทิ่ง ตี่', context:'Reassuring patient before a procedure like injection or blood draw', contextTh:'ใช้ให้กำลังใจผู้ป่วยก่อนทำหัตถการ เช่น ฉีดยา หรือเจาะเลือด' }
    ]
  }
];

// ── State ─────────────────────────────────────────────────────
let scenarios = [];
let activeScenario = 'greeting';
let activeTab = 'phrases';
let practiceTarget = '';
let isRecording = false;
let isChatMic = false;
let recRef = null;
let translateDebounce = null;
let copiedTimeout = null;
let isAddModalRecording = false;
let editingPhraseId = null;  // ← Track which phrase is being edited

// ── Load/Save ─────────────────────────────────────────────────
function loadScenarios() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch(e) {}
  return JSON.parse(JSON.stringify(defaultScenarios));
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

// ── Boot ──────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  scenarios = loadScenarios();
  renderScenarios();
  renderPhrases();
  renderPracticeChips();
  renderQuickPhrases();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
});

// ── Scenarios ─────────────────────────────────────────────────
function renderScenarios() {
  const grid = document.getElementById('scenarioGrid');
  grid.innerHTML = scenarios.map(s => `
    <button class="btn-scenario ${s.id === activeScenario ? 'active' : ''}"
            onclick="selectScenario('${s.id}')">
      ${s.id === activeScenario ? '<div class="active-dot"></div>' : ''}
      <span class="s-icon">${s.icon}</span>
      <span class="s-en">${s.labelEn}</span>
      <span class="s-th">${s.labelTh}</span>
    </button>
  `).join('');
}

function selectScenario(id) {
  activeScenario = id;
  renderScenarios();
  renderPhrases();
  renderPracticeChips();
  renderQuickPhrases();
}

function currentScenario() {
  return scenarios.find(s => s.id === activeScenario);
}

// ── Phrases ───────────────────────────────────────────────────
function renderPhrases() {
  const s = currentScenario();
  document.getElementById('phraseTitle').textContent = `${s.icon} ${s.labelEn} Phrases`;
  document.getElementById('phraseCount').textContent = `${s.phrases.length} ประโยค · แตะ ▼ เพื่อดูคำอธิบาย`;

  const list = document.getElementById('phraseList');
  if (s.phrases.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">💬</div>
        <div class="empty-text">ยังไม่มีประโยคในหมวดนี้</div>
        <button class="btn-empty-add" onclick="openAddModal()">
          <i class="fas fa-plus"></i> เพิ่มประโยคแรก
        </button>
      </div>`;
    return;
  }

  list.innerHTML = s.phrases.map(p => buildPhraseCard(p)).join('');
}

function buildPhraseCard(p) {
  const hasCtx = p.context || p.contextTh;
  const id = p.id;
  return `
    <div class="phrase-card" id="pc-${id}">
      <div class="phrase-main">
        <div class="phrase-texts">
          <div class="phrase-row">
            <span class="badge-mini en">EN</span>
            <div class="phrase-col">
              <div class="phrase-en-text">${escHtml(p.en)}</div>
              ${p.phonetic_en ? `<div class="phrase-phonetic">${escHtml(p.phonetic_en)}</div>` : ''}
            </div>
          </div>
          <div class="phrase-row">
            <span class="badge-mini th">TH</span>
            <span class="phrase-th-text">${escHtml(p.th)}</span>
          </div>
          <div class="phrase-row">
            <span class="badge-mini zh">中</span>
            <div class="phrase-col">
              <div class="phrase-zh-text">${escHtml(p.zh)}</div>
              ${p.phonetic_zh ? `<div class="phrase-phonetic">${escHtml(p.phonetic_zh)}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="phrase-actions">
          <button class="btn-icon blue" onclick="speakText('${escAttr(p.en)}','en')" title="ฟัง EN">
            <i class="fas fa-volume-up"></i>
          </button>
          <button class="btn-icon yellow" onclick="speakText('${escAttr(p.zh)}','zh')" title="ฟัง 中文">
            中
          </button>
          <button class="btn-icon green" id="edit-${id}" onclick="openEditModal('${id}')" title="แก้ไข">
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="btn-icon red" id="del-${id}" onclick="confirmDelete('${id}')" title="ลบ">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
      ${hasCtx ? `
        <button class="phrase-context-toggle" onclick="toggleCtx('${id}')">
          <span>ใช้ในสถานการณ์ไหน?</span>
          <i class="fas fa-chevron-down" id="ctx-icon-${id}"></i>
        </button>
        <div class="phrase-context-body" id="ctx-body-${id}">
          ${p.contextTh ? `<div class="ctx-line"><strong>ไทย:</strong> ${escHtml(p.contextTh)}</div>` : ''}
          ${p.context   ? `<div class="ctx-line"><strong>EN:</strong> ${escHtml(p.context)}</div>` : ''}
        </div>
      ` : ''}
    </div>`;
}

function toggleCtx(id) {
  const body = document.getElementById(`ctx-body-${id}`);
  const icon = document.getElementById(`ctx-icon-${id}`);
  if (!body) return;
  body.classList.toggle('open');
  icon.style.transform = body.classList.contains('open') ? 'rotate(180deg)' : '';
}

// ── Delete Phrase ─────────────────────────────────────────────
let pendingDelete = {};

function confirmDelete(id) {
  const btn = document.getElementById(`del-${id}`);
  if (!btn) return;
  if (pendingDelete[id]) {
    clearTimeout(pendingDelete[id]);
    delete pendingDelete[id];
    const s = currentScenario();
    s.phrases = s.phrases.filter(p => p.id !== id);
    save();
    renderPhrases();
    renderPracticeChips();
    renderQuickPhrases();
    return;
  }
  btn.textContent = 'ยืนยันการลบ?';
  btn.style.background = '#ef4444';
  btn.style.color = '#fff';
  pendingDelete[id] = setTimeout(() => {
    delete pendingDelete[id];
    btn.textContent = '';
    btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}

// ── Edit Phrase ───────────────────────────────────────────────
function openEditModal(id) {
  const s = currentScenario();
  const phrase = s.phrases.find(p => p.id === id);
  if (!phrase) return;

  editingPhraseId = id;
  
  // Fill form with existing data
  document.getElementById('f-th').value = phrase.th || '';
  document.getElementById('f-en').value = phrase.en || '';
  document.getElementById('f-phonetic-en').value = phrase.phonetic_en || '';
  document.getElementById('f-zh').value = phrase.zh || '';
  document.getElementById('f-phonetic-zh').value = phrase.phonetic_zh || '';
  document.getElementById('f-ctx-th').value = phrase.contextTh || '';
  document.getElementById('f-ctx-en').value = phrase.context || '';

  // Change modal title
  document.querySelector('.modal-title').textContent = 'แก้ไขประโยค';
  document.querySelector('.modal-sub').textContent = 'Edit Phrase / 编辑短语';
  document.querySelector('.btn-confirm').innerHTML = '<i class="fas fa-save"></i> บันทึกการแก้ไข';

  openAddModal();
}

function openAddModal() {
  document.getElementById('addModal').style.display = 'flex';
}

function closeAddModal() {
  document.getElementById('addModal').style.display = 'none';
  editingPhraseId = null;
  
  // Reset form
  document.getElementById('f-th').value = '';
  document.getElementById('f-en').value = '';
  document.getElementById('f-phonetic-en').value = '';
  document.getElementById('f-zh').value = '';
  document.getElementById('f-phonetic-zh').value = '';
  document.getElementById('f-ctx-th').value = '';
  document.getElementById('f-ctx-en').value = '';
  
  // Reset modal title
  document.querySelector('.modal-title').textContent = 'เพิ่มประโยคใหม่';
  document.querySelector('.modal-sub').textContent = 'AI จะช่วยแปลและสร้างคำอ่านให้ · Add New Phrase';
  document.querySelector('.btn-confirm').innerHTML = '<i class="fas fa-plus"></i> เพิ่มประโยค';
}

function submitAddPhrase() {
  const th = document.getElementById('f-th').value.trim();
  const en = document.getElementById('f-en').value.trim();
  const phonetic_en = document.getElementById('f-phonetic-en').value.trim();
  const zh = document.getElementById('f-zh').value.trim();
  const phonetic_zh = document.getElementById('f-phonetic-zh').value.trim();
  const contextTh = document.getElementById('f-ctx-th').value.trim();
  const context = document.getElementById('f-ctx-en').value.trim();

  if (!th) {
    document.getElementById('err-th').textContent = 'กรุณากรอกภาษาไทย';
    return;
  }
  document.getElementById('err-th').textContent = '';

  if (!en) {
    document.getElementById('err-en').textContent = 'กรุณากรอกหรือให้ AI แปลภาษาอังกฤษ';
    return;
  }
  document.getElementById('err-en').textContent = '';

  if (!zh) {
    document.getElementById('err-zh').textContent = 'กรุณากรอกหรือให้ AI แปลภาษาจีน';
    return;
  }
  document.getElementById('err-zh').textContent = '';

  const s = currentScenario();

  if (editingPhraseId) {
    // Update existing phrase
    const phrase = s.phrases.find(p => p.id === editingPhraseId);
    if (phrase) {
      phrase.en = en;
      phrase.th = th;
      phrase.zh = zh;
      phrase.phonetic_en = phonetic_en;
      phrase.phonetic_zh = phonetic_zh;
      phrase.context = context;
      phrase.contextTh = contextTh;
    }
  } else {
    // Add new phrase
    const newId = 'p' + Date.now();
    s.phrases.push({
      id: newId,
      en, th, zh,
      phonetic_en,
      phonetic_zh,
      context,
      contextTh
    });
  }

  save();
  renderPhrases();
  renderPracticeChips();
  renderQuickPhrases();
  closeAddModal();
}

// ── Utility Functions ─────────────────────────────────────────
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function escAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

// ── Speech Functions ──────────────────────────────────────────
function speakText(text, lang) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang === 'zh' ? 'zh-CN' : (lang === 'th' ? 'th-TH' : 'en-US');
  utt.rate = 0.9;
  window.speechSynthesis.speak(utt);
}

// ── Tab Switching ─────────────────────────────────────────────
function switchTab(tab, btn) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(`panel-${tab}`).classList.add('active');
}

// ── Practice Functions ────────────────────────────────────────
function renderPracticeChips() {
  const s = currentScenario();
  const chips = document.getElementById('practiceChips');
  chips.innerHTML = s.phrases.map(p => `
    <button class="phrase-chip" onclick="selectPracticePhrase('${p.id}')">
      ${escHtml(p.en.substring(0, 30))}${p.en.length > 30 ? '...' : ''}
    </button>
  `).join('');
}

function selectPracticePhrase(id) {
  const s = currentScenario();
  const p = s.phrases.find(ph => ph.id === id);
  if (!p) return;
  practiceTarget = id;
  document.getElementById('targetBox').style.display = 'flex';
  document.getElementById('targetText').textContent = p.en;
  document.getElementById('targetPhonetic').textContent = p.phonetic_en || '(ไม่มีคำอ่าน)';
  document.getElementById('recResult').style.display = 'none';
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = 'block';
}

function playPracticeAudio() {
  const s = currentScenario();
  const p = s.phrases.find(ph => ph.id === practiceTarget);
  if (p) speakText(p.en, 'en');
}

function toggleRecording() {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    alert('Browser ของคุณไม่รองรับ Speech Recognition');
    return;
  }
  if (isRecording) {
    isRecording = false;
    if (recRef) recRef.stop();
    document.getElementById('recBtn').classList.remove('recording');
    document.getElementById('listeningAnim').style.display = 'none';
  } else {
    isRecording = true;
    document.getElementById('recBtn').classList.add('recording');
    document.getElementById('listeningAnim').style.display = 'flex';
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recRef = new SpeechRec();
    recRef.lang = 'en-US';
    recRef.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join('');
      document.getElementById('recResult').textContent = text;
      document.getElementById('recResult').style.display = 'block';
      document.getElementById('recPlaceholder').style.display = 'none';
      calculateScore(text);
    };
    recRef.onerror = () => {
      document.getElementById('recResult').textContent = 'ไม่สามารถจดจำเสียงได้';
      document.getElementById('recResult').style.display = 'block';
    };
    recRef.onend = () => {
      isRecording = false;
      document.getElementById('recBtn').classList.remove('recording');
      document.getElementById('listeningAnim').style.display = 'none';
    };
    recRef.start();
  }
}

function calculateScore(spokenText) {
  const s = currentScenario();
  const p = s.phrases.find(ph => ph.id === practiceTarget);
  if (!p) return;
  const target = p.en.toLowerCase();
  const spoken = spokenText.toLowerCase();
  const distance = levenshteinDistance(target, spoken);
  const maxLen = Math.max(target.length, spoken.length);
  const accuracy = Math.max(0, 100 - (distance / maxLen) * 100);
  const score = Math.round(accuracy);
  document.getElementById('scoreNum').textContent = score + '%';
  document.getElementById('scoreMsg').textContent = score >= 80 ? '✓ ดีมาก!' : score >= 60 ? '△ ดีพอสมควร' : '✗ ลองใหม่';
  document.getElementById('scoreBarFill').style.width = score + '%';
  document.getElementById('scoreBox').style.display = 'block';
}

function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// ── Chat Functions ────────────────────────────────────────────
function toggleChatMic() {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    alert('Browser ของคุณไม่รองรับ Speech Recognition');
    return;
  }
  if (isChatMic) {
    isChatMic = false;
    if (recRef) recRef.stop();
    document.getElementById('chatMicBtn').classList.remove('recording');
  } else {
    isChatMic = true;
    document.getElementById('chatMicBtn').classList.add('recording');
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recRef = new SpeechRec();
    recRef.lang = 'th-TH';
    recRef.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join('');
      document.getElementById('chatInput').value = text;
      isChatMic = false;
      document.getElementById('chatMicBtn').classList.remove('recording');
    };
    recRef.start();
  }
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML += `
    <div class="msg user">
      <div class="msg-bubble">${escHtml(text)}</div>
    </div>`;
  input.value = '';
  setTimeout(() => {
    chatBox.innerHTML += `
      <div class="msg ai">
        <div class="msg-avatar"><i class="fas fa-robot"></i></div>
        <div class="msg-content">
          <div class="msg-bubble">ขอบคุณที่บอกมา ฉันเข้าใจแล้ว</div>
          <button class="msg-listen" onclick="speakText('Thank you for telling me. I understand now.', 'en')">▶ ฟัง</button>
        </div>
      </div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 500);
}

// ── Translate Functions ───────────────────────────────────────
function onTranslateInput() {
  clearTimeout(translateDebounce);
  const input = document.getElementById('translateInput').value.trim();
  if (!input) {
    document.getElementById('translateOutput').innerHTML = '<p class="translate-placeholder">คำแปลจะปรากฏที่นี่...</p>';
    return;
  }
  translateDebounce = setTimeout(() => {
    const fromLang = document.getElementById('fromLang').value;
    const toLang = document.getElementById('toLang').value;
    translateText(input, fromLang, toLang);
  }, 500);
}

function translateText(text, fromLang, toLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
  fetch(url)
    .then(r => r.json())
    .then(data => {
      const result = data[0].map(item => item[0]).join('');
      document.getElementById('translateOutput').innerHTML = `<p class="translate-result">${escHtml(result)}</p>`;
      document.getElementById('inputSpeakBtn').style.display = 'block';
    })
    .catch(() => {
      document.getElementById('translateOutput').innerHTML = '<p class="translate-error">ไม่สามารถแปลได้ กรุณาลองใหม่</p>';
    });
}

function swapLangs() {
  const from = document.getElementById('fromLang');
  const to = document.getElementById('toLang');
  [from.value, to.value] = [to.value, from.value];
  onTranslateInput();
}

function speakTranslateInput() {
  const result = document.querySelector('.translate-result');
  if (result) speakText(result.textContent, document.getElementById('toLang').value);
}

function toggleTranslateMic() {
  if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
    alert('Browser ของคุณไม่รองรับ Speech Recognition');
    return;
  }
  const btn = document.getElementById('translateMicBtn');
  if (btn.classList.contains('recording')) {
    btn.classList.remove('recording');
    if (recRef) recRef.stop();
  } else {
    btn.classList.add('recording');
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    recRef = new SpeechRec();
    recRef.lang = document.getElementById('fromLang').value === 'th' ? 'th-TH' : 'en-US';
    recRef.onresult = (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join('');
      document.getElementById('translateInput').value = text;
      onTranslateInput();
      btn.classList.remove('recording');
    };
    recRef.start();
  }
}

function renderQuickPhrases() {
  const s = currentScenario();
  const wrap = document.getElementById('quickPhrases');
  if (s.phrases.length === 0) {
    wrap.innerHTML = '';
    return;
  }
  wrap.innerHTML = `
    <div class="quick-phrases-title">ประโยคด่วนจากหมวด ${s.labelTh}</div>
    <div class="quick-phrases-list">
      ${s.phrases.slice(0, 3).map(p => `
        <div class="quick-phrase-item">
          <div class="q-en">${escHtml(p.en)}</div>
          ${p.phonetic_en ? `<div class="q-phonetic-en">${escHtml(p.phonetic_en)}</div>` : ''}
          <div class="q-th">${escHtml(p.th)}</div>
          <div class="q-zh">${escHtml(p.zh)}</div>
          ${p.phonetic_zh ? `<div class="q-phonetic-zh">${escHtml(p.phonetic_zh)}</div>` : ''}
        </div>
      `).join('')}
    </div>`;
}

function goToPractice() {
  switchTab('practice', document.querySelector('[data-tab="practice"]'));
}
