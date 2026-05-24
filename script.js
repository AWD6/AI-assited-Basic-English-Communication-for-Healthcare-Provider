/* ============================================================
   HEAL English v6 — script.js
   Quiz-mode Role Play + Phrase Card Selector (Updated to 6 Questions & 2 Attempts)
   ============================================================ */

const STORAGE_KEY = 'heal_english_v6';

const defaultScenarios = [
  {
    id: 'greeting', labelEn: 'Greeting', labelTh: 'การทักทาย', icon: '👋',
    phrases: [
      { id:'g1', en:'Hello, welcome to our hospital.', th:'สวัสดีค่ะ ยินดีต้อนรับสู่โรงพยาบาลค่ะ', zh:'您好，欢迎来到我们医院。', phonetic_en:'เฮลโล เวลคัม ทู เอาเออร์ ฮอสพิเทิล', phonetic_zh:'หนี่ว เฮา ฮวน อิ๋ง ไหลต้าว อู่เหมิน อี้ยวน', context:'First contact with patient at entrance or reception', contextTh:'ใช้เมื่อต้อนรับผู้ป่วยที่ทางเข้าหรือเคาน์เตอร์' },
      { id:'g2', en:'How can I help you today?', th:'วันนี้มีอะไรให้ช่วยไหมคะ?', zh:'我今天能帮您什么？', phonetic_en:'เฮา แคน ไอ เฮลป์ ยู ทูเดย์', phonetic_zh:'โว่ จิ่นเทียน เหนิง บ้านหวู่ หนิน เสิน เมอ', context:'Opening a patient encounter', contextTh:'ใช้เปิดการสนทนาเพื่อสอบถามความต้องการ' },
      { id:'g3', en:'Please wait here for a moment.', th:'กรุณารอสักครู่ตรงนี้ค่ะ', zh:'请在这里稍等片刻。', phonetic_en:'พลีส เวท เฮียร์ ฟอร์ อะ โมเมินท์', phonetic_zh:'ชิ่ง ไจ่ จ่างหลี่ เซาเต่ง เพี่ยนเกอะ', context:'Asking patient to wait', contextTh:'ใช้ขอให้ผู้ป่วยรอ' },
      { id:'g4', en:'Good morning! How are you feeling today?', th:'สวัสดีตอนเช้าค่ะ วันนี้รู้สึกเป็นอย่างไรบ้างคะ?', zh:'早上好！今天感觉怎么样？', phonetic_en:'กุด มอร์นิ่ง เฮา อาร์ ยู ฟีลิ่ง ทูเดย์', phonetic_zh:'จ้าวเซิ่งฮ่าว จิ่นเทียน เกินจวี่ เจ่นมะยาง', context:'Morning greeting when visiting a patient', contextTh:'ใช้ทักทายตอนเช้าในหอผู้ป่วย' },
      { id:'g5', en:'Are you here for a check-up?', th:'คุณมาตรวจสุขภาพไหมคะ?', zh:'您是来体检的吗？', phonetic_en:'อาร์ ยู เฮียร์ ฟอร์ อะ เช็คอัพ', phonetic_zh:'หนิน ซือ่ ไหลตี่เจียน ตี ม่า', context:'Confirming purpose of visit', contextTh:'ใช้ยืนยันวัตถุประสงค์การมาโรงพยาบาล' },
      { id:'g6', en:'Sorry for the delay.', th:'ขอโทษที่ต้องรอนานนะคะ', zh:'抱歉让您久等了。', phonetic_en:'ซอร์รี่ ฟอร์ เดอะ ดีเลย์', phonetic_zh:'เปา เฉียน ร้าง หนิน จิ่วเต่ง ลิ่ว', context:'Apologizing for wait time', contextTh:'ใช้ขอโทษที่ต้องรอนาน' },
      { id:'g7', en:'Please follow me.', th:'กรุณาตามมาด้วยค่ะ', zh:'请跟我来。', phonetic_en:'พลีส ฟอลโล มี', phonetic_zh:'ชิ่ง เกิน โว่ ไหล', context:'Leading patient to a room', contextTh:'ใช้นำผู้ป่วยไปยังห้องตรวจ' },
      { id:'g8', en:'Have you checked your blood pressure, weight and height?', th:'คุณวัดความดันโลหิต ชั่งน้ำหนัก วัดส่วนสูงหรือยังคะ?', zh:'您量过血压、体重和身高了吗？', phonetic_en:'แฮฟ ยู เช็กต์ ยอร์ บลัด เพรชเชอร์ เวท แอนด์ เฮท', phonetic_zh:'หนิน เลียง กว่อ เซี่ยวเอีย ตี้จ้ง เหอ เซินเกาลิ่ว ม่า', context:'Confirming vital sign pre-checks', contextTh:'ใช้ยืนยันการตรวจสัญญาณชีพ' }
    ]
  },
  {
    id: 'registration', labelEn: 'Registration', labelTh: 'การลงทะเบียน', icon: '📋',
    phrases: [
      { id:'r1', en:'May I have your full name, please?', th:'ขอทราบชื่อ-นามสกุลด้วยค่ะ', zh:'请问您的全名是什么？', phonetic_en:'เมย์ ไอ แฮฟ ยอร์ ฟูล เนม พลีส', phonetic_zh:'ชิ่งเวิ่น หนิน ตี่ ชวน่อ ชื่อ เสิน เมอ', context:'Collecting patient identity at registration', contextTh:'ใช้เก็บข้อมูลตัวตนผู้ป่วย' },
      { id:'r2', en:'Do you have an appointment today?', th:'ได้นัดไว้หรือเปล่าคะ?', zh:'您今天有预约吗？', phonetic_en:'ดู ยู แฮฟ แอน อะพอยต์เมินท์ ทูเดย์', phonetic_zh:'หนิน จิ่นเทียน หยวว ยู่เยว่ ม่า', context:'Checking prior appointment', contextTh:'ใช้ตรวจสอบว่ามีนัดล่วงหน้าหรือไม่' },
      { id:'r3', en:'Please fill in this form.', th:'กรุณากรอกแบบฟอร์มนี้ด้วยค่ะ', zh:'请填写这张表格。', phonetic_en:'พลีส ฟิล อิน ดิส ฟอร์ม', phonetic_zh:'ชิ่ง เที่ยนเสียะ จ่างจ้าง เปี่ยวเก่อ', context:'Handing patient registration form', contextTh:'ใช้ขณะมอบแบบฟอร์มลงทะเบียน' },
      { id:'r4', en:'Can I see your passport or ID card?', th:'ขอดูหนังสือเดินทางหรือบัตรประชาชนได้ไหมคะ?', zh:'我可以看一下您的护照或身份证吗？', phonetic_en:'แคน ไอ ซี ยอร์ พาสปอร์ท ออร์ ไอดี การ์ด', phonetic_zh:'โว่ เกอะ อี่ เซี่ยะ หนิน ตี่ ฮู่จ้าว หวือ เซิ่นฝีจ่าง ม่า', context:'Verifying identity of foreign patients', contextTh:'ใช้ยืนยันตัวตนผู้ป่วยต่างชาติ' },
      { id:'r5', en:'Please take a seat.', th:'กรุณานั่งรอได้เลยค่ะ', zh:'请坐下等待。', phonetic_en:'พลีส เทค อะ ซีท', phonetic_zh:'ชิ่ง จ้วว เซียเต่งไต่', context:'Asking patient to sit and wait', contextTh:'ใช้ขอให้ผู้ป่วยนั่งรอ' },
      { id:'r6', en:'The nurse will call you soon.', th:'พยาบาลจะเรียกคุณในอีกไม่นานค่ะ', zh:'护士很快就会叫您了。', phonetic_en:'เดอะ เนิร์ส วิล คอล ยู ซูน', phonetic_zh:'ฮู่ซือ่ เหิน ไขว่ จิ่ว ฮวี่ เจี้ยว หนิน ลิ่ว', context:'Reassuring patient their turn is coming', contextTh:'ใช้ให้ผู้ป่วยมั่นใจว่าจะได้รับการเรียก' },
      { id:'r7', en:'The screen will show your queue number.', th:'หน้าจอจะแสดงหมายเลขคิวของคุณค่ะ', zh:'屏幕上会显示您的排队号码。', phonetic_en:'เดอะ สกรีน วิล โชว์ ยอร์ คิว นัมเบอร์', phonetic_zh:'ผิงหมู่ชาง ฮวี่ เซี่ยนซือ่ หนิน ตี่ ไผ่ตุ้ย เฮ่าม่า', context:'Directing patient to watch the queue screen', contextTh:'ใช้บอกให้ผู้ป่วยดูหน้าจอแสดงคิว' },
      { id:'r8', en:'The doctor will see you shortly.', th:'คุณหมอจะพบคุณในอีกสักครู่ค่ะ', zh:'医生很快就会见您。', phonetic_en:'เดอะ ด็อกเตอร์ วิล ซี ยู ชอร์ทลี', phonetic_zh:'อี้เซิง เหิน ไขว่ จิ่ว ฮวี่ เจียน หนิน', context:'Informing patient doctor will be with them soon', contextTh:'ใช้แจ้งว่าแพทย์จะพบในไม่ช้า' },
      { id:'r9', en:'Could you repeat that, please?', th:'ช่วยพูดซ้ำอีกครั้งได้ไหมคะ?', zh:'请您再说一遍好吗？', phonetic_en:'คุด ยู รีพีท แดท พลีส', phonetic_zh:'ชิ่ง หนิน ไจ่ ซัว อี้เปี้ยน เฮ่า ม่า', context:'Asking patient to repeat', contextTh:'ใช้ขอให้ผู้ป่วยพูดซ้ำ' },
      { id:'r10', en:'What is your phone number?', th:'เบอร์โทรศัพท์ของคุณคือเบอร์อะไรคะ?', zh:'您的电话号码是什么？', phonetic_en:'วอท อิซ ยอร์ โฟน นัมเบอร์', phonetic_zh:'หนิน ตี่ เตียนฮวา เฮ่าม่า ซือ่ เสิน เมอ', context:'Collecting contact number', contextTh:'ใช้เก็บเบอร์โทรในระเบียนผู้ป่วย' },
      { id:'r11', en:'When did the symptoms start?', th:'อาการเริ่มต้นเมื่อไหร่คะ?', zh:'症状是什么时候开始的？', phonetic_en:'เวน ดิด เดอะ ซิมทัมส์ สตาร์ท', phonetic_zh:'เจิ้งจวั้ง ซือ่ เสิน เมอ ซือ์โหว ไคชื่อ ตี', context:'Asking onset of symptoms', contextTh:'ใช้สอบถามจุดเริ่มต้นของอาการ' },
      { id:'r12', en:'Where does it hurt?', th:'เจ็บที่ไหนคะ?', zh:'哪里疼？', phonetic_en:'แวร์ ดัซ อิท เฮิร์ท', phonetic_zh:'หน่า หลี่ เทิ่ง', context:'Locating area of pain', contextTh:'ใช้ระบุตำแหน่งที่เจ็บปวด' },
      { id:'r13', en:'How severe is the pain? On a scale of 1 to 10.', th:'ปวดมากแค่ไหนคะ? จากคะแนน 1 ถึง 10', zh:'疼痛有多严重？从1到10分。', phonetic_en:'เฮา ซีเวียร์ อิซ เดอะ เปน ออน อะ สเกล ออฟ วัน ทู เทน', phonetic_zh:'เทิ่งถ่ง หยว มัว หยัน จ้ง จง อี้ ต้าว ซือ่ เฝิน', context:'Assessing pain intensity', contextTh:'ใช้วัดระดับความเจ็บปวด' },
      { id:'r14', en:'Do you have a fever?', th:'คุณมีไข้ไหมคะ?', zh:'您发烧了吗？', phonetic_en:'ดู ยู แฮฟ อะ ฟีเวอร์', phonetic_zh:'หนิน ฝาเซา ลิ่ว ม่า', context:'Checking for fever', contextTh:'ใช้ตรวจสอบอาการมีไข้' },
      { id:'r15', en:'Are you currently taking any medication?', th:'ตอนนี้คุณกำลังทานยาอะไรอยู่ไหมคะ?', zh:'您目前在服用任何药物吗？', phonetic_en:'อาร์ ยู เคอร์เรินท์ลี เทคคิ่ง เอนี เมดิเคชัน', phonetic_zh:'หนิน มู้เฉียน ไจ่ ฝู้หยง เหรินเฮา เอี่ยวอู้ ม่า', context:'Checking current medications', contextTh:'ใช้ตรวจสอบยาที่ผู้ป่วยทานอยู่' },
      { id:'r16', en:'Do you have any chronic diseases?', th:'คุณมีโรคประจำตัวไหมคะ?', zh:'您有任何慢性病吗？', phonetic_en:'ดู ยู แฮฟ เอนี โครนิก ดิซีซิส', phonetic_zh:'หนิน หยวว เหรินเฮา หม่าน ซิ่ง ปิ้ง ม่า', context:'Screening for chronic conditions', contextTh:'ใช้คัดกรองโรคประจำตัว' },
      { id:'r19', en:'Please sign here.', th:'กรุณาเซ็นชื่อตรงนี้ด้วยค่ะ', zh:'请在这里签名。', phonetic_en:'พลีส ไซน์ เฮียร์', phonetic_zh:'ชิ่ง ไจ่ จ่างหลี่ เชียนหมิง', context:'Requesting patient signature', contextTh:'ใช้ขอลายเซ็นผู้ป่วย' },
      { id:'r20', en:'We need to check your vital signs first.', th:'เราต้องตรวจสัญญาณชีพก่อนนะคะ', zh:'我们需要先检查您的生命体征。', phonetic_en:'วี นีด ทู เช็ก ยอร์ ไวทัล ไซน์ส เฟิร์สท์', phonetic_zh:'โว่ เหมิน ซือ่ เยี่ยว เซียน เจียนฉา หนิน ตี่ เซิงมิ่ง ตี้เจิง', context:'Informing about vital sign check', contextTh:'ใช้แจ้งว่าต้องตรวจสัญญาณชีพก่อน' }
    ]
  },
  {
    id: 'direction', labelEn: 'Direction', labelTh: 'การบอกทาง', icon: '🗺️',
    phrases: [
      { id:'d1', en:'Please register at the Medical Records Room, Number 19, 1st floor, Chalerm Phra Baramee Building.', th:'ลงทะเบียนที่ห้องเวชระเบียน หมายเลข 19 ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'请在 Chalerm Phra Baramee 大楼一楼19号病历室登记。', phonetic_en:'พลีส เรจิสเตอร์ แอท เดอะ เมดิเคิล เรคคอร์ดส รูม', phonetic_zh:'ชิ่ง ไจ่ Chalerm Phra Baramee ต้าโหลว', context:'Directing to registration', contextTh:'บอกทางไปลงทะเบียน' },
      { id:'d2', en:'Please contact customer service centre, 1st floor, Chalerm Phra Baramee Building.', th:'กรุณาติดต่อ customer service centre ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'请联系 Chalerm Phra Baramee 大楼一楼的客户服务中心。', phonetic_en:'พลีส คอนแทค คัสตอมเมอร์ เซอร์วิส เซนเทอร์', phonetic_zh:'ชิ่ง เหลียนซี่ เค้าฮู้ ฝูอู้ จงซิน', context:'Directing to customer service', contextTh:'บอกทางไปศูนย์บริการลูกค้า' },
      { id:'d3', en:'The laboratory room number 11 is on the first floor of Chalerm Phra Baramee Building.', th:'ห้องปฏิบัติการหมายเลข 11 อยู่ที่ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'11号化验室在 Chalerm Phra Baramee 大楼一楼。', phonetic_en:'เดอะ แล็บโบระทอรี รูม นัมเบอร์ อิเลฟเวิน', phonetic_zh:'ซือ่อีเฮ่า ฮวาเยี่ยนซือ่ ไจ่ Chalerm Phra Baramee ต้าโหลว', context:'Directing to lab', contextTh:'บอกทางไปห้องแล็บ' },
      { id:'d4', en:'X-ray is at room number 33 on the first floor of Boonsom Martin Building.', th:'เอกซ์เรย์ที่ห้องหมายเลข 33 ชั้น 1 อาคารบุญสม มาร์ตินค่ะ', zh:'X光室在 Boonsom Martin 大楼一楼33号房。', phonetic_en:'เอกซ์เรย์ อิซ แอท รูม นัมเบอร์ เทอร์ตี้ ทรี', phonetic_zh:'เอกซ์กวาง ไจ่ Boonsom Martin ต้าโหลว', context:'Directing to X-ray', contextTh:'บอกทางไปห้องเอกซ์เรย์' },
      { id:'d5', en:'The pharmacy number 30 is on the first floor of Chalerm Phra Baramee Building.', th:'ห้องยาหมายเลข 30 อยู่ที่ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'30号药房在 Chalerm Phra Baramee 大楼一楼。', phonetic_en:'เดอะ ฟาร์มาซี นัมเบอร์ เทอร์ตี้', phonetic_zh:'ซานซือ่เฮ่า เอี่ยวฝาง ไจ่ Chalerm Phra Baramee ต้าโหลว', context:'Directing to pharmacy', contextTh:'บอกทางไปห้องยา' },
      { id:'d6', en:'Please follow the signs.', th:'กรุณาเดินตามป้ายบอกทางค่ะ', zh:'请随指示牌走。', phonetic_en:'พลีส ฟอลโล เดอะ ไซน์ส', phonetic_zh:'ชิ่ง สุย จื่อซือ่ไผ่ โจ่ว', context:'General direction', contextTh:'บอกให้เดินตามป้าย' }
    ]
  },
  {
    id: 'care', labelEn: 'During Care', labelTh: 'ระหว่างดูแล', icon: '🩺',
    phrases: [
      { id:'c1', en:'Please lie down.', th:'กรุณานอนลงด้วยค่ะ', zh:'请躺下。', phonetic_en:'พลีส ไลย์ ดาวน์', phonetic_zh:'ชิ่ง ถ่าง เซีย', context:'Asking patient to lie down', contextTh:'ขอให้ผู้ป่วยนอนลง' },
      { id:'c2', en:'Please sit still.', th:'กรุณานั่งนิ่งๆ ด้วยค่ะ', zh:'请坐好，不要动。', phonetic_en:'พลีส ซิท สทิล', phonetic_zh:'ชิ่ง จ้วว เฮ่า ปู้เยี่ยว ต้ง', context:'Asking patient to sit still', contextTh:'ขอให้ผู้ป่วยนั่งนิ่งๆ' },
      { id:'c3', en:'Please roll up your sleeve.', th:'กรุณาพับแขนเสื้อขึ้นด้วยค่ะ', zh:'请卷起袖子。', phonetic_en:'พลีส โรล อัพ ยอร์ สลีฟ', phonetic_zh:'ชิ่ง จวน ชี่ ซิ่วจือ', context:'Before blood pressure or injection', contextTh:'ขอให้พับแขนเสื้อ' },
      { id:'c4', en:'Please take a deep breath.', th:'กรุณาหายใจลึกๆ ค่ะ', zh:'请深呼吸。', phonetic_en:'พลีส เทค อะ ดีพ เบรธ', phonetic_zh:'ชิ่ง เซิน ฮูซี', context:'During lung exam', contextTh:'ขอให้หายใจลึกๆ' },
      { id:'c5', en:'Please do not move.', th:'กรุณาอย่าขยับนะคะ', zh:'请不要动。', phonetic_en:'พลีส ดู นอท มูฟ', phonetic_zh:'ชิ่ง ปู้เยี่ยว ต้ง', context:'During procedure', contextTh:'ขอให้ไม่ขยับ' },
      { id:'c6', en:'I am going to check your blood pressure.', th:'ฉันกำลังจะวัดความดันโลหิตของคุณค่ะ', zh:'我要为您量血压。', phonetic_en:'ไอ แอม โกอิ้ง ทู เช็ก ยอร์ บลัด เพรชเชอร์', phonetic_zh:'โว่ เยี่ยว เวย หนิน เลียง เซี่ยวเอีย', context:'Before BP check', contextTh:'บอกว่าจะวัดความดัน' },
      { id:'c7', en:'This may feel a little uncomfortable.', th:'อาจจะรู้สึกไม่สบายนิดหน่อยนะคะ', zh:'这可能会有点不舒服。', phonetic_en:'ดิส เมย์ ฟีล อะ ลิทเทิล อันคัมฟอร์ทาเบิล', phonetic_zh:'จ่า เกอะ เหนิง ฮวี่ หยว เตี่ยน ปู้ ซูฝู', context:'Warning before procedure', contextTh:'บอกว่าอาจไม่สบายตัวนิดหน่อย' },
      { id:'c8', en:'Tell me if you feel dizzy.', th:'ถ้าคุณรู้สึกเวียนหัว บอกฉันได้เลยนะคะ', zh:'如果您感到头晕，请告诉我。', phonetic_en:'เทล มี อิฟ ยู ฟีล ดิซซี่', phonetic_zh:'รู๋กว่อ หนิน เกินต้าว โถวหยุน ชิ่ง เกาซู่ โว่', context:'Checking for dizziness', contextTh:'บอกให้แจ้งถ้าเวียนหัว' },
      { id:'c9', en:'Please wait for the test results.', th:'กรุณารอผลการตรวจสักครู่นะคะ', zh:'请等待检查结果。', phonetic_en:'พลีส เวท ฟอร์ เดอะ เทสท์ รีซัลทส์', phonetic_zh:'ชิ่ง เต่งไต่ เจียนฉา เจี๋ยกว่อ', context:'Waiting for results', contextTh:'ขอให้รอผลตรวจ' },
      { id:'c10', en:'If you feel worse, please return immediately.', th:'หากคุณรู้สึกแย่ลง กรุณากลับมาพบแพทย์ทันทีนะคะ', zh:'如果您感觉情况恶化，请立即回来。', phonetic_en:'อิฟ ยู ฟีล เวิร์ส พลีส รีเทิร์น อิมมีเดียทลี', phonetic_zh:'รู๋กว่อ หนิน เกินจวี่ ชิ่งกวั้ง เอ้อฮวา ชิ่ง ลี่จี๋ หวยไหล', context:'Follow-up instruction', contextTh:'บอกให้กลับมาถ้าอาการแย่ลง' },
      { id:'c11', en:'Do you have any questions?', th:'คุณมีคำถามอะไรไหมคะ?', zh:'您有什么问题吗？', phonetic_en:'ดู ยู แฮฟ เอนี เควสชันส์', phonetic_zh:'หนิน หยวว เสินเมอ เวิ่นถี ม่า', context:'Closing encounter', contextTh:'ถามว่ามีคำถามไหม' }
    ]
  }
];

/* ── Quiz rounds per scenario (6 questions each) ──────────────
   Each round: aiMsg, options[]{text, correct, hint}
   One option has correct:true, rest have correct:false + hint
──────────────────────────────────────────────────────────── */
const quizRounds = {
  greeting: [
    {
      aiMsg: { en: "Hello! Excuse me, I just arrived and I don't feel well at all. Can someone help me please?", th: "สวัสดีค่ะ ขอโทษนะคะ เพิ่งมาถึงและรู้สึกไม่สบายมากเลย มีใครช่วยได้ไหมคะ?" },
      options: [
        { text: "Hello, welcome to our hospital! How can I help you today?", correct: true },
        { text: "Please lie down on the examination bed.", correct: false, hint: "ผู้ป่วยเพิ่งเดินมาถึง ยังไม่ถึงเวลาตรวจ ควรทักทายและถามความต้องการก่อนเสมอ" },
        { text: "The pharmacy is on the 1st floor.", correct: false, hint: "ยังไม่รู้ว่าผู้ป่วยต้องการอะไร ควรต้อนรับและถามก่อน ไม่ใช่บอกทางเลย" },
        { text: "Do you have any allergies?", correct: false, hint: "คำถามเรื่องแพ้ยาเหมาะกับขั้นตอนลงทะเบียน ไม่ใช่ตอนแรกพบ" }
      ]
    },
    {
      aiMsg: { en: "Thank you so much! I've been feeling very weak and dizzy since this morning. I think I might have a fever too.", th: "ขอบคุณมากเลยค่ะ รู้สึกอ่อนเพลียและเวียนหัวมาตั้งแต่เช้า คิดว่าอาจมีไข้ด้วยค่ะ" },
      options: [
        { text: "I'm sorry to hear that. Are you here for a check-up? Please follow me to register.", correct: true },
        { text: "Please take a deep breath.", correct: false, hint: "ยังไม่ถึงขั้นตอนตรวจร่างกาย ควรนำผู้ป่วยไปลงทะเบียนก่อน" },
        { text: "What is your phone number?", correct: false, hint: "การเก็บข้อมูลติดต่อเป็นขั้นตอนลงทะเบียน ตอนนี้ควรถามถึงอาการและแนะนำขั้นตอนต่อไป" },
        { text: "Please wait for the test results.", correct: false, hint: "ยังไม่มีการตรวจใดๆ เกิดขึ้น ควรนำผู้ป่วยไปลงทะเบียนก่อน" }
      ]
    },
    {
      aiMsg: { en: "Yes, I think I need to see a doctor. Can I register now? I'm not sure what to do.", th: "ใช่ค่ะ คิดว่าต้องพบแพทย์ค่ะ ขอลงทะเบียนได้เลยไหมคะ ไม่แน่ใจว่าต้องทำอะไร" },
      options: [
        { text: "Of course! Please wait here for a moment. I'll help you with registration right away.", correct: true },
        { text: "Take this medicine twice a day after meals.", correct: false, hint: "ยังไม่ได้รับการตรวจหรือวินิจฉัย ไม่ควรสั่งยาก่อนพบแพทย์" },
        { text: "Please roll up your sleeve.", correct: false, hint: "ยังไม่ถึงขั้นตอนตรวจร่างกาย ควรช่วยผู้ป่วยลงทะเบียนก่อน" },
        { text: "Good morning! How are you feeling today?", correct: false, hint: "ทักทายแล้วในตอนต้น ตอนนี้ควรดำเนินการขั้นตอนต่อไป คือพาไปลงทะเบียน" }
      ]
    },
    {
      aiMsg: { en: "I received a message from my doctor to come in today.", th: "ฉันได้รับข้อความจากคุณหมอให้เข้ามาวันนี้ค่ะ" },
      options: [
        { text: "Are you here for a check-up?", correct: true },
        { text: "Please wait for the test results.", correct: false, hint: "ยังไม่ได้รับการตรวจเลย ควรถามวัตถุประสงค์ของการมาก่อน" },
        { text: "Sorry for the delay.", correct: false, hint: "ผู้ป่วยเพิ่งมาถึง ยังไม่ได้รอนาน" },
        { text: "Please follow me.", correct: false, hint: "ควรยืนยันวัตถุประสงค์หรือนัดหมายก่อนพานำทางไป" }
      ]
    },
    {
      aiMsg: { en: "Yes, just a regular check-up.", th: "ใช่ค่ะ มาตรวจสุขภาพทั่วไปค่ะ" },
      options: [
        { text: "Have you checked your blood pressure, weight and height?", correct: true },
        { text: "Please roll up your sleeve.", correct: false, hint: "ควรถามถึงขั้นตอนพื้นฐาน(ชั่งน้ำหนัก วัดความดัน) ก่อนที่จะเริ่มตรวจ" },
        { text: "Good morning! How are you feeling today?", correct: false, hint: "ทักทายไปแล้ว ควรดำเนินการตามขั้นตอนตรวจสุขภาพ" },
        { text: "Are you currently taking any medication?", correct: false, hint: "การซักประวัติยาจะอยู่ในขั้นตอนลงทะเบียนหลัก ตอนนี้ควรให้คัดกรองเบื้องต้นก่อน" }
      ]
    },
    {
      aiMsg: { en: "I have done that at the front station already. What should I do next?", th: "ทำมาจากจุดด้านหน้าเรียบร้อยแล้วค่ะ ต้องทำอะไรต่อคะ?" },
      options: [
        { text: "Please wait here for a moment. The nurse will call you soon.", correct: true },
        { text: "How severe is the pain?", correct: false, hint: "ผู้ป่วยมาตรวจสุขภาพทั่วไป ไม่ได้แจ้งว่ามีอาการปวด" },
        { text: "Tell me if you feel dizzy.", correct: false, hint: "ไม่ได้ทำหัตถการใดๆ จึงไม่ต้องเตือนเรื่องเวียนหัว" },
        { text: "Hello, welcome to our hospital.", correct: false, hint: "อยู่ในขั้นตอนรอตรวจแล้ว ไม่ต้องกล่าวต้อนรับซ้ำ" }
      ]
    }
  ],

  registration: [
    {
      aiMsg: { en: "Hello, I need to register. I've been having chest tightness and difficulty breathing since this afternoon.", th: "สวัสดีครับ ผมต้องการลงทะเบียนครับ มีอาการแน่นหน้าอกและหายใจลำบากมาตั้งแต่บ่ายๆ ครับ" },
      options: [
        { text: "May I have your full name, please?", correct: true },
        { text: "Please lie down on the bed.", correct: false, hint: "ขั้นตอนแรกของการลงทะเบียนคือการเก็บข้อมูลส่วนตัวผู้ป่วยก่อน" },
        { text: "The pharmacy is on the 1st floor.", correct: false, hint: "ผู้ป่วยยังไม่ได้รับการตรวจและได้รับยา ควรเริ่มกระบวนการลงทะเบียนก่อน" },
        { text: "Please follow me to the X-ray room.", correct: false, hint: "ยังไม่ได้ลงทะเบียน ควรเก็บข้อมูลผู้ป่วยก่อนส่งไปตรวจใดๆ" }
      ]
    },
    {
      aiMsg: { en: "My name is James Wilson. W-I-L-S-O-N. I don't have an appointment today, I came in suddenly.", th: "ผมชื่อ เจมส์ วิลสัน ครับ W-I-L-S-O-N ครับ ไม่มีนัดล่วงหน้าครับ มาเองเพราะอยู่ๆ ก็รู้สึกไม่สบาย" },
      options: [
        { text: "Can I see your passport or ID card, please?", correct: true },
        { text: "Please take a deep breath in and hold.", correct: false, hint: "ยังอยู่ในขั้นตอนเก็บข้อมูล ยังไม่ถึงเวลาตรวจร่างกาย" },
        { text: "Please follow the signs to the laboratory.", correct: false, hint: "ยังไม่ได้ยืนยันตัวตนผู้ป่วย ควรขอเอกสารยืนยันตัวตนก่อน" },
        { text: "Please sit still.", correct: false, hint: "ยังอยู่ในขั้นตอนเก็บข้อมูล ควรขอหนังสือเดินทางหรือบัตรประจำตัวก่อน" }
      ]
    },
    {
      aiMsg: { en: "Here is my passport. Number AB123456. I'm also on blood pressure medication called Lisinopril, 10mg daily.", th: "นี่คือหนังสือเดินทางครับ หมายเลข AB123456 ครับ แล้วก็ทานยาความดัน Lisinopril 10mg ต่อวันด้วยครับ" },
      options: [
        { text: "Thank you. Do you have any allergies to medication?", correct: true },
        { text: "Please do not move during the scan.", correct: false, hint: "ยังไม่ถึงขั้นตอนสแกน ควรสอบถามประวัติการแพ้ยาให้ครบก่อน" },
        { text: "Please go straight ahead and turn left.", correct: false, hint: "ยังอยู่ที่เคาน์เตอร์ลงทะเบียน ควรสอบถามประวัติการแพ้ยาให้ครบก่อน" },
        { text: "Good morning! Welcome to our hospital.", correct: false, hint: "ทักทายแล้วในตอนต้น ตอนนี้ควรสอบถามประวัติการแพ้ยาเพื่อความปลอดภัย" }
      ]
    },
    {
      aiMsg: { en: "No allergies. But I have been feeling very hot since last night.", th: "ไม่แพ้ยาครับ แต่รู้สึกตัวร้อนมากตั้งแต่เมื่อคืน" },
      options: [
        { text: "Do you have a fever?", correct: true },
        { text: "Please sign here.", correct: false, hint: "ผู้ป่วยกำลังบอกอาการ ควรซักถามอาการต่อ ไม่ใช่ตัดบทให้เซ็นชื่อ" },
        { text: "What is your phone number?", correct: false, hint: "ตอนนี้ควรโฟกัสที่อาการที่ผู้ป่วยเพิ่งแจ้งมาก่อน" },
        { text: "Please sit still.", correct: false, hint: "กำลังซักประวัติ ไม่ได้ทำหัตถการ" }
      ]
    },
    {
      aiMsg: { en: "Yes, I measured it at home and it was 38.5 degrees. It also hurts when I swallow.", th: "ใช่ครับ วัดที่บ้านได้ 38.5 องศา แล้วก็เจ็บเวลาคอเวลากลืนด้วยครับ" },
      options: [
        { text: "How severe is the pain? On a scale of 1 to 10.", correct: true },
        { text: "Where does it hurt?", correct: false, hint: "ผู้ป่วยบอกตำแหน่งแล้ว (เจ็บคอ) ควรถามระดับความปวด" },
        { text: "The screen will show your queue number.", correct: false, hint: "ยังซักประวัติไม่เสร็จ" },
        { text: "Could you repeat that, please?", correct: false, hint: "ประโยคนี้ใช้เมื่อฟังไม่ทัน แต่ผู้ป่วยแจ้งอาการชัดเจนแล้ว" }
      ]
    },
    {
      aiMsg: { en: "About a 6, I think. That's all my symptoms.", th: "ประมาณระดับ 6 ครับ อาการมีเท่านี้ครับ" },
      options: [
        { text: "Please take a seat. The nurse will call you soon.", correct: true },
        { text: "Please fill in this form.", correct: false, hint: "ซักประวัติเสร็จแล้ว ไม่ต้องกรอกแบบฟอร์มอีก" },
        { text: "When did the symptoms start?", correct: false, hint: "ผู้ป่วยบอกไปแล้วในตอนต้น (ตั้งแต่บ่ายๆ / เมื่อคืน)" },
        { text: "We need to check your vital signs first.", correct: false, hint: "ขั้นตอนต่อไปคือการรอเรียกคิวตรวจ" }
      ]
    }
  ],

  direction: [
    {
      aiMsg: { en: "Excuse me! I'm completely lost. I need to register first. Where should I go?", th: "ขอโทษนะคะ! หลงทางเลยค่ะ ต้องการลงทะเบียนก่อนค่ะ ต้องไปที่ไหนคะ?" },
      options: [
        { text: "Please register at the Medical Records Room, number 19, 1st floor, Chalerm Phra Baramee Building.", correct: true },
        { text: "Please lie down on the examination bed.", correct: false, hint: "ผู้ป่วยถามทางไปลงทะเบียน ไม่ใช่ขั้นตอนตรวจร่างกาย" },
        { text: "I am going to check your blood pressure now.", correct: false, hint: "ผู้ป่วยแค่ต้องการทราบว่าห้องลงทะเบียนอยู่ที่ไหน ควรบอกทางก่อน" },
        { text: "Do you have an appointment today?", correct: false, hint: "ผู้ป่วยถามทางอย่างชัดเจน ควรบอกทางไปลงทะเบียนทันที" }
      ]
    },
    {
      aiMsg: { en: "Room 19 on the first floor! Got it, thank you! After registration the doctor ordered blood tests. Where is the lab?", th: "ห้อง 19 ชั้น 1 ค่ะ เข้าใจแล้วค่ะ ขอบคุณค่ะ! หลังจากลงทะเบียนแล้วคุณหมอสั่งตรวจเลือดด้วย ห้องแล็บอยู่ที่ไหนคะ?" },
      options: [
        { text: "The laboratory, room number 11, is on the first floor of Chalerm Phra Baramee Building.", correct: true },
        { text: "Please fill in this form first.", correct: false, hint: "ผู้ป่วยลงทะเบียนแล้ว กำลังถามทางไปแล็บ ควรบอกตำแหน่งห้องแล็บ" },
        { text: "Please do not move.", correct: false, hint: "ผู้ป่วยถามทาง ไม่ใช่กำลังทำหัตถการ ควรบอกตำแหน่งห้องแล็บ" },
        { text: "Sorry for the delay.", correct: false, hint: "ไม่มีการรอนาน ผู้ป่วยถามทางไปแล็บ ควรบอกตำแหน่งห้องแล็บทันที" }
      ]
    },
    {
      aiMsg: { en: "Room 11! Perfect! After the blood test, I need to pick up medicine. Where is the pharmacy?", th: "ห้อง 11 ค่ะ! เยี่ยมเลยค่ะ! หลังเจาะเลือดแล้ว ต้องไปรับยาด้วยค่ะ ห้องยาอยู่ที่ไหนคะ?" },
      options: [
        { text: "The pharmacy, number 30, is on the 1st floor. Please follow the signs.", correct: true },
        { text: "Please wait for the test results first.", correct: false, hint: "ผู้ป่วยถามทางไปห้องยา ซึ่งเป็นขั้นตอนถัดไปที่ถูกต้อง ควรบอกตำแหน่ง" },
        { text: "Please sit still.", correct: false, hint: "ผู้ป่วยถามทางอย่างชัดเจน ควรบอกตำแหน่งห้องยาและแนะนำให้เดินตามป้าย" },
        { text: "Good morning! How are you feeling today?", correct: false, hint: "ทักทายไปแล้ว ตอนนี้ควรบอกทางไปห้องยาตามที่ผู้ป่วยถาม" }
      ]
    },
    {
      aiMsg: { en: "Oh, I also need to ask about my insurance coverage and pay some fees.", th: "อ้อ ฉันต้องสอบถามเรื่องประกันและจ่ายค่าธรรมเนียมด้วยค่ะ" },
      options: [
        { text: "Please contact customer service centre, 1st floor, Chalerm Phra Baramee Building.", correct: true },
        { text: "X-ray is at room number 33.", correct: false, hint: "ผู้ป่วยถามหาจุดบริการลูกค้า/การเงิน ไม่ใช่ห้องเอกซ์เรย์" },
        { text: "Please follow me.", correct: false, hint: "ในสถานการณ์นี้ควรบอกทางให้ผู้ป่วยเดินไปเองตามป้ายบอกทาง" },
        { text: "Do you have an appointment today?", correct: false, hint: "ผู้ป่วยตรวจเสร็จแล้ว แค่ต้องการติดต่อธุระเรื่องเงิน/ประกัน" }
      ]
    },
    {
      aiMsg: { en: "Thank you. And my doctor said I need a chest X-ray too. Is it in this building?", th: "ขอบคุณค่ะ แล้วคุณหมอบอกว่าต้องเอกซ์เรย์ปอดด้วย อยู่ในตึกนี้ไหมคะ?" },
      options: [
        { text: "X-ray is at room number 33 on the first floor of Boonsom Martin Building.", correct: true },
        { text: "The pharmacy number 30 is on the first floor.", correct: false, hint: "ผู้ป่วยถามหาห้องเอกซ์เรย์ ไม่ใช่ห้องยา" },
        { text: "Please lie down.", correct: false, hint: "ยังไม่ได้อยู่ที่ห้องตรวจ" },
        { text: "Please register at the Medical Records Room.", correct: false, hint: "ผู้ป่วยมีประวัติและพบแพทย์แล้ว" }
      ]
    },
    {
      aiMsg: { en: "Boonsom Martin Building... I'm not sure how to get there.", th: "อาคารบุญสม มาร์ติน... ไม่แน่ใจว่าต้องเดินไปทางไหนค่ะ" },
      options: [
        { text: "Please follow the signs.", correct: true },
        { text: "Please sit still.", correct: false, hint: "ผู้ป่วยกำลังจะเดินไปแผนกอื่น" },
        { text: "The laboratory room number 11 is on the first floor.", correct: false, hint: "ไม่ได้ถามหาห้องแล็บ" },
        { text: "Sorry for the delay.", correct: false, hint: "ไม่ได้มีเหตุการณ์ให้รอคอย" }
      ]
    }
  ],

  care: [
    {
      aiMsg: { en: "Hello, I'm a bit nervous. The doctor said I need some tests done. What do I need to do first?", th: "สวัสดีค่ะ หนูกลัวนิดหน่อยค่ะ คุณหมอบอกว่าต้องทำการตรวจบางอย่าง ต้องทำอะไรก่อนคะ?" },
      options: [
        { text: "Please lie down on the bed. I'll check your blood pressure first.", correct: true },
        { text: "Please register at room 19 on the 1st floor.", correct: false, hint: "ผู้ป่วยผ่านการลงทะเบียนแล้วและพร้อมรับการดูแล ควรเริ่มขั้นตอนตรวจสัญญาณชีพ" },
        { text: "The pharmacy is on the 1st floor.", correct: false, hint: "ยังไม่ถึงขั้นตอนรับยา ควรเริ่มการตรวจร่างกายก่อน" },
        { text: "Do you have an appointment today?", correct: false, hint: "ผู้ป่วยลงทะเบียนและพบแพทย์แล้ว ตอนนี้ควรเริ่มขั้นตอนดูแลที่แพทย์สั่ง" }
      ]
    },
    {
      aiMsg: { en: "Okay, I'm lying down. What's next? Should I do anything special?", th: "โอเคค่ะ นอนลงแล้วค่ะ ขั้นตอนต่อไปคืออะไรคะ? ต้องทำอะไรเป็นพิเศษไหมคะ?" },
      options: [
        { text: "Please roll up your sleeve. I am going to check your blood pressure.", correct: true },
        { text: "Please go straight and turn left to the X-ray room.", correct: false, hint: "ผู้ป่วยนอนรอการตรวจอยู่แล้ว ไม่ใช่เวลาส่งไปห้อง X-ray ควรตรวจสัญญาณชีพก่อน" },
        { text: "May I have your full name, please?", correct: false, hint: "ได้เก็บข้อมูลผู้ป่วยแล้วในขั้นตอนลงทะเบียน ตอนนี้ควรดำเนินการตรวจ" },
        { text: "Please fill in this form.", correct: false, hint: "ผ่านขั้นตอนกรอกฟอร์มแล้ว ตอนนี้ผู้ป่วยนอนรอการตรวจ ควรสั่งให้พับแขนเสื้อ" }
      ]
    },
    {
      aiMsg: { en: "I feel a little dizzy after the blood test. And my arm feels a bit sore.", th: "รู้สึกเวียนหัวนิดหน่อยหลังเจาะเลือดค่ะ แล้วแขนก็เจ็บนิดหน่อยด้วยค่ะ" },
      options: [
        { text: "Tell me if you feel more dizzy. Please sit still and wait for a moment.", correct: true },
        { text: "Please follow the signs to the pharmacy on the 1st floor.", correct: false, hint: "ผู้ป่วยกำลังรู้สึกเวียนหัว ควรดูแลอาการก่อนส่งไปรับยา" },
        { text: "Hello, welcome to our hospital!", correct: false, hint: "ทักทายผู้ป่วยแล้ว ตอนนี้ผู้ป่วยมีอาการ ควรดูแลและสังเกตอาการเวียนหัว" },
        { text: "Please fill in this registration form.", correct: false, hint: "ผู้ป่วยลงทะเบียนแล้วและกำลังมีอาการ ควรประเมินและดูแลอาการก่อน" }
      ]
    },
    {
      aiMsg: { en: "Okay, I'm waiting. The doctor is going to examine my chest now, right?", th: "โอเคค่ะ รออยู่ค่ะ คุณหมอกำลังจะตรวจหน้าอกฉันใช่ไหมคะ?" },
      options: [
        { text: "Please take a deep breath.", correct: true },
        { text: "Please roll up your sleeve.", correct: false, hint: "ตรวจหน้าอกและปอด ต้องให้หายใจลึกๆ ไม่ใช่พับแขนเสื้อ" },
        { text: "I am going to check your blood pressure.", correct: false, hint: "วัดความดันไปแล้ว ตอนนี้หมอกำลังจะตรวจหน้าอก" },
        { text: "Tell me if you feel dizzy.", correct: false, hint: "ยังไม่ได้เริ่มตรวจ" }
      ]
    },
    {
      aiMsg: { en: "Like this? *inhales heavily* Is there anything else I need to do during the ultrasound?", th: "แบบนี้ใช่ไหมคะ? *สูดลมหายใจ* มีอะไรที่ต้องทำอีกไหมคะระหว่างอัลตราซาวนด์?" },
      options: [
        { text: "Please do not move.", correct: true },
        { text: "Please sit still.", correct: false, hint: "ผู้ป่วยนอนอยู่แล้ว จึงสั่งให้ห้ามขยับตัว ไม่ใช่ให้นั่งนิ่งๆ" },
        { text: "If you feel worse, please return immediately.", correct: false, hint: "นี่คือคำแนะนำตอนจะกลับบ้าน ไม่ใช่ระหว่างทำหัตถการ" },
        { text: "Do you have any questions?", correct: false, hint: "กำลังทำหัตถการ ไม่ใช่ช่วงท้ายของการตรวจ" }
      ]
    },
    {
      aiMsg: { en: "The examination is done. Thank you. Will I get the results today?", th: "ตรวจเสร็จแล้ว ขอบคุณค่ะ จะได้ผลตรวจวันนี้เลยไหมคะ?" },
      options: [
        { text: "Please wait for the test results. Do you have any questions?", correct: true },
        { text: "Please lie down.", correct: false, hint: "ตรวจเสร็จแล้ว" },
        { text: "This may feel a little uncomfortable.", correct: false, hint: "การตรวจเสร็จสิ้นแล้ว" },
        { text: "I am going to check your blood pressure.", correct: false, hint: "ทำไปตั้งแต่เริ่มแล้ว" }
      ]
    }
  ]
};

/* ── Role Play scenario meta ────────────────────────────────── */
const rolePlayMeta = {
  greeting:     { badge: '👋 การทักทาย · ต้อนรับผู้ป่วย',     hint: 'ฝึกทักทายและรับมือผู้ป่วยที่เพิ่งมาถึง ตอบให้ถูกสถานการณ์ ทักทายก่อน ถามอาการ แล้วนำไปลงทะเบียน' },
  registration: { badge: '📋 การลงทะเบียน · เก็บข้อมูลผู้ป่วย', hint: 'ฝึกถามข้อมูลส่วนตัวตามลำดับ ชื่อ → บัตร/หนังสือเดินทาง → ประวัติแพ้ยา → โรคประจำตัว' },
  direction:    { badge: '🗺️ การบอกทาง · นำผู้ป่วย',            hint: 'ฝึกบอกตำแหน่งห้องต่างๆ ระบุชั้นและหมายเลขห้องให้ชัดเจน บอกทางเป็นลำดับขั้นตอน' },
  care:         { badge: '🩺 ระหว่างดูแล · ให้คำสั่งผู้ป่วย',   hint: 'ฝึกออกคำสั่งตามขั้นตอน นอนลง → พับแขนเสื้อ → หายใจลึก → อย่าขยับ และดูแลอาการขณะตรวจ' }
};

/* ── State ───────────────────────────────────────────────────── */
let scenarios = [];
let activeScenarioId = 'greeting';
let chatScenarioId = 'greeting';
let practiceTarget = { text: '', lang: 'en' };
let selectedPracticeId = null;
let selectedPracticeLang = 'en';
let isRecording = false;
let isAddModalRecording = false;
let recRef = null;
let translateDebounce = null;
let modalAutoTimer = null;
let editingId = null;

let quizRoundIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let currentQuizOpts = [];

/* ── Init ───────────────────────────────────────────────────── */
function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      scenarios = parsed.scenarios || defaultScenarios;
      activeScenarioId = parsed.activeScenarioId || 'greeting';
      chatScenarioId = parsed.chatScenarioId || activeScenarioId;
    } catch (e) { scenarios = defaultScenarios; }
  } else {
    scenarios = JSON.parse(JSON.stringify(defaultScenarios));
  }

  renderScenarios();
  renderPhrases();
  renderPracticeCards();
  renderChatScenarioSelect();
  initQuiz();
  renderQuickPhrases();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ scenarios, activeScenarioId, chatScenarioId }));
}

