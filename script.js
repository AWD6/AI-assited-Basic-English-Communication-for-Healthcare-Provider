const STORAGE_KEY = 'nurse_app_v2';
const defaultScenarios = [
  {
    id: 'greeting',
    labelTh: 'การทักทาย (Greeting)',
    phrases: [
      { id: 'g1', en: 'Are you here for a check-up?', th: 'คุณมาตรวจร่างกายใช่ไหมคะ?', zh: '你是来检查身体的吗？', phonetic_en: 'อาร์ ยู เฮียร์ ฟอร์ อะ เช็ค-อัพ?', phonetic_zh: 'Nǐ shì lái jiǎnchá shēntǐ de ma?' },
      { id: 'g2', en: 'Sorry for the delay.', th: 'ขอโทษที่ให้รอนานนะคะ', zh: '抱歉让你久等了。', phonetic_en: 'ซอ-รี ฟอร์ เดอะ ดี-เลย์', phonetic_zh: 'Bàoqiàn ràng nǐ jiǔděng le.' },
      { id: 'g3', en: 'Please follow me.', th: 'กรุณาเดินตามฉันมาค่ะ', zh: '请跟我มา。', phonetic_en: 'พลีส ฟอล-โล มี', phonetic_zh: 'Qǐng gēn wǒ lái.' },
      { id: 'g4', en: 'Have you checked your blood pressure, weight, and height?', th: 'คุณวัดความดันโลหิต ชั่งน้ำหนัก วัดส่วนสูงหรือยังคะ?', zh: '你量过血压、称过体重和身高了吗？', phonetic_en: 'แฮฟ ยู เช็คด ยัวร์ บลัด เพรสเชอร์, เวท แอนด์ ไฮท์?', phonetic_zh: 'Nǐ liángguò xuèyā, chēngguò tǐzhòng hé shēngāole ma?' }
    ]
  },
  {
    id: 'registration',
    labelTh: 'การลงทะเบียน (Registration)',
    phrases: [
      { id: 'r1', en: 'Please take a seat.', th: 'กรุณานั่งรอสักครู่ค่ะ', zh: '请坐。', phonetic_en: 'พลีส เทค อะ ซีท', phonetic_zh: 'Qǐng zuò.' },
      { id: 'r2', en: 'The nurse will call you soon.', th: 'พยาบาลจะเรียกชื่อคุณในไม่ช้าค่ะ', zh: '护士很快就会叫你。', phonetic_en: 'เดอะ เนิร์ส วิล คอล ยู ซูน', phonetic_zh: 'Hùshì hěn kuài jiù huì jiào nǐ.' },
      { id: 'r3', en: 'The screen will show your queue.', th: 'หน้าจอจะแสดงลำดับคิวของคุณค่ะ', zh: '屏幕上会显示你的排队号码。', phonetic_en: 'เดอะ สกรีน วิล โชว์ ยัวร์ คิว', phonetic_zh: 'Píngmù shàng huì xiǎnshì nǐ de páiduì hàomǎ.' },
      { id: 'r4', en: 'The doctor will see you shortly.', th: 'คุณจะได้พบคุณหมอในอีกสักครู่ค่ะ', zh: '医生很快就会为你诊治。', phonetic_en: 'เดอะ ดอค-เทอร์ วิล ซี ยู ชอร์ต-ลี', phonetic_zh: 'Yīshēng hěn kuài jiù huì wèi nǐ zhěnzhì.' },
      { id: 'r5', en: 'Could you repeat that, please?', th: 'ช่วยพูดซ้ำอีกรอบได้ไหมคะ?', zh: '请再说一遍好吗？', phonetic_en: 'คูด ยู รี-พีท แดท, พลีส?', phonetic_zh: 'Qǐng zàishuō yībiàn hǎo ma?' },
      { id: 'r6', en: 'What is your phone number?', th: 'เบอร์โทรศัพท์ของคุณคือเบอร์อะไรคะ?', zh: '你的电话号码是多少？', phonetic_en: 'วอท อิส ยัวร์ โฟน นัม-เบอร์?', phonetic_zh: 'Nǐ de diànhuà hàomǎ shì duōshǎo?' },
      { id: 'r7', en: 'When did the symptoms start?', th: 'อาการเริ่มเป็นตั้งแต่เมื่อไหร่คะ?', zh: '症状是什么时候开始的？', phonetic_en: 'เวน ดิด เดอะ ซิม-ทอม สตาร์ท?', phonetic_zh: 'Zhèngzhuàng shì shénme shíhòu kāishǐ de?' },
      { id: 'r8', en: 'Where does it hurt?', th: 'คุณปวดตรงไหนคะ?', zh: '你哪里痛？', phonetic_en: 'แวร์ ดาส อิท เฮิร์ท?', phonetic_zh: 'Nǐ nǎlǐ tòng?' },
      { id: 'r9', en: 'How severe is the pain?', th: 'คุณปวดมากแค่ไหนคะ?', zh: '痛得有多厉害？', phonetic_en: 'ฮาว ซี-เวียร์ อิส เดอะ เพน?', phonetic_zh: 'Tòng dé yǒu duō lìhài?' },
      { id: 'r10', en: 'Do you have a fever?', th: 'คุณมีไข้ไหมคะ?', zh: '你发烧吗？', phonetic_en: 'ดู ยู แฮฟ อะ ฟี-เวียร์?', phonetic_zh: 'Nǐ fāshāo ma?' },
      { id: 'r11', en: 'Are you currently taking any medication?', th: 'ตอนนี้คุณกำลังทานยาอะไรอยู่ไหมคะ?', zh: '你目前在服用什么药物吗？', phonetic_en: 'อาร์ ยู เคอร์-เรนท์-ลี เทค-คิง เอน-นี เมด-ดิ-เค-ชัน?', phonetic_zh: 'Nǐ mùqián zài fúyòng shénme yàowù ma?' },
      { id: 'r12', en: 'Do you have any chronic diseases?', th: 'คุณมีโรคประจำตัวไหมคะ?', zh: '你有慢性病吗？', phonetic_en: 'ดู ยู แฮฟ เอน-นี ครอน-นิค ดิ-ซี-เซส?', phonetic_zh: 'Nǐ yǒu mànxìngbìng ma?' },
      { id: 'r13', en: 'Have you eaten today?', th: 'วันนี้คุณทานอะไรมาหรือยังคะ?', zh: '你今天吃饭了吗？', phonetic_en: 'แฮฟ ยู อีท-เทน ทู-เดย์?', phonetic_zh: 'Nǐ jīntiān chīfànle ma?' },
      { id: 'r14', en: 'Do you smoke or drink alcohol?', th: 'คุณสูบบุหรี่หรือดื่มแอลกอฮอล์ไหมคะ?', zh: '你抽烟或喝酒吗？', phonetic_en: 'ดู ยู สโมค ออร์ ดริงค์ แอล-กอ-ฮอล?', phonetic_zh: 'Nǐ chōuyān huò hējiǔ ma?' },
      { id: 'r15', en: 'Please sign here.', th: 'กรุณาเซ็นชื่อตรงนี้ค่ะ', zh: '请在这里签名。', phonetic_en: 'พลีส ไซน์ เฮียร์', phonetic_zh: 'Qǐng zài zhèlǐ qiānmíng.' },
      { id: 'r16', en: 'We need to check your vital signs first.', th: 'เราต้องขอตรวจสัญญาณชีพเบื้องต้นก่อนค่ะ', zh: '我们需要先检查你的生命体征。', phonetic_en: 'วี นีด ทู เช็ค ยัวร์ ไว-ทัล ไซน์ เฟิร์สท์', phonetic_zh: 'Wǒmen xūyào xiān jiǎnchá nǐ de shēngmìng tǐzhēng.' }
    ]
  },
  {
    id: 'direction',
    labelTh: 'การบอกทาง (Direction)',
    phrases: [
      { id: 'd1', en: 'Registration is at counter 19, 1st floor, Chalerm Phra Baramee Building.', th: 'ลงทะเบียนที่ห้องเวชระเบียน หมายเลข 19 ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh: '登记处在 Chalerm Phra Baramee 大楼一楼 19 号柜台。', phonetic_en: 'เร-จิส-เทร-ชัน อิส แอท เคาน์-เทอร์ ไนน์-ทีน...', phonetic_zh: 'Dēngjì chù zài Chalerm Phra Baramee dàlóu yī lóu 19 hào guìtái.' },
      { id: 'd2', en: 'Please contact customer service, 1st floor, Chalerm Phra Baramee Building.', th: 'กรุณาติดต่อ customer service centre ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh: '请联系 Chalerm Phra Baramee 大楼一楼的客户服务中心。', phonetic_en: 'พลีส คอน-แทค คัส-ตอม-เมอร์ เซอร์-วิส...', phonetic_zh: 'Qǐng liánxì Chalerm Phra Baramee dàlóu yī lóu de kèhù fúwù zhōngxīn.' },
      { id: 'd3', en: 'Please contact cashier number 1 on the first floor of Sujinno Building.', th: 'กรุณาติดต่อชำระเงินที่เคาน์เตอร์ 1 ชั้น 1 อาคารสุจิณโณค่ะ', zh: '请到 Sujinno 大楼一楼 1 号出纳处。', phonetic_en: 'พลีส คอน-แทค แคช-เชียร์ นัม-เบอร์ วัน...', phonetic_zh: 'Qǐng dào Sujinno dàlóu yī lóu 1 hào chūnà chù.' },
      { id: 'd4', en: 'X-ray is at room 33, 1st floor, Boonsom Martin Building.', th: 'เอกซเรย์ที่ห้องหมายเลข 33 ชั้น 1 อาคารบุญสม มาร์ตินค่ะ', zh: 'X 光室在 Boonsom Martin 大楼一楼 33 号房。', phonetic_en: 'เอ็กซ์-เรย์ อิส แอท รูม เทอร์ตี้-ทรี...', phonetic_zh: 'X guāng shì zài Boonsom Martin dàlóu yī lóu 33 hào fáng.' },
      { id: 'd5', en: 'Pharmacy number 30 is on the 1st floor of Chalerm Phra Baramee Building.', th: 'ห้องยาหมายเลข 30 อยู่ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh: '30 号药房在 Chalerm Phra Baramee 大楼一楼。', phonetic_en: 'ฟาร์-มา-ซี นัม-เบอร์ เทอร์ตี้ อิส ออน เดอะ เฟิร์สท์ ฟลอร์...', phonetic_zh: '30 hào yàofáng zài Chalerm Phra Baramee dàlóu yī lóu.' },
      { id: 'd6', en: 'Please follow the signs.', th: 'กรุณาเดินตามป้ายบอกทางไปนะคะ', zh: '请跟着指示牌走。', phonetic_en: 'พลีส ฟอล-โล เดอะ ไซน์ส', phonetic_zh: 'Qǐng gēnzhe zhǐshìpái zǒu.' }
    ]
  },
  {
    id: 'during_care',
    labelTh: 'ระหว่างการตรวจ (During Care)',
    phrases: [
      { id: 'c1', en: 'Please lie down.', th: 'กรุณานอนลงค่ะ', zh: '请躺下。', phonetic_en: 'พลีส ไล ดาวน์', phonetic_zh: 'Qǐng tǎng xià.' },
      { id: 'c2', en: 'Please sit still.', th: 'กรุณานั่งนิ่งๆ นะคะ', zh: '请坐好别动。', phonetic_en: 'พลีส ซิท สติล', phonetic_zh: 'Qǐng zuò hǎo bié dòng.' },
      { id: 'c3', en: 'Please roll up your sleeve.', th: 'กรุณาถกแขนเสื้อขึ้นค่ะ', zh: '请卷起袖子。', phonetic_en: 'พลีส โรล อัพ ยัวร์ สลีฟ', phonetic_zh: 'Qǐng juǎn qǐ xiùzi.' },
      { id: 'c4', en: 'Please take a deep breath.', th: 'กรุณาหายใจเข้าลึกๆ ค่ะ', zh: '请深呼吸。', phonetic_en: 'พลีส เทค อะ ดีพ บรีธ', phonetic_zh: 'Qǐng shēnhūxī.' },
      { id: 'c5', en: 'Please do not move.', th: 'กรุณาอย่าขยับนะคะ', zh: '请不要动。', phonetic_en: 'พลีส ดู นอท มูฟ', phonetic_zh: 'Qǐng bùyào dòng.' },
      { id: 'c6', en: 'I am going to check your blood pressure.', th: 'ฉันกำลังจะวัดความดันโลหิตให้คุณค่ะ', zh: '我要为你量血压。', phonetic_en: 'ไอ แอม โก-อิง ทู เช็ค ยัวร์ บลัด เพรสเชอร์', phonetic_zh: 'Wǒ yào wèi nǐ liáng xuèyā.' },
      { id: 'c7', en: 'This may feel a little uncomfortable.', th: 'อาจจะรู้สึกไม่สบายตัวนิดหน่อยนะคะ', zh: '这可能会有点不舒服。', phonetic_en: 'ดิส เมย์ ฟีล อะ ลิต-เทิล อัน-คอม-ฟอร์-ทะ-เบิล', phonetic_zh: 'Zhè kěnéng huì yǒudiǎn bù shūfú.' },
      { id: 'c8', en: 'Tell me if you feel dizzy.', th: 'บอกฉันนะคะถ้าคุณรู้สึกเวียนหัว', zh: '如果你觉得头晕请告诉我。', phonetic_en: 'เทล มี อิฟ ยู ฟีล ดิซ-ซี', phonetic_zh: 'Rúguǒ nǐ juédé tóuyūn qǐng gàosù wǒ.' },
      { id: 'c9', en: 'Please wait for the test results.', th: 'กรุณารอผลตรวจสักครู่นะคะ', zh: '请等候检查结果。', phonetic_en: 'พลีส เวด ฟอร์ เดอะ เทสท์ รี-ซัลท์ส', phonetic_zh: 'Qǐng děnghòu jiǎnchá jiéguǒ.' },
      { id: 'c10', en: 'If you feel worse, please return immediately.', th: 'ถ้าอาการแย่ลง ให้รีบกลับมาทันทีนะคะ', zh: '如果你觉得情况恶化，请立即回来。', phonetic_en: 'อิฟ ยู ฟีล เวิร์ส, พลีส รี-เทิร์น อิม-มี-เดียท-ลี', phonetic_zh: 'Rúguǒ nǐ juédé qíngkuàng èhuà, qǐng lìjí huílái.' },
      { id: 'c11', en: 'Do you have any questions?', th: 'คุณมีคำถามอะไรเพิ่มเติมไหมคะ?', zh: '你有什么问题吗？', phonetic_en: 'ดู ยู แฮฟ เอน-นี เควส-ชันส์?', phonetic_zh: 'Nǐ yǒu shé me wèntí ma?' }
    ]
  }
];

let scenarios = [];
let activeScenarioId = 'greeting';
let isChatMic = false;
let chatHistory = [];
let translateDebounce = null;
let editingId = null;
let geminiApiKey = '';
let activeRolePlayId = 'abdominal';

const rolePlayScenarios = {
  abdominal: {
    title: 'ปวดท้องรุนแรง (Abdominal Pain)',
    icon: 'fa-stomach',
    patient: { name: 'Sarah', age: 28, illness: 'Severe Abdominal Pain' },
    prompt: 'You are Sarah, 28. You have severe pain in your lower right abdomen. It started 4 hours ago. Pain scale is 8/10. It feels sharp and constant. You feel slightly nauseous but haven\'t vomited. You are scared it might be appendicitis.'
  },
  fever: {
    title: 'ไข้สูงและไอ (High Fever & Cough)',
    icon: 'fa-thermometer-half',
    patient: { name: 'Mark', age: 35, illness: 'High Fever' },
    prompt: 'You are Mark, 35. You have a high fever (39°C) and a dry cough for 2 days. You feel very weak and have body aches. You traveled recently. You want to know if it could be COVID or Flu.'
  },
  allergy: {
    title: 'แพ้อาหาร/ผื่นคัน (Allergic Reaction)',
    icon: 'fa-allergies',
    patient: { name: 'Emma', age: 24, illness: 'Skin Rash' },
    prompt: 'You are Emma, 24. You have an itchy red rash all over your arms and neck. It started after lunch (you ate seafood). Your throat feels a bit tight, and you are worried.'
  },
  accident: {
    title: 'อุบัติเหตุ/ข้อเท้าแพลง (Ankle Sprain)',
    icon: 'fa-crutches',
    patient: { name: 'John', age: 42, illness: 'Ankle Injury' },
    prompt: 'You are John, 42. You tripped while walking and twisted your left ankle. It is swollen and very painful to walk on (Pain 7/10). You think it might be broken.'
  }
};

function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      scenarios = parsed.scenarios || defaultScenarios;
      activeScenarioId = parsed.activeScenarioId || 'greeting';
      geminiApiKey = parsed.geminiApiKey || '';
    } catch (e) { scenarios = defaultScenarios; }
  } else {
    scenarios = JSON.parse(JSON.stringify(defaultScenarios));
  }
  
  if (geminiApiKey) {
    const keyInput = document.getElementById('geminiApiKey');
    if (keyInput) keyInput.value = geminiApiKey;
    updateGeminiStatus('active', 'Gemini AI พร้อมใช้งาน');
  }

  renderScenarios();
  renderPhrases();
  renderPracticeSelect();
  initChat();
  renderQuickPhrases();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ 
    scenarios, 
    activeScenarioId,
    geminiApiKey
  }));
}

