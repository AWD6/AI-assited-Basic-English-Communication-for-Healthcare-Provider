/* ============================================================
   HEAL English — script.js (v3 - WITH THAI PHONETICS)
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
  } else {
    btn.classList.add('red-solid');
    btn.classList.remove('red');
    btn.innerHTML = 'ยืนยัน';
    pendingDelete[id] = setTimeout(() => {
      delete pendingDelete[id];
      if (btn) {
        btn.classList.remove('red-solid');
        btn.classList.add('red');
        btn.innerHTML = '<i class="fas fa-trash-alt"></i>';
      }
    }, 3000);
  }
}

// ── Add Modal with AI Translation ─────────────────────────────
function openAddModal() {
  ['f-en','f-th','f-zh','f-ctx-th','f-ctx-en','f-phonetic-en','f-phonetic-zh'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['err-en','err-th','err-zh'].forEach(id => document.getElementById(id).textContent = '');
  ['f-en','f-th','f-zh'].forEach(id => document.getElementById(id).classList.remove('error'));
  document.getElementById('addModal').classList.add('open');
  setTimeout(() => document.getElementById('f-th').focus(), 120);
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('open');
  isAddModalRecording = false;
}

async function submitAddPhrase() {
  const en = document.getElementById('f-en').value.trim();
  const th = document.getElementById('f-th').value.trim();
  const zh = document.getElementById('f-zh').value.trim();
  const ctxTh = document.getElementById('f-ctx-th').value.trim();
  const ctx   = document.getElementById('f-ctx-en').value.trim();
  const phonetic_en = document.getElementById('f-phonetic-en').value.trim();
  const phonetic_zh = document.getElementById('f-phonetic-zh').value.trim();

  let valid = true;
  if (!th) { setErr('err-th','f-th','กรุณากรอกประโยคภาษาไทย'); valid = false; }
  if (!valid) return;

  // If English or Chinese is empty, try to auto-translate
  let finalEn = en;
  let finalZh = zh;
  let finalCtx = ctx;
  let finalCtxTh = ctxTh;
  let finalPhonetic_en = phonetic_en;
  let finalPhonetic_zh = phonetic_zh;

  if (!en || !zh || !ctx || !ctxTh || !phonetic_en || !phonetic_zh) {
    try {
      const result = await aiTranslateAndAnalyze(th);
      if (result) {
        finalEn = en || result.en;
        finalZh = zh || result.zh;
        finalCtx = ctx || result.context;
        finalCtxTh = ctxTh || result.contextTh;
        finalPhonetic_en = phonetic_en || result.phonetic_en;
        finalPhonetic_zh = phonetic_zh || result.phonetic_zh;
      }
    } catch (e) {
      console.error('AI translation failed:', e);
    }
  }

  // Validate after auto-translation
  if (!finalEn) { setErr('err-en','f-en','ไม่สามารถแปลเป็นภาษาอังกฤษได้ กรุณากรอกเอง'); valid = false; }
  if (!finalZh) { setErr('err-zh','f-zh','ไม่สามารถแปลเป็นภาษาจีนได้ กรุณากรอกเอง'); valid = false; }
  if (!valid) return;

  const newPhrase = {
    id: 'custom_' + Date.now(),
    en: finalEn,
    th: th,
    zh: finalZh,
    phonetic_en: finalPhonetic_en,
    phonetic_zh: finalPhonetic_zh,
    context: finalCtx,
    contextTh: finalCtxTh
  };

  currentScenario().phrases.push(newPhrase);
  save();
  closeAddModal();
  renderPhrases();
  renderPracticeChips();
  renderQuickPhrases();
}

// ── AI Translation & Analysis ────────────────────────────────
async function aiTranslateAndAnalyze(thaiText) {
  try {
    // ใช้ Google Translate API โดยตรงสำหรับการแปล
    const enResult = await translateViaGoogle(thaiText, 'th', 'en');
    const zhResult = await translateViaGoogle(thaiText, 'th', 'zh-CN');
    
    // สร้างคำอ่านภาษาไทย (Thai Phonetics)
    const phonetic_en = generateThaiPhonetics(enResult);
    const phonetic_zh = generateThaiPhonetics(zhResult);
    
    // วิเคราะห์สถานการณ์
    const contextResult = await analyzeContext(thaiText, enResult);
    
    return {
      en: enResult,
      zh: zhResult,
      phonetic_en: phonetic_en,
      phonetic_zh: phonetic_zh,
      context: contextResult.context || '',
      contextTh: contextResult.contextTh || ''
    };
  } catch (e) {
    console.error('AI translation error:', e);
    return null;
  }
}

// ── Google Translate API ─────────────────────────────────────
async function translateViaGoogle(text, sourceLang, targetLang) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Translation failed');
    const data = await res.json();
    const result = data[0].map(i => i[0]).join('');
    return result;
  } catch (e) {
    console.error('Google Translate error:', e);
    return '';
  }
}

// ── Generate Thai Phonetics ──────────────────────────────────
function generateThaiPhonetics(englishText) {
  // ตัวอย่างการแปลงคำศัพท์ภาษาอังกฤษเป็นคำอ่านภาษาไทย
  const phoneticMap = {
    'hello': 'เฮลโล',
    'welcome': 'วัลคัม',
    'to': 'ทู',
    'our': 'เอาเวอร์',
    'hospital': 'ฮอสพิทัล',
    'how': 'เฮาว์',
    'can': 'แคน',
    'i': 'ไอ',
    'help': 'เฮลป์',
    'you': 'ยู',
    'today': 'ทูเดย์',
    'please': 'พลีส',
    'wait': 'เวท',
    'here': 'เฮียร์',
    'for': 'ฟอร์',
    'a': 'เอ',
    'moment': 'โมเมนต์',
    'good': 'กูด',
    'morning': 'มอร์นิง',
    'are': 'อาร์',
    'feeling': 'ฟีลิง',
    'better': 'เบตเตอร์',
    'now': 'เนาว์',
    'do': 'ดู',
    'have': 'แฮฟ',
    'any': 'เอนี',
    'allergies': 'อะเลอร์จีส',
    'take': 'เทค',
    'this': 'ดิส',
    'medicine': 'เมดิซิน',
    'twice': 'ทไวส์',
    'day': 'เดย์',
    'see': 'ซี',
    'your': 'ยอร์',
    'passport': 'พาสปอร์ต',
    'or': 'ออร์',
    'id': 'ไอดี',
    'card': 'การ์ด',
    'relax': 'รีแลกส์',
    'won\'t': 'วอนท์',
    'hurt': 'เฮิร์ต',
    'much': 'มัช',
    'go': 'โก',
    'straight': 'สเตรท',
    'ahead': 'อะเฮด',
    'and': 'แอนด์',
    'turn': 'เทิร์น',
    'left': 'เลฟท์',
    'the': 'เดอะ',
    'pharmacy': 'ฟาร์มาซี',
    'is': 'อิซ',
    'on': 'ออน',
    'first': 'เฟิร์สต์',
    'floor': 'ฟลอร์',
    'elevator': 'เอลิเวเตอร์',
    'at': 'แอท',
    'end': 'เอนด์',
    'of': 'ออฟ',
    'corridor': 'คอริดอร์',
    'restroom': 'เรสรูม',
    'around': 'อะราวนด์',
    'corner': 'คอร์เนอร์',
    'may': 'เมย์',
    'full': 'ฟูล',
    'name': 'เนม',
    'appointment': 'อะพอยต์เมนต์',
    'fill': 'ฟิล',
    'in': 'อิน',
    'form': 'ฟอร์ม'
  };

  const words = englishText.toLowerCase().split(/\s+/);
  const phoneticWords = words.map(word => {
    // ลบเครื่องหมายวรรคตอนออก
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    return phoneticMap[cleanWord] || word;
  });

  return phoneticWords.join(' ');
}

// ── Analyze Context ──────────────────────────────────────────
async function analyzeContext(thaiText, englishText) {
  // ตัวอย่างการวิเคราะห์สถานการณ์อย่างง่าย
  const contextKeywords = {
    'สวัสดี|ยินดี|ต้อนรับ': { 
      context: 'Greeting and welcoming patients',
      contextTh: 'ใช้เมื่อต้อนรับและทักทายผู้ป่วย'
    },
    'ชื่อ|นาม|ชื่อ-นามสกุล': {
      context: 'Collecting patient information',
      contextTh: 'ใช้เก็บข้อมูลส่วนตัวของผู้ป่วย'
    },
    'นัด|appointment': {
      context: 'Checking appointment status',
      contextTh: 'ใช้ตรวจสอบการนัดหมายของผู้ป่วย'
    },
    'รู้สึก|ปวด|เจ็บ|อาการ': {
      context: 'Assessing patient symptoms',
      contextTh: 'ใช้สอบถามอาการและความรู้สึกของผู้ป่วย'
    },
    'ยา|medicine|ทาน': {
      context: 'Providing medication instructions',
      contextTh: 'ใช้อธิบายวิธีการทานยา'
    },
    'ทาง|direction|ไป': {
      context: 'Giving directions',
      contextTh: 'ใช้บอกทางเดิน'
    },
    'แพ้|allergy': {
      context: 'Screening for allergies',
      contextTh: 'ใช้คัดกรองการแพ้'
    }
  };

  for (const [keywords, contextData] of Object.entries(contextKeywords)) {
    const regex = new RegExp(keywords, 'i');
    if (regex.test(thaiText) || regex.test(englishText)) {
      return contextData;
    }
  }

  return {
    context: 'Medical communication',
    contextTh: 'ใช้ในการสื่อสารทางการแพทย์'
  };
}

// ── Voice input for Add Modal ────────────────────────────────
function toggleAddModalMic() {
  const btn = document.getElementById('addModalMicBtn');
  if (!btn) return;
  
  if (isAddModalRecording) { 
    recRef && recRef.stop(); 
    return; 
  }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    alert('Browser ไม่รองรับ กรุณาใช้ Chrome');
    return;
  }

  const rec = new SpeechRec();
  rec.lang = 'th-TH';
  recRef = rec;

  rec.onstart = () => { 
    isAddModalRecording = true; 
    btn.classList.add('recording');
    btn.innerHTML = '<i class="fas fa-stop"></i>';
  };
  
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById('f-th').value = text;
  };
  
  rec.onend = () => { 
    isAddModalRecording = false; 
    btn.classList.remove('recording');
    btn.innerHTML = '<i class="fas fa-microphone"></i>';
  };
  
  rec.start();
}

function setErr(errId, inputId, msg) {
  document.getElementById(errId).textContent = msg;
  document.getElementById(inputId).classList.add('error');
}

// ── Practice ──────────────────────────────────────────────────
function renderPracticeChips() {
  const s = currentScenario();
  const wrap = document.getElementById('practiceChips');
  wrap.innerHTML = s.phrases.slice(0, 5).map(p =>
    `<button class="chip ${practiceTarget === p.en ? 'active' : ''}"
             onclick="selectPracticeTarget('${escAttr(p.en)}')"
             title="${escAttr(p.en)}">
      ${escHtml(p.en.length > 26 ? p.en.slice(0,26)+'…' : p.en)}
    </button>`
  ).join('');
}

function selectPracticeTarget(en) {
  practiceTarget = en;
  const s = currentScenario();
  const phrase = s.phrases.find(p => p.en === en);
  
  document.getElementById('targetBox').style.display = en ? 'block' : 'none';
  document.getElementById('targetText').textContent = en;
  
  // แสดงคำอ่านภาษาไทย
  if (phrase && phrase.phonetic_en) {
    document.getElementById('targetPhonetic').textContent = phrase.phonetic_en;
  }
  
  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('title') === en);
  });
}

function goToPractice() {
  const s = currentScenario();
  if (s.phrases.length) selectPracticeTarget(s.phrases[0].en);
  switchTab('practice', document.querySelector('[data-tab="practice"]'));
}

// ── Practice: Play audio before speaking ─────────────────────
function playPracticeAudio() {
  if (!practiceTarget) return;
  speakText(practiceTarget, 'en');
}

// ── Recording & Scoring ───────────────────────────────────────
function toggleRecording() {
  if (isRecording) { recRef && recRef.stop(); return; }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) {
    showRecResult('Browser ไม่รองรับ กรุณาใช้ Chrome');
    return;
  }

  const rec = new SpeechRec();
  rec.lang = 'en-US';
  rec.continuous = false;
  rec.interimResults = false;
  recRef = rec;

  rec.onstart = () => {
    isRecording = true;
    document.getElementById('recBtn').classList.add('recording');
    document.getElementById('recBtnText').textContent = 'หยุดฟัง (Stop)';
    document.getElementById('recIcon').className = 'fas fa-stop';
    document.getElementById('recBox').classList.add('listening');
    document.getElementById('recPlaceholder').style.display = 'none';
    document.getElementById('recResult').style.display = 'none';
    document.getElementById('listeningAnim').style.display = 'flex';
    document.getElementById('scoreBox').style.display = 'none';
  };

  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    showRecResult(text);
    showScore(text);
  };

  rec.onend = () => {
    isRecording = false;
    document.getElementById('recBtn').classList.remove('recording');
    document.getElementById('recBtnText').textContent = 'กดเพื่อพูด (Tap to Speak)';
    document.getElementById('recIcon').className = 'fas fa-microphone';
    document.getElementById('recBox').classList.remove('listening');
    document.getElementById('listeningAnim').style.display = 'none';
    document.getElementById('recPlaceholder').style.display = '';
  };

  rec.onerror = () => {
    isRecording = false;
    showRecResult('ไม่สามารถรับเสียงได้ กรุณาลองอีกครั้ง');
  };

  rec.start();
}

function showRecResult(text) {
  document.getElementById('listeningAnim').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = 'none';
  const el = document.getElementById('recResult');
  el.textContent = `You said: "${text}"`;
  el.style.display = 'block';
}

function showScore(spokenText) {
  const score = calcScore(spokenText, practiceTarget);
  const box = document.getElementById('scoreBox');
  box.style.display = 'block';
  box.className = 'score-box';

  let cls, msg;
  if (score >= 90)      { cls = 'good'; msg = '✨ ยอดเยี่ยมมากค่ะ!'; }
  else if (score >= 75) { cls = 'ok';   msg = '👍 ดีมากค่ะ ลองฝึกอีกนิดนะคะ'; }
  else if (score >= 60) { cls = 'meh';  msg = '💪 ฝึกอีกหน่อยนะคะ'; }
  else                  { cls = 'bad';  msg = '🎤 ลองพูดใหม่อีกครั้งนะคะ'; }

  box.classList.add(cls);
  document.getElementById('scoreMsg').textContent = msg;
  document.getElementById('scoreNum').textContent = score + '%';
  const fill = document.getElementById('scoreBarFill');
  fill.style.width = '0';
  setTimeout(() => fill.style.width = score + '%', 50);
}

// ── Improved Score Calculation ───────────────────────────────
function calcScore(spoken, target) {
  if (!target) return Math.floor(Math.random() * 16) + 82;
  
  const sw = spoken.toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(Boolean);
  const tw = target.toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(Boolean);
  
  if (tw.length === 0) return 85;
  
  let matchCount = 0;
  
  tw.forEach(targetWord => {
    let bestMatch = 0;
    sw.forEach(spokenWord => {
      const similarity = calculateSimilarity(spokenWord, targetWord);
      bestMatch = Math.max(bestMatch, similarity);
    });
    matchCount += bestMatch;
  });
  
  const baseScore = Math.floor((matchCount / tw.length) * 100);
  const finalScore = Math.min(100, Math.max(0, baseScore + (Math.random() * 5 - 2)));
  
  return Math.round(finalScore);
}

// ── String Similarity Calculation ────────────────────────────
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = getEditDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function getEditDistance(s1, s2) {
  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

// ── Chat ──────────────────────────────────────────────────────
const aiReplies = [
  { t: /สวัสดี|hello|hi\b/i,                        en:"Hello! I feel a bit dizzy today.",                          th:"สวัสดีค่ะ วันนี้ฉันรู้สึกเวียนหัวนิดหน่อยค่ะ" },
  { t: /ชื่อ|name/i,                                 en:"My name is Emily. I'm a tourist from Australia.",           th:"ฉันชื่อเอมิลี่ เป็นนักท่องเที่ยวจากออสเตรเลียค่ะ" },
  { t: /ปวด|pain|เจ็บ|hurt/i,                        en:"It hurts right here on my lower abdomen.",                  th:"เจ็บตรงท้องน้อยข้างนี้ค่ะ" },
  { t: /ทาง|where|ห้องน้ำ|restroom|toilet/i,         en:"Could you show me the way to the restroom?",               th:"ช่วยบอกทางไปห้องน้ำหน่อยได้ไหมคะ?" },
  { t: /แพ้|allergy|allergic/i,                      en:"I'm allergic to penicillin and shellfish.",                 th:"ฉันแพ้ยาเพนิซิลินและอาหารทะเลมีเปลือกค่ะ" },
  { t: /นัด|appointment/i,                           en:"Yes, I have an appointment with Dr. Smith at 10 AM.",       th:"ใช่ค่ะ ฉันนัดกับคุณหมอสมิธตอน 10 โมงเช้าค่ะ" },
  { t: /ยา|medicine|drug/i,                          en:"I'm currently taking blood pressure medication.",            th:"ตอนนี้ฉันทานยาความดันอยู่ค่ะ" },
  { t: /ดี|better|okay|fine/i,                       en:"I feel a little better now, thank you so much!",            th:"รู้สึกดีขึ้นนิดหน่อยแล้วค่ะ ขอบคุณมากเลยค่ะ" },
];

function getAIReply(text) {
  for (const r of aiReplies) if (r.t.test(text)) return r;
  return { en:"I see. Could you please explain a bit more?", th:"เข้าใจแล้วค่ะ ช่วยอธิบายเพิ่มเติมหน่อยได้ไหมคะ?" };
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';

  appendMsg('user', text);

  const typingId = appendTyping();
  setTimeout(() => {
    removeTyping(typingId);
    const reply = getAIReply(text);
    appendMsg('ai', reply.en, reply.th);
    speakText(reply.en, 'en');
  }, 900 + Math.random() * 500);
}

function appendMsg(role, en, th='') {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = `msg ${role}`;

  if (role === 'ai') {
    div.innerHTML = `
      <div class="msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="msg-content">
        <div class="msg-bubble">${escHtml(en)}</div>
        ${th ? `<div class="msg-hint">${escHtml(th)}</div>` : ''}
        <button class="msg-listen" onclick="speakText('${escAttr(en)}','en')">▶ ฟัง</button>
      </div>`;
  } else {
    div.innerHTML = `
      <div class="msg-content">
        <div class="msg-bubble">${escHtml(en)}</div>
      </div>
      <div class="msg-user-avatar"><i class="fas fa-user"></i></div>`;
  }

  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

let typingCounter = 0;
function appendTyping() {
  const id = 'typing-' + (++typingCounter);
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.id = id;
  div.innerHTML = `
    <div class="msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function toggleChatMic() {
  const btn = document.getElementById('chatMicBtn');
  if (isChatMic) { recRef && recRef.stop(); return; }

  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) return;

  const rec = new SpeechRec();
  rec.lang = 'th-TH';
  recRef = rec;

  rec.onstart = () => { isChatMic = true; btn.classList.add('recording'); };
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById('chatInput').value = text;
    setTimeout(sendChat, 80);
  };
  rec.onend = () => { isChatMic = false; btn.classList.remove('recording'); };
  rec.start();
}

// ── Translate with Voice Input ─────────────────────────────────
function toggleTranslateMic() {
  const btn = document.getElementById('translateMicBtn');
  if (!btn) return;
  
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) return;

  const fromLang = document.getElementById('fromLang').value;
  const rec = new SpeechRec();
  rec.lang = fromLang === 'th' ? 'th-TH' : fromLang === 'en' ? 'en-US' : 'zh-CN';
  recRef = rec;

  rec.onstart = () => { btn.classList.add('recording'); };
  rec.onresult = (e) => {
    const text = e.results[0][0].transcript;
    document.getElementById('translateInput').value = text;
    onTranslateInput();
  };
  rec.onend = () => { btn.classList.remove('recording'); };
  rec.start();
}

function onTranslateInput() {
  const text = document.getElementById('translateInput').value;
  document.getElementById('inputSpeakBtn').style.display = text ? 'flex' : 'none';
  clearTimeout(translateDebounce);
  if (!text.trim()) { setTranslateOutput(''); return; }
  setTranslateOutputLoading();
  translateDebounce = setTimeout(() => doTranslate(text), 600);
}

async function doTranslate(text) {
  const from = document.getElementById('fromLang').value;
  const to   = document.getElementById('toLang').value;
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const result = data[0].map(i => i[0]).join('');
    setTranslateOutput(result);
  } catch {
    setTranslateOutput('', '[ไม่สามารถเชื่อมต่อ Google Translate ได้]');
  }
}

function setTranslateOutputLoading() {
  document.getElementById('translateOutput').innerHTML = `
    <div class="translate-loading">
      <div class="translate-spinner"></div>
      กำลังแปล...
    </div>`;
}

function setTranslateOutput(text, errorText='') {
  const el = document.getElementById('translateOutput');
  if (!text && !errorText) {
    el.innerHTML = '<p class="translate-placeholder">คำแปลจะปรากฏที่นี่...</p>';
    return;
  }
  if (errorText) {
    el.innerHTML = `<p class="translate-placeholder">${escHtml(errorText)}</p>`;
    return;
  }
  el.innerHTML = `
    <p class="translate-result">${escHtml(text)}</p>
    <div class="translate-out-actions">
      <button class="btn-out-action" onclick="speakTranslateOutput('${escAttr(text)}')" title="ฟัง"><i class="fas fa-volume-up"></i></button>
      <button class="btn-out-action" onclick="copyTranslate('${escAttr(text)}')" title="คัดลอก" id="copyBtn"><i class="fas fa-copy"></i></button>
    </div>`;
}

function speakTranslateInput() {
  const text = document.getElementById('translateInput').value;
  const lang = document.getElementById('fromLang').value;
  speakText(text, lang);
}

function speakTranslateOutput(text) {
  const lang = document.getElementById('toLang').value;
  speakText(text, lang);
}

function copyTranslate(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn');
    if (!btn) return;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    clearTimeout(copiedTimeout);
    copiedTimeout = setTimeout(() => {
      if (btn) btn.innerHTML = '<i class="fas fa-copy"></i>';
    }, 1800);
  });
}

function swapLangs() {
  const from = document.getElementById('fromLang');
  const to   = document.getElementById('toLang');
  const input = document.getElementById('translateInput');
  const cur = document.querySelector('.translate-result');
  const swapText = cur ? cur.textContent : '';

  const tmp = from.value;
  from.value = to.value;
  to.value = tmp;

  if (swapText) {
    input.value = swapText;
    document.getElementById('inputSpeakBtn').style.display = 'flex';
    onTranslateInput();
  }
}

function renderQuickPhrases() {
  const s = currentScenario();
  const wrap = document.getElementById('quickPhrases');
  if (s.phrases.length === 0) { wrap.innerHTML = ''; return; }
  wrap.innerHTML = `
    <div class="quick-label">ประโยคด่วน · ${s.labelTh}</div>
    ${s.phrases.slice(0, 3).map(p => `
      <div class="quick-phrase-item">
        <div class="q-en">${escHtml(p.en)}</div>
        ${p.phonetic_en ? `<div class="q-phonetic-en">${escHtml(p.phonetic_en)}</div>` : ''}
        <div class="q-th">🇹🇭 ${escHtml(p.th)}</div>
        <div class="q-zh">🇨🇳 ${escHtml(p.zh)}</div>
        ${p.phonetic_zh ? `<div class="q-phonetic-zh">${escHtml(p.phonetic_zh)}</div>` : ''}
      </div>`).join('')}`;
}

// ── Tabs ──────────────────────────────────────────────────────
function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  else {
    const b = document.querySelector(`[data-tab="${tabId}"]`);
    if (b) b.classList.add('active');
  }
  const panel = document.getElementById(`panel-${tabId}`);
  if (panel) panel.classList.add('active');
  activeTab = tabId;
}

// ── Speech ────────────────────────────────────────────────────
function speakText(text, lang) {
  if (!text) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const langMap = {
    'th': ['th','th-TH'],
    'en': ['en-US','en-GB','en'],
    'zh': ['zh-CN','zh-TW','zh'],
    'zh-CN': ['zh-CN','zh-TW','zh'],
    'zh-TW': ['zh-TW','zh-CN','zh'],
  };
  const targets = langMap[lang] || ['en-US'];
  const voice = voices.find(v => targets.some(t => v.lang.startsWith(t)));
  if (voice) utt.voice = voice;
  utt.lang = targets[0];
  utt.rate = 0.9;
  synth.speak(utt);
}

// ── Helpers ───────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function escAttr(str) {
  return String(str)
    .replace(/\\/g,'\\\\')
    .replace(/'/g,"\\'");
}