function currentScenario() {
  return scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
}

/* ── Scenario Grid ──────────────────────────────────────────── */
function renderScenarios() {
  document.getElementById('scenarioGrid').innerHTML = scenarios.map(s => `
    <button class="btn-scenario ${s.id === activeScenarioId ? 'active' : ''}" onclick="selectScenario('${s.id}')">
      ${s.id === activeScenarioId ? '<div class="active-dot"></div>' : ''}
      <span class="s-icon">${s.icon}</span>
      <span class="s-en">${esc(s.labelEn)}</span>
      <span class="s-th">${esc(s.labelTh)}</span>
    </button>`).join('');
}

function selectScenario(id) {
  activeScenarioId = id;
  practiceTarget = { text: '', lang: 'en' };
  selectedPracticeId = null;
  renderScenarios();
  renderPhrases();
  renderPracticeCards();
  renderQuickPhrases();
  save();
}

/* ── Phrases ────────────────────────────────────────────────── */
function renderPhrases() {
  const s = currentScenario();
  document.getElementById('phraseTitle').textContent = s.labelEn + ' Phrases';
  document.getElementById('phraseCount').textContent = `${s.phrases.length} ประโยค · ${s.labelTh}`;
  const list = document.getElementById('phraseList');
  if (!s.phrases.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📝</div>
      <div class="empty-text">ยังไม่มีประโยคในสถานการณ์นี้</div>
      <button class="btn-empty-add" onclick="openAddModal()"><i class="fas fa-plus"></i> เพิ่มประโยคแรก</button>
    </div>`;
    return;
  }
  list.innerHTML = s.phrases.map(p => `
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
          <button class="btn-icon blue" onclick="speakText('${ea(p.en)}','en')"><i class="fas fa-volume-up"></i></button>
          <button class="btn-icon yellow" onclick="speakText('${ea(p.zh)}','zh')">中</button>
          <button class="btn-icon green" onclick="openEditModal('${ea(p.id)}')"><i class="fas fa-pen"></i></button>
          <button class="btn-icon red" onclick="openDeleteModal('${ea(p.id)}')"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      ${(p.context || p.contextTh) ? `
      <button class="phrase-context-toggle" onclick="toggleCtx('${p.id}')">
        <span><i class="fas fa-info-circle"></i> เมื่อไรใช้ประโยคนี้</span>
        <i class="fas fa-chevron-down" id="ctx-icon-${p.id}" style="transition:transform 0.2s"></i>
      </button>
      <div class="phrase-context-body" id="ctx-${p.id}">
        ${p.contextTh ? `<div class="ctx-line">🇹🇭 <strong>ไทย:</strong> ${esc(p.contextTh)}</div>` : ''}
        ${p.context ? `<div class="ctx-line">🇬🇧 <strong>EN:</strong> ${esc(p.context)}</div>` : ''}
      </div>` : ''}
    </div>`).join('');
}

function toggleCtx(id) {
  const body = document.getElementById('ctx-' + id);
  const icon = document.getElementById('ctx-icon-' + id);
  if (!body) return;
  const open = body.classList.toggle('open');
  if (icon) icon.style.transform = open ? 'rotate(180deg)' : '';
}

/* ── Practice — Phrase Card Selector ───────────────────────── */
function renderPracticeCards() {
  const list = document.getElementById('practiceCardList');
  if (!list) return;
  let html = '';
  scenarios.forEach(s => {
    if (!s.phrases.length) return;
    html += `<div class="practice-group-header">${s.icon} ${esc(s.labelEn)} · ${esc(s.labelTh)}</div>`;
    s.phrases.forEach(p => {
      const enSel = selectedPracticeId === p.id && selectedPracticeLang === 'en';
      const zhSel = selectedPracticeId === p.id && selectedPracticeLang === 'zh';
      html += `
        <div class="practice-phrase-item ${enSel ? 'selected' : ''}" data-pid="${esc(p.id)}" data-lang="en">
          <div class="ppi-icon">${enSel ? '<i class="fas fa-check" style="color:#fff"></i>' : '<i class="fas fa-volume-up" style="color:var(--primary)"></i>'}</div>
          <div class="ppi-texts">
            <div class="ppi-en">${esc(p.en)}</div>
            <div class="ppi-th">${esc(p.th)}</div>
          </div>
          <span class="ppi-lang en">EN</span>
        </div>
        <div class="practice-phrase-item ${zhSel ? 'selected' : ''}" data-pid="${esc(p.id)}" data-lang="zh">
          <div class="ppi-icon">${zhSel ? '<i class="fas fa-check" style="color:#fff"></i>' : '<span style="font-size:12px;color:var(--primary)">中</span>'}</div>
          <div class="ppi-texts">
            <div class="ppi-en">${esc(p.zh)}</div>
            <div class="ppi-th">${p.phonetic_zh ? esc(p.phonetic_zh) : esc(p.th)}</div>
          </div>
          <span class="ppi-lang zh">中</span>
        </div>`;
    });
  });
  list.innerHTML = html || '<div style="padding:16px;color:var(--text-hint);font-size:13px;text-align:center">ยังไม่มีประโยค</div>';

  // Attach click via event delegation (avoids inline-onclick escaping issues)
  list.onclick = function(e) {
    const item = e.target.closest('.practice-phrase-item');
    if (!item) return;
    const pid = item.dataset.pid;
    const lang = item.dataset.lang;
    let foundPhrase = null;
    for (const s of scenarios) {
      foundPhrase = s.phrases.find(p => p.id === pid);
      if (foundPhrase) break;
    }
    if (foundPhrase) selectPracticeCard(lang, lang === 'en' ? foundPhrase.en : foundPhrase.zh, pid);
  };
}

function selectPracticeCard(lang, text, id) {
  selectedPracticeId = id;
  selectedPracticeLang = lang;
  practiceTarget = { text, lang };
  renderPracticeCards();

  let foundPhrase = null;
  for (const s of scenarios) {
    const p = s.phrases.find(p => p.id === id);
    if (p) { foundPhrase = p; break; }
  }

  const tb = document.getElementById('targetBox');
  tb.style.display = 'flex';
  document.getElementById('targetText').textContent = text;
  const pe = document.getElementById('targetPhonetic');
  const phoneticKey = lang === 'en' ? 'phonetic_en' : 'phonetic_zh';
  if (foundPhrase && foundPhrase[phoneticKey]) {
    pe.textContent = foundPhrase[phoneticKey]; pe.style.display = 'block';
  } else { pe.style.display = 'none'; }
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('recResult').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = '';

  speakText(text, lang);
}

/* ── Add / Edit Modal ─────────────────────────────────────── */
function openAddModal() {
  editingId = null;
  clearModalFields();
  document.getElementById('modalTitle').textContent = 'เพิ่มประโยคใหม่';
  document.getElementById('modalSub').textContent = 'พิมพ์ภาษาไทย · AI แปลให้อัตโนมัติทันที';
  document.getElementById('btnConfirmAdd').innerHTML = '<i class="fas fa-plus"></i> เพิ่มประโยค';
  document.getElementById('addModal').classList.add('open');
}

function openEditModal(id) {
  const s = currentScenario();
  const phrase = s.phrases.find(p => p.id === id);
  if (!phrase) return;
  editingId = id;
  clearModalFields();
  document.getElementById('modalTitle').textContent = 'แก้ไขประโยค';
  document.getElementById('modalSub').textContent = 'แก้ไขข้อมูลแล้วกดบันทึก';
  document.getElementById('btnConfirmAdd').innerHTML = '<i class="fas fa-save"></i> บันทึก';
  document.getElementById('f-th').value = phrase.th || '';
  document.getElementById('f-en').value = phrase.en || '';
  document.getElementById('f-phonetic-en').value = phrase.phonetic_en || '';
  document.getElementById('f-zh').value = phrase.zh || '';
  document.getElementById('f-phonetic-zh').value = phrase.phonetic_zh || '';
  document.getElementById('f-ctx-th').value = phrase.contextTh || '';
  document.getElementById('f-ctx-en').value = phrase.context || '';
  document.getElementById('addModal').classList.add('open');
}

function clearModalFields() {
  ['f-th','f-en','f-phonetic-en','f-zh','f-phonetic-zh','f-ctx-th','f-ctx-en'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });
  ['err-th','err-en','err-zh'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = '';
  });
  const prev = document.getElementById('autoPreview');
  if (prev) prev.classList.remove('visible');
  if (modalAutoTimer) { clearTimeout(modalAutoTimer); modalAutoTimer = null; }
}

function closeAddModal() {
  document.getElementById('addModal').classList.remove('open');
  if (modalAutoTimer) { clearTimeout(modalAutoTimer); modalAutoTimer = null; }
}

function onModalThaiInput() {
  const th = document.getElementById('f-th').value.trim();
  if (modalAutoTimer) clearTimeout(modalAutoTimer);
  if (!th) { const p = document.getElementById('autoPreview'); if (p) p.classList.remove('visible'); return; }
  const prev = document.getElementById('autoPreview');
  if (prev) {
    prev.classList.add('visible');
    document.getElementById('autoPreviewContent').innerHTML =
      '<div class="auto-preview-loading"><div class="translate-spinner"></div> กำลังแปล...</div>';
  }
  modalAutoTimer = setTimeout(() => doAutoTranslate(th), 700);
}

async function doAutoTranslate(th) {
  try {
    const [en, zh] = await Promise.all([gTranslate(th,'th','en'), gTranslate(th,'th','zh-CN')]);
    const phonEn = genPhonetics(en), ctx = analyzeCtx(th, en);
    const fEn = document.getElementById('f-en'), fZh = document.getElementById('f-zh');
    const fPhEn = document.getElementById('f-phonetic-en');
    const fCtxTh = document.getElementById('f-ctx-th'), fCtxEn = document.getElementById('f-ctx-en');
    
    // เปลี่ยนให้อัปเดตค่าเสมอเพื่อให้มันลิงก์เข้าช่องแบบอัตโนมัติ 100% ทันทีที่ผู้ใช้พิมพ์
    if (fEn) fEn.value = en;
    if (fZh) fZh.value = zh;
    if (fPhEn) fPhEn.value = phonEn;
    if (fCtxTh) fCtxTh.value = ctx.th;
    if (fCtxEn) fCtxEn.value = ctx.en;

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
      <div class="auto-preview-row">
        <div class="auto-preview-label" style="color:var(--primary)">📌 บริบท</div>
        <div class="auto-preview-text" style="font-size:12px;color:var(--primary-dark)">${esc(ctx.th)}</div>
      </div>`;
  } catch (e) {
    document.getElementById('autoPreviewContent').innerHTML =
      '<div style="font-size:12px;color:#ef4444">ไม่สามารถแปลอัตโนมัติได้ กรุณากรอกเอง</div>';
  }
}