function toggleGeminiConfig() {
  const body = document.getElementById('geminiConfigBody');
  const icon = document.getElementById('gemini-config-icon');
  const isOpen = body.classList.toggle('open');
  icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
}

function saveGeminiKey() {
  geminiApiKey = document.getElementById('geminiApiKey').value.trim();
  save();
  if (geminiApiKey) {
    updateGeminiStatus('active', 'บันทึก Key เรียบร้อยแล้ว');
  } else {
    updateGeminiStatus('', '');
  }
}

function updateGeminiStatus(type, msg) {
  const status = document.getElementById('geminiStatus');
  if (!status) return;
  status.className = 'gemini-status ' + type;
  status.textContent = msg;
}

function currentScenario() {
  return scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
}

/* ── Rendering ───────────────────────────────────────────── */
function renderScenarios() {
  const wrap = document.getElementById('scenarioTabs');
  wrap.innerHTML = scenarios.map(s => `
    <div class="scenario-tab ${s.id === activeScenarioId ? 'active' : ''}" onclick="selectScenario('${s.id}')">
      ${esc(s.labelTh)}
    </div>
  `).join('');
}

function selectScenario(id) {
  activeScenarioId = id;
  renderScenarios();
  renderPhrases();
  renderQuickPhrases();
}