async function submitAddPhrase() {
  const th = document.getElementById('f-th').value.trim();
  if (!th) { setErr('err-th','f-th','กรุณากรอกประโยคภาษาไทย'); return; }
  
  const btn = document.getElementById('btnConfirmAdd');
  btn.disabled = true;

  // หากผู้ใช้รีบกดปุ่มบันทึกก่อนที่ระบบแปลอัตโนมัติจะทำงานเสร็จ ให้บังคับแปลทันที
  if (modalAutoTimer) {
    clearTimeout(modalAutoTimer);
    modalAutoTimer = null;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังแปลภาษา...';
    await doAutoTranslate(th);
  }

  let en = document.getElementById('f-en').value.trim();
  let zh = document.getElementById('f-zh').value.trim();
  let phonEn = document.getElementById('f-phonetic-en').value.trim();
  let phonZh = document.getElementById('f-phonetic-zh').value.trim();
  let ctxTh = document.getElementById('f-ctx-th').value.trim();
  let ctxEn = document.getElementById('f-ctx-en').value.trim();
  
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังบันทึก...';
  
  if (!en || !zh) {
    try {
      const [enR, zhR] = await Promise.all([
        en ? Promise.resolve(en) : gTranslate(th,'th','en'),
        zh ? Promise.resolve(zh) : gTranslate(th,'th','zh-CN')
      ]);
      en = enR; zh = zhR;
      if (!phonEn) phonEn = genPhonetics(en);
      if (!ctxTh || !ctxEn) { const c = analyzeCtx(th,en); ctxTh = ctxTh || c.th; ctxEn = ctxEn || c.en; }
    } catch (e) {}
  }
  
  const isEdit = !!editingId;
  btn.innerHTML = isEdit ? '<i class="fas fa-save"></i> บันทึก' : '<i class="fas fa-plus"></i> เพิ่มประโยค';
  btn.disabled = false;
  
  if (!en) { setErr('err-en','f-en','ไม่สามารถแปลได้ กรุณากรอกเอง'); return; }
  if (!zh) { setErr('err-zh','f-zh','ไม่สามารถแปลได้ กรุณากรอกเอง'); return; }
  
  const s = currentScenario();
  if (isEdit) {
    const idx = s.phrases.findIndex(p => p.id === editingId);
    if (idx !== -1) s.phrases[idx] = { ...s.phrases[idx], en, th, zh, phonetic_en:phonEn, phonetic_zh:phonZh, context:ctxEn, contextTh:ctxTh };
  } else {
    s.phrases.push({ id:'c_'+Date.now(), en, th, zh, phonetic_en:phonEn, phonetic_zh:phonZh, context:ctxEn, contextTh:ctxTh });
  }
  save(); closeAddModal(); renderPhrases(); renderPracticeCards(); renderQuickPhrases();
}

function setErr(errId, inputId, msg) {
  const e = document.getElementById(errId); if (e) e.textContent = msg;
  const i = document.getElementById(inputId); if (i) i.classList.add('error');
}

function toggleAddModalMic() {
  const btn = document.getElementById('addModalMicBtn');
  if (isAddModalRecording) { recRef && recRef.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { alert('Browser ไม่รองรับ กรุณาใช้ Chrome'); return; }
  const rec = new SR(); rec.lang = 'th-TH'; recRef = rec;
  rec.onstart = () => { isAddModalRecording = true; btn.classList.add('recording'); btn.innerHTML = '<i class="fas fa-stop"></i>'; };
  rec.onresult = (e) => { document.getElementById('f-th').value = e.results[0][0].transcript; onModalThaiInput(); };
  rec.onend = () => { isAddModalRecording = false; btn.classList.remove('recording'); btn.innerHTML = '<i class="fas fa-microphone"></i>'; };
  rec.start();
}

/* ── Delete Modal ─────────────────────────────────────────── */
let deleteTargetId = null;
function openDeleteModal(id) {
  const s = currentScenario(), phrase = s.phrases.find(p => p.id === id);
  if (!phrase) return;
  deleteTargetId = id;
  document.getElementById('deletePhrasePreview').innerHTML =
    `<strong>${esc(phrase.en)}</strong><br><span style="font-size:12px;color:var(--text-sub)">${esc(phrase.th)}</span>`;
  document.getElementById('deleteModal').classList.add('open');
}
function closeDeleteModal() { document.getElementById('deleteModal').classList.remove('open'); deleteTargetId = null; }
function doDelete() {
  if (!deleteTargetId) return;
  const s = currentScenario();
  s.phrases = s.phrases.filter(p => p.id !== deleteTargetId);
  save(); closeDeleteModal(); renderPhrases(); renderPracticeCards(); renderQuickPhrases();
}

/* ── Google Translate ─────────────────────────────────────── */
async function gTranslate(text, sl, tl) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url); if (!res.ok) throw new Error();
  const data = await res.json(); return data[0].map(i => i[0]).join('');
}