function renderPhrases() {
  const s = currentScenario();
  const wrap = document.getElementById('phraseList');
  if (!s.phrases.length) {
    wrap.innerHTML = '<div class="empty-state">ยังไม่มีประโยคในหมวดนี้ กดปุ่ม + เพื่อเพิ่ม</div>';
    return;
  }
  wrap.innerHTML = s.phrases.map(p => `
    <div class="phrase-card" id="phrase-${p.id}">
      <div class="phrase-main">
        <div class="phrase-texts">
          <div class="phrase-row">
            <span class="badge-mini en">EN</span>
            <div class="phrase-col">
              <div class="phrase-en-text">${esc(p.en)}</div>
              ${p.phonetic_en ? `<span class="phrase-phonetic">${esc(p.phonetic_en)}</span>` : ''}
            </div>
          </div>
          <div class="phrase-row">
            <span class="badge-mini th">TH</span>
            <div class="phrase-col"><div class="phrase-th-text">${esc(p.th)}</div></div>
          </div>
          <div class="phrase-row">
            <span class="badge-mini zh">中</span>
            <div class="phrase-col">
              <div class="phrase-zh-text">${esc(p.zh)}</div>
              ${p.phonetic_zh ? `<span class="phrase-phonetic">${esc(p.phonetic_zh)}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="phrase-actions">
          <button class="btn-icon blue" onclick="speakText('${ea(p.en)}','en')" title="ฟัง EN"><i class="fas fa-volume-up"></i></button>
          <button class="btn-icon yellow" onclick="speakText('${ea(p.zh)}','zh')" title="ฟัง ZH">中</button>
          <button class="btn-icon green" onclick="openEditModal('${ea(p.id)}')" title="แก้ไข"><i class="fas fa-pen"></i></button>
          <button class="btn-icon red" onclick="openDeleteModal('${ea(p.id)}')" title="ลบ"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      ${(p.context || p.contextTh) ? `
      <button class="phrase-context-toggle" onclick="toggleCtx('${p.id}')">
        <span><i class="fas fa-info-circle"></i> เมื่อไรใช้ประโยคนี้</span>
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="phrase-context-body" id="ctx-${p.id}">
        ${p.contextTh ? `<div class="ctx-th">${esc(p.contextTh)}</div>` : ''}
        ${p.context ? `<div class="ctx-en">${esc(p.context)}</div>` : ''}
      </div>` : ''}
    </div>
  `).join('');
}

function toggleCtx(id) {
  const el = document.getElementById('ctx-' + id);
  const btn = el.previousElementSibling;
  const isOpen = el.classList.toggle('open');
  btn.classList.toggle('active');
  btn.querySelector('.fa-chevron-down').style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
}

/* ── Modal Logic ─────────────────────────────────────────── */
function openAddModal() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'เพิ่มประโยคใหม่';
  document.getElementById('phraseForm').reset();
  document.getElementById('autoPreview').classList.remove('visible');
  document.getElementById('modalOverlay').classList.add('open');
}

function openEditModal(id) {
  editingId = id;
  const p = currentScenario().phrases.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modalTitle').textContent = 'แก้ไขประโยค';
  document.getElementById('f-en').value = p.en || '';
  document.getElementById('f-th').value = p.th || '';
  document.getElementById('f-zh').value = p.zh || '';
  document.getElementById('f-phonetic-en').value = p.phonetic_en || '';
  document.getElementById('f-phonetic-zh').value = p.phonetic_zh || '';
  document.getElementById('f-ctx-th').value = p.contextTh || '';
  document.getElementById('f-ctx-en').value = p.context || '';
  document.getElementById('autoPreview').classList.remove('visible');
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

async function onModalThaiInput() {
  const th = document.getElementById('f-th').value.trim();
  if (th.length < 2) return;
  
  const autoWrap = document.getElementById('autoPreview');
  const content = document.getElementById('autoPreviewContent');
  autoWrap.classList.add('visible');
  content.innerHTML = '<div class="auto-preview-loading"><div class="translate-spinner"></div> AI กำลังแปลและสร้างคำอ่าน...</div>';

  try {
    const [en, zh] = await Promise.all([
      gTranslate(th, 'th', 'en'),
      gTranslate(th, 'th', 'zh-CN')
    ]);
    const phonEn = genPhonetics(en);
    
    const fEn = document.getElementById('f-en');
    const fZh = document.getElementById('f-zh');
    const fPhonEn = document.getElementById('f-phonetic-en');
    const fCtxTh = document.getElementById('f-ctx-th');
    const fCtxEn = document.getElementById('f-ctx-en');

    if (fEn && !fEn.value) fEn.value = en;
    if (fZh && !fZh.value) fZh.value = zh;
    if (fPhonEn && !fPhonEn.value) fPhonEn.value = phonEn;

    const ctx = getSmartContext(th);
    if (fCtxTh && !fCtxTh.value) fCtxTh.value = ctx.th;
    if (fCtxEn && !fCtxEn.value) fCtxEn.value = ctx.en;

    document.getElementById('autoPreviewContent').innerHTML = `
      <div class="auto-preview-row">
        <div class="auto-preview-label">🇬🇧 English</div>
        <div class="auto-preview-text" onclick="speakText('${ea(en)}','en')" style="cursor:pointer">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(en)}
        </div>
        ${phonEn ? `<span class="auto-preview-phonetic">${esc(phonEn)}</span>` : ''}
      </div>
      <div class="auto-preview-row">
        <div class="auto-preview-label">🇨🇳 中文</div>
        <div class="auto-preview-text" onclick="speakText('${ea(zh)}','zh')" style="cursor:pointer">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(zh)}
        </div>
      </div>
    `;
  } catch (e) {
    content.innerHTML = '<div style="color:#ef4444;font-size:12px">ขออภัย ระบบแปลอัตโนมัติขัดข้อง</div>';
  }
}

function savePhrase() {
  const en = document.getElementById('f-en').value.trim();
  const th = document.getElementById('f-th').value.trim();
  const zh = document.getElementById('f-zh').value.trim();
  
  if (!en || !th) {
    if (!en) document.getElementById('err-en').textContent = 'กรุณาระบุภาษาอังกฤษ';
    if (!th) document.getElementById('err-th').textContent = 'กรุณาระบุภาษาไทย';
    return;
  }

  const s = currentScenario();
  const newP = {
    id: editingId || 'p' + Date.now(),
    en, th, zh,
    phonetic_en: document.getElementById('f-phonetic-en').value.trim(),
    phonetic_zh: document.getElementById('f-phonetic-zh').value.trim(),
    contextTh: document.getElementById('f-ctx-th').value.trim(),
    context: document.getElementById('f-ctx-en').value.trim()
  };

  if (editingId) {
    const idx = s.phrases.findIndex(x => x.id === editingId);
    if (idx !== -1) s.phrases[idx] = newP;
  } else {
    s.phrases.push(newP);
  }

  save();
  renderPhrases();
  renderPracticeSelect();
  renderQuickPhrases();
  closeModal();
}

/* ── Delete Modal ────────────────────────────────────────── */
let deletingId = null;
function openDeleteModal(id) {
  deletingId = id;
  const p = currentScenario().phrases.find(x => x.id === id);
  if (!p) return;
  document.getElementById('deletePhraseText').textContent = p.en;
  document.getElementById('deleteModal').classList.add('open');
}
function closeDeleteModal() { document.getElementById('deleteModal').classList.remove('open'); }
function confirmDelete() {
  const s = currentScenario();
  s.phrases = s.phrases.filter(x => x.id !== deletingId);
  save();
  renderPhrases();
  renderPracticeSelect();
  renderQuickPhrases();
  closeDeleteModal();
}

/* ── Practice Mode ───────────────────────────────────────── */
function renderPracticeSelect() {
  const sel = document.getElementById('practiceSelect');
  const s = currentScenario();
  let html = `<option value="">-- เลือกประโยคที่จะฝึก --</option>`;
  s.phrases.forEach(p => {
    html += `<option value="${p.id}|en">🇬🇧 ${p.en}</option>`;
    if (p.zh) html += `<option value="${p.id}|zh">🇨🇳 ${p.zh}</option>`;
  });
  sel.innerHTML = html;
}

function onPracticeChange() {
  const val = document.getElementById('practiceSelect').value;
  if (!val) {
    document.getElementById('targetBox').style.display = 'none';
    return;
  }
  const [id, lang] = val.split('|');
  const foundPhrase = currentScenario().phrases.find(x => x.id === id);
  const text = lang === 'en' ? foundPhrase.en : foundPhrase.zh;
  
  document.getElementById('targetBox').style.display = 'flex';
  document.getElementById('targetText').textContent = text;
  
  const pe = document.getElementById('targetPhonetic');
  const phoneticKey = lang === 'en' ? 'phonetic_en' : 'phonetic_zh';
  if (foundPhrase && foundPhrase[phoneticKey]) {
    pe.textContent = foundPhrase[phoneticKey];
    pe.style.display = 'block';
  } else { pe.style.display = 'none'; }
  
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('recResult').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = '';
}

function startPracticeRec() {
  const val = document.getElementById('practiceSelect').value;
  if (!val) return;
  const [id, lang] = val.split('|');
  const foundPhrase = currentScenario().phrases.find(x => x.id === id);
  const target = lang === 'en' ? foundPhrase.en : foundPhrase.zh;
  
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('เบราว์เซอร์นี้ไม่รองรับการจำเสียง'); return; }
  
  const rec = new SR();
  rec.lang = lang === 'en' ? 'en-US' : 'zh-CN';
  const btn = document.getElementById('practiceMicBtn');
  
  rec.onstart = () => {
    btn.classList.add('recording');
    document.getElementById('recPlaceholder').textContent = 'กำลังฟัง...';
  };
  
  rec.onresult = (e) => {
    const result = e.results[0][0].transcript;
    showPracticeResult(target, result, lang);
  };
  
  rec.onend = () => {
    btn.classList.remove('recording');
  };
  
  rec.start();
}

function showPracticeResult(target, result, lang) {
  document.getElementById('recPlaceholder').style.display = 'none';
  const resEl = document.getElementById('recResult');
  resEl.style.display = 'block';
  resEl.textContent = `คุณพูดว่า: "${result}"`;

  const score = calcScore(target, result);
  const scoreBox = document.getElementById('scoreBox');
  scoreBox.style.display = 'block';
  document.getElementById('scoreNum').textContent = score;
  document.getElementById('scoreBar').style.width = score + '%';
  
  scoreBox.className = 'score-box ' + (score > 80 ? 'good' : score > 50 ? 'meh' : 'bad');
  
  renderWordAnalysis(target, result, lang);
}

function calcScore(t, r) {
  const clean = s => s.toLowerCase().replace(/[.,?!]/g, '').trim();
  const t1 = clean(t).split(' '), t2 = clean(r).split(' ');
  let matches = 0;
  t1.forEach(w => { if (t2.includes(w)) matches++; });
  return Math.round((matches / t1.length) * 100);
}

function renderWordAnalysis(target, result, lang) {
  const wrap = document.getElementById('wordAnalysis');
  const clean = s => s.toLowerCase().replace(/[.,?!]/g, '').trim();
  const tWords = lang === 'en' ? target.split(' ') : target.split('');
  const rWords = clean(result).split(lang === 'en' ? ' ' : '');
  
  let html = `<div class="word-analysis-title">วิเคราะห์ราย${lang === 'en' ? 'คำ' : 'ตัวอักษร'}:</div><div class="word-tokens">`;
  tWords.forEach(w => {
    const isCorrect = rWords.includes(clean(w));
    html += `<div class="word-token ${isCorrect ? 'correct' : 'wrong'}" onclick="speakText('${ea(w)}','${lang}')">
      ${esc(w)}
    </div>`;
  });
  html += `</div>`;
  wrap.innerHTML = html;
}

/* ── Role Play ───────────────────────────────────────────── */
function initChat() {
  chatHistory = [];
  const box = document.getElementById('chatBox');
  if (box) {
    box.innerHTML = '';
    const scenario = rolePlayScenarios[activeRolePlayId];
    const patient = scenario.patient;
    const welcomeEn = `Hello! I'm ${patient.name}. I'm here because I have ${patient.illness.toLowerCase()}. Can you help me?`;
    const welcomeTh = `สวัสดีค่ะ/ครับ ผม/ฉันชื่อ ${patient.name} ที่มาวันนี้เพราะมีอาการ ${scenario.title.split('(')[0].trim()} ช่วยหน่อยได้ไหมคะ/ครับ?`;
    appendMsg('ai', welcomeEn, welcomeTh);
  }
  renderRolePlaySelector();
}

function selectRolePlay(id) {
  activeRolePlayId = id;
  initChat();
}

function renderRolePlaySelector() {
  const wrap = document.getElementById('rolePlaySelector');
  if (!wrap) return;
  wrap.innerHTML = Object.keys(rolePlayScenarios).map(id => {
    const s = rolePlayScenarios[id];
    const active = id === activeRolePlayId ? 'active' : '';
    return `<div class="rp-option ${active}" onclick="selectRolePlay('${id}')">
      <i class="fas ${s.icon}"></i>
      <span>${s.title}</span>
    </div>`;
  }).join('');
}

function resetChat() { initChat(); }

async function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  
  chatHistory.push({ role: 'user', content: text });
  appendMsg('user', text);
  
  const typId = appendTyping();
  
  try {
    let reply;
    if (geminiApiKey) {
      reply = await getGeminiReply(text);
    } else {
      const localReply = getAIReply(text);
      reply = { en: localReply.en, th: localReply.th };
    }
    
    removeTyping(typId);
    chatHistory.push({ role: 'assistant', content: reply.en });
    appendMsg('ai', reply.en, reply.th);
    speakText(reply.en, 'en');
  } catch (error) {
    console.error('Chat Error:', error);
    removeTyping(typId);
    const fallback = getAIReply(text);
    appendMsg('ai', fallback.en, fallback.th);
    speakText(fallback.en, 'en');
  }
}

async function getGeminiReply(userInput) {
  const scenario = rolePlayScenarios[activeRolePlayId];
  const systemPrompt = `${scenario.prompt} 