/* ── Phonetics ───────────────────────────────────────────── */
function genPhonetics(en) {
  if (!en) return '';
  const map = {
    'hello':'เฮลโล','welcome':'เวลคัม','to':'ทู','our':'เอาเออร์','hospital':'ฮอสพิเทิล',
    'how':'เฮา','can':'แคน','i':'ไอ','help':'เฮลป์','you':'ยู','today':'ทูเดย์',
    'please':'พลีส','wait':'เวท','here':'เฮียร์','for':'ฟอร์','a':'อะ','moment':'โมเมินท์',
    'good':'กุด','morning':'มอร์นิ่ง','are':'อาร์','feeling':'ฟีลิ่ง',
    'do':'ดู','have':'แฮฟ','any':'เอนี','allergies':'อะเลอร์จีส',
    'take':'เทค','this':'ดิส','medicine':'เมดิซิน','twice':'ทไวส์','day':'เดย์',
    'see':'ซี','your':'ยอร์','passport':'พาสปอร์ท','or':'ออร์','id':'ไอดี','card':'การ์ด',
    'go':'โก','straight':'สเตรท','and':'แอนด์','turn':'เทิร์น','left':'เลฟท์','right':'ไรท์',
    'the':'เดอะ','pharmacy':'ฟาร์มาซี'
  };
  const w = en.toLowerCase().replace(/[^a-z ]/g,'').split(' ');
  return w.map(x => map[x] || '').filter(Boolean).join(' ');
}

// อัปเกรดฟังก์ชันแยกบริบท (AnalyzeCtx) ให้ฉลาดและครอบคลุมศัพท์โรงพยาบาลมากขึ้น
function analyzeCtx(th, en) {
  const t = th.toLowerCase(), e = en.toLowerCase();

  if (t.match(/ทักทาย|สวัสดี|ต้อนรับ|สบายดีไหม/) || e.match(/hello|hi |welcome|good morning|how are you/))
    return { th: 'ใช้ทักทายและต้อนรับผู้ป่วย', en: 'Greeting and welcoming the patient' };

  if (t.match(/ชื่อ|นามสกุล|บัตร|พาสปอร์ต|เกิด|อายุ|เบอร์โทร|ติดต่อ/) || e.match(/name|passport|id card|birth|age|phone|contact/))
    return { th: 'ใช้สอบถามข้อมูลส่วนตัวเพื่อลงทะเบียน', en: 'Asking for personal information at registration' };

  if (t.match(/นัด|ทำนัด|คิว|ใบนัด/) || e.match(/appointment|queue/))
    return { th: 'ใช้สอบถามหรือจัดการเรื่องการนัดหมาย', en: 'Checking or managing appointments' };

  if (t.match(/ความดัน|น้ำหนัก|ส่วนสูง|อุณหภูมิ|ปรอท|ชีพจร|สัญญาณชีพ/) || e.match(/blood pressure|weight|height|temperature|pulse|vital/))
    return { th: 'ใช้แจ้งการตรวจวัดสัญญาณชีพเบื้องต้น', en: 'Informing about vital signs measurement' };

  if (t.match(/อาการ|เจ็บ|ปวด|แพ้ยา|โรคประจำตัว|ไข้|ไอ|เวียนหัว|คลื่นไส้/) || e.match(/symptom|pain|hurt|allergy|chronic|fever|cough|dizzy|nausea/))
    return { th: 'ใช้ซักถามประวัติและอาการเจ็บป่วย', en: 'Assessing symptoms and medical history' };

  if (t.match(/นอน|นั่ง|หายใจ|อ้าปาก|ขยับ|กลืน|พับแขน|ตรวจ/) || e.match(/lie down|sit|breath|breathe|open.*mouth|move|swallow|roll up|examine/))
    return { th: 'ใช้ออกคำสั่งขณะแพทย์/พยาบาลทำการตรวจ', en: 'Giving instructions during physical examination' };

  if (t.match(/รอ|สักครู่|เดี๋ยว/) || e.match(/wait|moment|shortly|soon/))
    return { th: 'ใช้บอกให้ผู้ป่วยนั่งรอรับบริการ', en: 'Asking the patient to wait' };

  if (t.match(/ยา|เภสัช|กินยา|ทานยา/) || e.match(/medicine|medication|pill|pharmacy/))
    return { th: 'ใช้แนะนำหรือสอบถามเกี่ยวกับการใช้ยา', en: 'Medication instructions or inquiries' };

  if (t.match(/จ่ายเงิน|การเงิน|ประกัน|ใบเสร็จ|ค่ารักษา/) || e.match(/pay|cashier|insurance|receipt|bill/))
    return { th: 'ใช้สื่อสารเรื่องค่าใช้จ่ายและประกัน', en: 'Communicating about payment and insurance' };

  if (t.match(/ทาง|ชั้น|ตึก|ห้อง|เลี้ยว|ตรงไป|ป้าย/) || e.match(/direction|floor|building|room|turn|straight|sign/))
    return { th: 'ใช้บอกทิศทางไปยังแผนกต่างๆ', en: 'Giving directions to other departments' };

  if (t.match(/ขอโทษ|เสียใจ|ไม่เป็นไร/) || e.match(/sorry|apologize|worry/))
    return { th: 'ใช้แสดงความเห็นใจหรือขออภัย', en: 'Showing empathy or apologizing' };

  if (t.match(/เข้าใจ|คำถาม|เรียบร้อย|เสร็จ/) || e.match(/understand|question|finish|done/))
    return { th: 'ใช้ตรวจสอบความเข้าใจหรือสิ้นสุดการตรวจ', en: 'Checking understanding or ending the visit' };

  return { th: 'ใช้ในการสนทนาทั่วไปกับผู้ป่วย', en: 'General conversation with the patient' };
}