You are currently at a hospital in Thailand talking to a nurse or medical staff.
Rules:
1. Respond naturally like a patient in pain or distress.
2. Stay strictly within your assigned symptoms and history.
3. If asked about pain scale (1-10), be consistent with your role.
4. Keep responses short (1-3 sentences).
5. IMPORTANT: You must provide your response in a JSON format with two fields: "en" (English response) and "th" (Thai translation).
Example: {"en": "Yes, it hurts a lot right here.", "th": "ใช่ค่ะ เจ็บตรงนี้มากเลย"}
6. Stay in character.`;

  const history = chatHistory.slice(-6).map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        ...history
      ],
      generationConfig: {
        response_mime_type: "application/json",
      }
    })
  });

  if (!response.ok) throw new Error('Gemini API Error');
  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;
  return JSON.parse(content);
}

const aiScenarios = {
  stomach: { active: false, replies: [
    { en: "It's right here in my lower stomach. It hurts so much.", th: "มันปวดตรงท้องน้อยตรงนี้ค่ะ ปวดมากเลย" },
    { en: "It's a sharp pain, like something is stabbing me.", th: "มันปวดแปลบๆ เหมือนมีอะไรมาแทงเลยค่ะ" }
  ]},
  headache: { active: false, replies: [
    { en: "My head is spinning and I feel very dizzy.", th: "รู้สึกเวียนหัวเหมือนโลกหมุนเลยค่ะ" },
    { en: "I've had this headache since this morning.", th: "ปวดหัวแบบนี้มาตั้งแต่เช้าแล้วค่ะ" }
  ]}
};

function getAIReply(t) {
  t = t.toLowerCase();
  if (t.includes('hello') || t.includes('hi') || t.includes('สวัสดี')) {
    return { en: "Hello nurse, I'm not feeling well. My stomach hurts.", th: "สวัสดีค่ะคุณพยาบาล ฉันรู้สึกไม่ค่อยสบาย ปวดท้องมากเลยค่ะ" };
  }
  if (t.includes('where') || t.includes('hurt') || t.includes('ปวดตรงไหน')) {
    if (t.includes('ท้อง') || t.includes('stomach')) {
      aiScenarios.stomach.active = true;
      return aiScenarios.stomach.replies[0];
    }
    if (t.includes('หัว') || t.includes('head')) {
      aiScenarios.headache.active = true;
      return aiScenarios.headache.replies[0];
    }
    return { en: "It hurts in my chest and I find it hard to breathe sometimes.", th: "เจ็บหน้าอกและบางครั้งหายใจลำบากค่ะ" };
  }
  if (/scale|score|1 to 10|ปวดมากไหม|คะแนน/i.test(t)) {
    return { en: "I would say it's an 8 out of 10. It's very severe.", th: "ประมาณ 8 เต็ม 10 ค่ะ ปวดรุนแรงมาก" };
  }
  if (/medication|medicine|drug|ยา|กิน|taking/i.test(t)) {
    return { en: "I took some aspirin two hours ago, but it didn't help at all.", th: "ทานแอสไพรินไปเมื่อ 2 ชั่วโมงก่อน แต่ไม่ช่วยเลยค่ะ" };
  }
  return { 
    en: "I'm sorry, I'm in a lot of pain and can't understand well. Could you explain that again simply?", 
    th: "ขอโทษนะคะ ฉันปวดมากจนไม่ค่อยเข้าใจ ช่วยอธิบายง่ายๆ อีกรอบได้ไหมคะ?" 
  };
}

function appendMsg(role, en, th = '') {
  const box = document.getElementById('chatBox');
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  if (role === 'ai') {
    d.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="msg-content">
        <div class="msg-bubble">${esc(en)}</div>
        ${th ? `<div class="msg-hint">${esc(th)}</div>` : ''}
        <button class="msg-listen" onclick="speakText('${ea(en)}','en')">▶ ฟัง</button>
      </div>`;
  } else {
    d.innerHTML = `<div class="msg-content"><div class="msg-bubble">${esc(en)}</div></div>
      <div class="msg-user-avatar"><i class="fas fa-user-nurse"></i></div>`;
  }
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

let _tc = 0;
function appendTyping() {
  const id = 't-' + (++_tc), box = document.getElementById('chatBox');
  const d = document.createElement('div'); d.className = 'msg ai'; d.id = id;
  d.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-content"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  box.appendChild(d); box.scrollTop = box.scrollHeight; return id;
}
function removeTyping(id) { const el = document.getElementById(id); if (el) el.remove(); }

function toggleChatMic() {
  const btn = document.getElementById('chatMicBtn');
  if (isChatMic) { recRef && recRef.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
  const rec = new SR(); rec.lang = 'th-TH'; recRef = rec;
  rec.onstart = () => { isChatMic = true; btn.classList.add('recording'); };
  rec.onresult = (e) => { document.getElementById('chatInput').value = e.results[0][0].transcript; setTimeout(sendChat, 80); };
  rec.onend = () => { isChatMic = false; btn.classList.remove('recording'); };
  rec.start();
}

/* ── Translate ────────────────────────────────────────────── */
function toggleTranslateMic() {
  const btn = document.getElementById('translateMicBtn');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if (!SR) return;
  const lang = document.getElementById('fromLang').value;
  const rec = new SR(); rec.lang = lang === 'th' ? 'th-TH' : lang === 'en' ? 'en-US' : 'zh-CN'; recRef = rec;
  rec.onstart = () => btn.classList.add('recording');
  rec.onresult = (e) => { document.getElementById('translateInput').value = e.results[0][0].transcript; onTranslateInput(); };
  rec.onend = () => btn.classList.remove('recording');
  rec.start();
}
function onTranslateInput() {
  const text = document.getElementById('translateInput').value;
  document.getElementById('inputSpeakBtn').style.display = text ? 'flex' : 'none';
  clearTimeout(translateDebounce);
  if (!text.trim()) { setTransOutput(''); return; }
  setTransOutputLoading();
  translateDebounce = setTimeout(() => doTranslate(text), 600);
}
async function doTranslate(text, from, to) {
  try {
    const r = await gTranslate(text, from || document.getElementById('fromLang').value, to || document.getElementById('toLang').value);
    if (!from) setTransOutput(r);
    return r;
  } catch { if (!from) setTransOutput('', '[ไม่สามารถเชื่อมต่อได้]'); }
}
async function gTranslate(t, f, to) {
  const u = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${f}&tl=${to}&dt=t&q=${encodeURIComponent(t)}`;
  const res = await fetch(u); const data = await res.json();
  return data[0].map(x => x[0]).join('');
}
function genPhonetics(en) {
  return en.toLowerCase().replace(/[.,?!]/g, '').split(' ').map(w => {
    const m = { 'are':'อาร์', 'you':'ยู', 'here':'เฮียร์', 'for':'ฟอร์', 'a':'อะ', 'check-up':'เช็ค-อัพ', 'sorry':'ซอ-รี', 'the':'เดอะ', 'delay':'ดี-เลย์', 'please':'พลีส', 'follow':'ฟอล-โล', 'me':'มี' };
    return m[w] || w;
  }).join(' ');
}
function getSmartContext(th) {
  return { th: "ใช้เมื่อต้องการสอบถามอาการเบื้องต้น", en: "Use when asking for initial symptoms" };
}
function setTransOutputLoading() {
  document.getElementById('translateOutput').innerHTML = `<div class="translate-loading"><div class="translate-spinner"></div> กำลังแปล...</div>`;
}
function setTransOutput(text, err = '') {
  const el = document.getElementById('translateOutput');
  const toLang = document.getElementById('toLang').value;
  if (!text && !err) { el.innerHTML = '<p class="translate-placeholder">คำแปลจะปรากฏที่นี่...</p>'; return; }
  if (err) { el.innerHTML = `<p class="translate-placeholder">${esc(err)}</p>`; return; }
  el.innerHTML = `<p class="translate-result">${esc(text)}</p>
    <div class="translate-out-actions">
      <button class="btn-out-action" onclick="speakText('${ea(text)}','${toLang}')" title="ฟัง"><i class="fas fa-volume-up"></i> ฟัง</button>
      <button class="btn-out-action" onclick="copyTrans('${ea(text)}')" title="คัดลอก" id="copyBtn"><i class="fas fa-copy"></i> คัดลอก</button>
      <button class="btn-out-action" onclick="addTranslatedToPhrase('${ea(text)}')" title="เพิ่มในระบบ"><i class="fas fa-plus"></i> เพิ่มประโยค</button>
    </div>`;
}
function addTranslatedToPhrase(translatedText) {
  const input = document.getElementById('translateInput').value.trim();
  const fromLang = document.getElementById('fromLang').value;
  const toLang = document.getElementById('toLang').value;
  openAddModal();
  setTimeout(() => {
    if (fromLang === 'th') {
      document.getElementById('f-th').value = input;
      if (toLang === 'en') document.getElementById('f-en').value = translatedText;
      else if (toLang === 'zh-CN') document.getElementById('f-zh').value = translatedText;
      onModalThaiInput();
    } else if (fromLang === 'en') {
      document.getElementById('f-en').value = input;
      if (toLang === 'th') document.getElementById('f-th').value = translatedText;
      if (document.getElementById('f-en').value) {
        document.getElementById('f-phonetic-en').value = genPhonetics(input);
      }
    }
  }, 100);
}
function speakTranslateInput() { speakText(document.getElementById('translateInput').value, document.getElementById('fromLang').value); }
function copyTrans(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn'); if (!btn) return;
    btn.innerHTML = '<i class="fas fa-check"></i> คัดลอกแล้ว';
    setTimeout(() => { if (btn) btn.innerHTML = '<i class="fas fa-copy"></i> คัดลอก'; }, 1800);
  });
}
function swapLangs() {
  const f = document.getElementById('fromLang'), t = document.getElementById('toLang');
  const cur = document.querySelector('.translate-result'), inp = document.getElementById('translateInput');
  const swapText = cur ? cur.textContent : '';
  const tmp = f.value; f.value = t.value; t.value = tmp;
  if (swapText) { inp.value = swapText; document.getElementById('inputSpeakBtn').style.display = 'flex'; onTranslateInput(); }
}

function renderQuickPhrases() {
  const s = currentScenario();
  const wrap = document.getElementById('quickPhrases');
  if (!s.phrases.length) { wrap.innerHTML = ''; return; }
    wrap.innerHTML = `<div class="quick-label">ประโยคด่วน · ${esc(s.labelTh)}</div>
    ${s.phrases.slice(0, 3).map(p => `
      <div class="quick-phrase-item">
        <div class="q-en" onclick="speakText('${ea(p.en)}','en')" style="cursor:pointer">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(p.en)}
        </div>
        ${p.phonetic_en ? `<div class="q-phonetic-en">${esc(p.phonetic_en)}</div>` : ''}
        <div class="q-th">🇹🇭 ${esc(p.th)}</div>
        <div class="q-zh" onclick="speakText('${ea(p.zh)}','zh')" style="cursor:pointer;margin-top:2px">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(p.zh)}
        </div>
        ${p.phonetic_zh ? `<div class="q-phonetic-zh">${esc(p.phonetic_zh)}</div>` : ''}
      </div>`).join('')}`;
}

/* ── Tabs ─────────────────────────────────────────────────── */
function switchTab(tabId, btnEl) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  else { const b = document.querySelector('[data-tab="' + tabId + '"]'); if (b) b.classList.add('active'); }
  const panel = document.getElementById('panel-' + tabId); if (panel) panel.classList.add('active');
}

/* ── Speech (Android-fixed) ──────────────────────────────── */
function speakText(text, lang) {
  if (!text) return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  
  synth.cancel();

  const doSpeak = () => {
    const utt = new SpeechSynthesisUtterance(text);
    const langMap = { 'th': 'th-TH', 'en': 'en-US', 'zh': 'zh-CN', 'zh-CN': 'zh-CN' };
    const targetLang = langMap[lang] || lang || 'en-US';
    
    const voices = synth.getVoices();
    let voice = voices.find(v => v.lang.replace('_', '-') === targetLang);
    if (!voice) voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    
    if (voice) utt.voice = voice;
    utt.lang = targetLang;
    utt.rate = 0.9;
    utt.pitch = 1.0;
    utt.volume = 1.0;

    if (synth.paused) synth.resume();
    synth.speak(utt);
  };

  if (synth.getVoices().length > 0) {
    doSpeak();
  } else {
    synth.onvoiceschanged = doSpeak;
    setTimeout(doSpeak, 300);
  }
}

/* ── Helpers ─────────────────────────────────────────────── */
function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function ea(s) {
  if (!s) return '';
  return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"');
}

window.addEventListener('DOMContentLoaded', init);