/* ── Practice Recording ──────────────────────────────────── */
function goToPractice() {
  const s = currentScenario();
  if (s.phrases.length) {
    const p = s.phrases[0];
    selectPracticeCard('en', p.en, p.id);
  }
  switchTab('practice', document.querySelector('[data-tab="practice"]'));
}
function playPracticeAudio() { if (practiceTarget.text) speakText(practiceTarget.text, practiceTarget.lang); }

function toggleRecording() {
  if (!practiceTarget.text) { alert('กรุณาเลือกประโยคที่ต้องการฝึกก่อนค่ะ'); return; }
  if (isRecording) { recRef && recRef.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showRecResult('Browser ไม่รองรับ กรุณาใช้ Chrome'); return; }
  const rec = new SR();
  rec.lang = practiceTarget.lang === 'en' ? 'en-US' : 'zh-CN';
  rec.continuous = false; rec.interimResults = false; recRef = rec;
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
  rec.onresult = (e) => { const t = e.results[0][0].transcript; showRecResult(t); showScore(t); };
  rec.onend = () => {
    isRecording = false;
    document.getElementById('recBtn').classList.remove('recording');
    document.getElementById('recBtnText').textContent = 'กดเพื่อพูด (Tap to Speak)';
    document.getElementById('recIcon').className = 'fas fa-microphone';
    document.getElementById('recBox').classList.remove('listening');
    document.getElementById('listeningAnim').style.display = 'none';
    document.getElementById('recPlaceholder').style.display = '';
  };
  rec.onerror = () => { isRecording = false; showRecResult('ไม่สามารถรับเสียงได้ ลองอีกครั้ง'); };
  rec.start();
}

function showRecResult(text) {
  document.getElementById('listeningAnim').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = 'none';
  const el = document.getElementById('recResult');
  el.innerHTML = `<span style="color:var(--text-hint);font-size:11px">คุณพูดว่า:</span><br><strong>${esc(text)}</strong>`;
  el.style.display = 'block';
}

function showScore(spoken) {
  const pct = calcScore(spoken, practiceTarget.text);
  const box = document.getElementById('scoreBox');
  box.style.display = 'block'; box.className = 'score-box';
  let cls, msg;
  if (pct >= 90) { cls = 'good'; msg = '✨ ยอดเยี่ยมมาก!'; }
  else if (pct >= 75) { cls = 'ok'; msg = '👍 ดีมาก ลองอีกนิดนะ'; }
  else if (pct >= 60) { cls = 'meh'; msg = '💪 ฝึกอีกหน่อยนะ'; }
  else { cls = 'bad'; msg = '🎤 ลองพูดใหม่อีกครั้ง'; }
  box.classList.add(cls);
  document.getElementById('scoreMsg').textContent = msg;
  document.getElementById('scoreNum').textContent = pct + '%';
  const fill = document.getElementById('scoreBarFill');
  fill.style.width = '0';
  setTimeout(() => fill.style.width = pct + '%', 60);
  buildWordAnalysis(spoken, practiceTarget.text, practiceTarget.lang);
}

function buildWordAnalysis(spoken, target, lang) {
  const wa = document.getElementById('wordAnalysis');
  if (!target) { wa.innerHTML = ''; return; }
  let tw, sw;
  if (lang === 'zh') {
    tw = target.replace(/[^\u4e00-\u9fa5]/g,'').split('');
    sw = spoken.replace(/[^\u4e00-\u9fa5]/g,'').split('');
  } else {
    tw = target.toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(Boolean);
    sw = spoken.toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(Boolean);
  }
  const results = tw.map(t => {
    let best = 0; sw.forEach(s => { const sc = wordSim(s,t); if(sc>best) best=sc; });
    return { word:t, correct: best>=0.8 };
  });
  const wrong = results.filter(r => !r.correct);
  let html = `<div class="word-analysis-title"><i class="fas fa-spell-check"></i> วิเคราะห์รายคำ (กดคำเพื่อฟัง):</div>`;
  html += `<div class="word-tokens">${results.map(r =>
    `<div class="word-token ${r.correct?'correct':'wrong'}" onclick="speakText('${ea(r.word)}','${lang}')">
      ${esc(r.word)}<span class="token-hint">${r.correct?'✓':'✗'}</span>
    </div>`).join('')}</div>`;
  if (wrong.length > 0 && lang === 'en') {
    html += `<div class="wrong-tips">`;
    wrong.slice(0,4).forEach(r => {
      const ph = genPhonetics(r.word);
      html += `<div class="wrong-tip-item">
        <span class="tip-word">"${esc(r.word)}"</span>
        <span class="tip-arrow">→</span>
        <span class="tip-correct">ออกเสียง: ${esc(ph)}</span>
        <button class="btn-tip-listen" onclick="speakText('${ea(r.word)}','en')"><i class="fas fa-volume-up"></i> ฟัง</button>
      </div>`;
    });
    html += `</div>`;
  }
  wa.innerHTML = html;
}

function calcScore(spoken, target) {
  if (!target) return Math.round(80 + Math.random() * 12);
  const sw = spoken.toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(Boolean);
  const tw = target.toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(Boolean);
  if (!tw.length) return 85;
  let m = 0;
  tw.forEach(t => { let b=0; sw.forEach(s => { const sc=wordSim(s,t); if(sc>b) b=sc; }); m+=b; });
  return Math.min(100, Math.max(0, Math.round((m/tw.length)*100 + (Math.random()*4-2))));
}
function wordSim(a,b) {
  const long=a.length>=b.length?a:b, short=a.length>=b.length?b:a;
  if(!long.length) return 1;
  return (long.length - editDist(long,short)) / long.length;
}
function editDist(s1,s2) {
  const c=[];
  for(let i=0;i<=s1.length;i++){
    let last=i;
    for(let j=0;j<=s2.length;j++){
      if(i===0){c[j]=j;continue;}
      if(j>0){let nv=c[j-1];if(s1[i-1]!==s2[j-1])nv=Math.min(nv,last,c[j])+1;c[j-1]=last;last=nv;}
    }
    if(i>0) c[s2.length]=last;
  }
  return c[s2.length];
}

/* ── Chat Scenario Select ─────────────────────────────────── */
function renderChatScenarioSelect() {
  const sel = document.getElementById('chatScenarioSelect');
  if (!sel) return;
  sel.innerHTML = scenarios.map(s =>
    `<option value="${s.id}" ${s.id===chatScenarioId?'selected':''}>${s.icon} ${s.labelEn} · ${s.labelTh}</option>`
  ).join('');
  updateChatScenarioBadge();
}

function onChatScenarioChange() {
  chatScenarioId = document.getElementById('chatScenarioSelect').value;
  save();
  updateChatScenarioBadge();
  initQuiz();
}

function updateChatScenarioBadge() {
  const meta = rolePlayMeta[chatScenarioId] || rolePlayMeta['greeting'];
  const badge = document.getElementById('chatScenarioBadgeText');
  if (badge) badge.textContent = meta.badge;
  const hintBox = document.getElementById('chatHintBox');
  const hintText = document.getElementById('chatHintText');
  if (hintBox && hintText) { hintBox.style.display = 'block'; hintText.textContent = meta.hint; }
}

/* ── Quiz Mode ────────────────────────────────────────────── */
function initQuiz() {
  quizRoundIndex = 0;
  quizScore = 0;
  quizAnswered = false;

  const box = document.getElementById('chatBox');
  box.innerHTML = '';
  document.getElementById('quizOptionsWrap').innerHTML = '';

  const rounds = quizRounds[chatScenarioId] || [];
  rounds.forEach(r => {
    if(r.options) { r.options.wrongAttempts = 0; }
  });

  updateChatScenarioBadge();
  updateQuizProgress();
  showQuizRound(0);
}

function resetChat() { initQuiz(); }

function updateQuizProgress() {
  const rounds = (quizRounds[chatScenarioId] || []);
  const total = rounds.length;
  const wrap = document.getElementById('quizProgressWrap');
  if (!wrap) return;
  if (total === 0) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  document.getElementById('quizProgressText').textContent = `ข้อที่ ${Math.min(quizRoundIndex + 1, total)} / ${total}`;
  document.getElementById('quizScoreText').textContent = `✓ ${quizScore} คะแนน`;
  const pct = total > 0 ? (quizRoundIndex / total) * 100 : 0;
  document.getElementById('quizProgressFill').style.width = pct + '%';
}

function showQuizRound(roundIdx) {
  const rounds = quizRounds[chatScenarioId] || [];
  if (roundIdx >= rounds.length) { showQuizComplete(); return; }
  const round = rounds[roundIdx];
  quizAnswered = false;

  appendAiMsg(round.aiMsg.en, round.aiMsg.th);
  const opts = shuffle([...round.options]);
  renderQuizOptions(opts);
  updateQuizProgress();
}

function renderQuizOptions(opts) {
  currentQuizOpts = opts;
  currentQuizOpts.wrongAttempts = 0; 
  
  const wrap = document.getElementById('quizOptionsWrap');
  const labels = ['A', 'B', 'C', 'D'];
  wrap.innerHTML = `
    <div class="quiz-options-label"><i class="fas fa-hand-pointer"></i> พยาบาลควรพูดว่าอะไร? (เลือก 1 ข้อ)</div>
    <div class="quiz-options-grid" id="quizOptGrid">
      ${opts.map((o, i) => `
        <button class="quiz-option-btn" id="qopt-${i}" data-idx="${i}">
          <span class="opt-num">${labels[i]}</span>
          <span>${esc(o.text)}</span>
        </button>`).join('')}
    </div>`;

  document.getElementById('quizOptGrid').addEventListener('click', function(e) {
    const btn = e.target.closest('.quiz-option-btn');
    if (!btn) return;
    onQuizAnswer(parseInt(btn.dataset.idx, 10));
  });
}

function onQuizAnswer(clickedIdx) {
  if (quizAnswered) return;
  const opts = currentQuizOpts;
  if (!opts || !opts[clickedIdx]) return;

  if (typeof opts.wrongAttempts === 'undefined') {
    opts.wrongAttempts = 0;
  }

  const clicked = opts[clickedIdx];
  const isCorrect = clicked.correct;
  const hint = clicked.hint || '';
  const clickedText = clicked.text;

  const grid = document.getElementById('quizOptGrid');
  if (!grid) return;
  const btns = grid.querySelectorAll('.quiz-option-btn');
  const wrap = document.getElementById('quizOptionsWrap');

  quizAnswered = true;
  btns.forEach(b => b.disabled = true);

  if (isCorrect) {
    btns[clickedIdx].classList.add('correct-ans');

    quizScore++; 
    const scoreEl = document.getElementById('quizScoreText');
    if (scoreEl) scoreEl.textContent = `✓ ${quizScore} คะแนน`;

    const fb = document.createElement('div');
    fb.className = 'quiz-correct-row';
    fb.innerHTML = `<i class="fas fa-check-circle"></i> <span>ถูกต้อง! "${esc(clickedText)}" เป็นคำพูดที่เหมาะสมสำหรับสถานการณ์นี้</span>`;
    wrap.appendChild(fb);

    appendUserMsg(clickedText);
    speakText(clickedText, 'en');

    const nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-next-btn';
    const rounds = quizRounds[chatScenarioId] || [];
    const isLast = quizRoundIndex >= rounds.length - 1;
    nextBtn.innerHTML = isLast
      ? '<i class="fas fa-trophy"></i> ดูผลคะแนน'
      : '<i class="fas fa-arrow-right"></i> ข้อถัดไป';
    nextBtn.onclick = () => {
      quizRoundIndex++;
      document.getElementById('quizOptionsWrap').innerHTML = '';
      showQuizRound(quizRoundIndex);
    };
    wrap.appendChild(nextBtn);

  } else {
    opts.wrongAttempts++;
    btns[clickedIdx].classList.add('wrong-ans');

    const fb = document.createElement('div');
    fb.className = 'quiz-hint-row';
    fb.innerHTML = `<i class="fas fa-exclamation-circle"></i> <span><strong>คำแนะนำ:</strong> ${esc(hint)}</span>`;
    wrap.appendChild(fb);

    if (opts.wrongAttempts >= 2) {
      const correctIdx = opts.findIndex(o => o.correct);
      if (correctIdx !== -1) {
        btns[correctIdx].classList.add('correct-ans');
      }

      const failMsg = document.createElement('div');
      failMsg.className = 'quiz-hint-row';
      failMsg.style.backgroundColor = '#fef2f2';
      failMsg.style.borderColor = '#fecaca';
      failMsg.style.color = '#dc2626';
      failMsg.innerHTML = `<i class="fas fa-times-circle" style="color: #dc2626;"></i> <span><strong>ตอบผิด 2 ครั้ง:</strong> ไม่ได้คะแนนในข้อนี้ (ข้อที่ถูกต้องคือข้อ ${['A','B','C','D'][correctIdx]})</span>`;
      wrap.appendChild(failMsg);

      const nextBtn = document.createElement('button');
      nextBtn.className = 'quiz-next-btn';
      const rounds = quizRounds[chatScenarioId] || [];
      const isLast = quizRoundIndex >= rounds.length - 1;
      nextBtn.innerHTML = isLast
        ? '<i class="fas fa-trophy"></i> ดูผลคะแนน'
        : '<i class="fas fa-arrow-right"></i> ข้อถัดไป';
      nextBtn.onclick = () => {
        quizRoundIndex++;
        document.getElementById('quizOptionsWrap').innerHTML = '';
        showQuizRound(quizRoundIndex);
      };
      wrap.appendChild(nextBtn);

    } else {
      setTimeout(() => {
        btns.forEach((b) => {
          if (!b.classList.contains('wrong-ans')) {
            b.disabled = false;
          }
        });
        quizAnswered = false; 
      }, 600);
    }
  }
}

function showQuizComplete() {
  const rounds = quizRounds[chatScenarioId] || [];
  const total = rounds.length;
  const pct = total > 0 ? Math.round((quizScore / total) * 100) : 0;
  let emoji = '🎉', msg = 'ยอดเยี่ยมมาก!';
  if (pct < 67) { emoji = '💪'; msg = 'ฝึกอีกนิดนะคะ!'; }
  else if (pct < 100) { emoji = '👍'; msg = 'ดีมากเลย!'; }

  const wrap = document.getElementById('quizOptionsWrap');
  wrap.innerHTML = `
    <div class="quiz-complete-box">
      <div class="quiz-complete-icon">${emoji}</div>
      <div class="quiz-complete-title">${msg}</div>
      <div class="quiz-complete-sub">คุณตอบถูก ${quizScore} จาก ${total} ข้อ</div>
      <div class="quiz-score-display">${pct}%</div>
      <div class="quiz-score-label">คะแนนรวม</div>
      <button class="btn-restart-quiz" onclick="initQuiz()">
        <i class="fas fa-redo"></i> เริ่มใหม่อีกรอบ
      </button>
    </div>`;

  const bar = document.getElementById('quizProgressFill');
  if (bar) bar.style.width = '100%';
}

function appendAiMsg(en, th) {
  const box = document.getElementById('chatBox');
  const d = document.createElement('div');
  d.className = 'msg ai';
  d.innerHTML = `<div class="msg-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-content">
      <div class="msg-bubble">${esc(en)}</div>
      ${th ? `<div class="msg-hint">${esc(th)}</div>` : ''}
      <button class="msg-listen" onclick="speakText('${ea(en)}','en')">▶ ฟัง</button>
    </div>`;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
  speakText(en, 'en');
}

function appendUserMsg(text) {
  const box = document.getElementById('chatBox');
  const d = document.createElement('div');
  d.className = 'msg user';
  d.innerHTML = `<div class="msg-content"><div class="msg-bubble">${esc(text)}</div></div>
    <div class="msg-user-avatar"><i class="fas fa-user-nurse"></i></div>`;
  box.appendChild(d);
  box.scrollTop = box.scrollHeight;
}

/* ── Translate ────────────────────────────────────────────── */
function toggleTranslateMic() {
  const btn = document.getElementById('translateMicBtn');
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition; if(!SR) return;
  const lang = document.getElementById('fromLang').value;
  const rec = new SR(); rec.lang = lang==='th'?'th-TH':lang==='en'?'en-US':'zh-CN'; recRef = rec;
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
async function doTranslate(text) {
  try {
    const r = await gTranslate(text, document.getElementById('fromLang').value, document.getElementById('toLang').value);
    setTransOutput(r);
  } catch { setTransOutput('','[ไม่สามารถเชื่อมต่อได้]'); }
}
function setTransOutputLoading() {
  document.getElementById('translateOutput').innerHTML = `<div class="translate-loading"><div class="translate-spinner"></div> กำลังแปล...</div>`;
}
function setTransOutput(text, err='') {
  const el = document.getElementById('translateOutput');
  const toLang = document.getElementById('toLang').value;
  if (!text && !err) { el.innerHTML = '<p class="translate-placeholder">คำแปลจะปรากฏที่นี่...</p>'; return; }
  if (err) { el.innerHTML = `<p class="translate-placeholder">${esc(err)}</p>`; return; }
  el.innerHTML = `<p class="translate-result">${esc(text)}</p>
    <div class="translate-out-actions">
      <button class="btn-out-action" onclick="speakText('${ea(text)}','${toLang}')"><i class="fas fa-volume-up"></i> ฟัง</button>
      <button class="btn-out-action" onclick="copyTrans('${ea(text)}')" id="copyBtn"><i class="fas fa-copy"></i> คัดลอก</button>
      <button class="btn-out-action" onclick="addTranslatedToPhrase('${ea(text)}')"><i class="fas fa-plus"></i> เพิ่มประโยค</button>
    </div>`;
}
function addTranslatedToPhrase(translatedText) {
  const input = document.getElementById('translateInput').value.trim();
  const fromLang = document.getElementById('fromLang').value;
  const toLang = document.getElementById('toLang').value;
  openAddModal();
  setTimeout(() => {
    if (fromLang==='th') {
      document.getElementById('f-th').value = input;
      if (toLang==='en') document.getElementById('f-en').value = translatedText;
      else if (toLang==='zh-CN') document.getElementById('f-zh').value = translatedText;
      onModalThaiInput();
    } else if (fromLang==='en') {
      document.getElementById('f-en').value = input;
      if (toLang==='th') document.getElementById('f-th').value = translatedText;
      if (document.getElementById('f-en').value) document.getElementById('f-phonetic-en').value = genPhonetics(input);
    }
  }, 100);
}
function speakTranslateInput() { speakText(document.getElementById('translateInput').value, document.getElementById('fromLang').value); }
function copyTrans(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById('copyBtn'); if(!btn) return;
    btn.innerHTML = '<i class="fas fa-check"></i> คัดลอกแล้ว';
    setTimeout(() => { if(btn) btn.innerHTML = '<i class="fas fa-copy"></i> คัดลอก'; }, 1800);
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
    ${s.phrases.slice(0,3).map(p => `
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
  else { const b = document.querySelector('[data-tab="'+tabId+'"]'); if(b) b.classList.add('active'); }
  const panel = document.getElementById('panel-'+tabId); if(panel) panel.classList.add('active');
}

/* ── Speech ───────────────────────────────────────────────── */
function speakText(text, lang) {
  if (!text) return;
  const synth = window.speechSynthesis; if(!synth) return;
  synth.cancel();
  const doSpeak = () => {
    const utt = new SpeechSynthesisUtterance(text);
    const langMap = {'th':'th-TH','en':'en-US','zh':'zh-CN','zh-CN':'zh-CN'};
    const targetLang = langMap[lang] || lang || 'en-US';
    const voices = synth.getVoices();
    let voice = voices.find(v => v.lang.replace('_','-') === targetLang);
    if (!voice) voice = voices.find(v => v.lang.startsWith(targetLang.split('-')[0]));
    if (voice) utt.voice = voice;
    utt.lang = targetLang; utt.rate = 0.9; utt.pitch = 1.0; utt.volume = 1.0;
    if (synth.paused) synth.resume();
    synth.speak(utt);
  };
  if (synth.getVoices().length > 0) doSpeak();
  else { synth.onvoiceschanged = doSpeak; setTimeout(doSpeak, 300); }
}

/* ── Helpers ──────────────────────────────────────────────── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function ea(s) {
  if (!s) return '';
  return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"');
}

window.addEventListener('DOMContentLoaded', init);
