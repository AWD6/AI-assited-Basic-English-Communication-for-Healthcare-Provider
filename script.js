/* ============================================================
   HEAL English v5 — script.js
   ============================================================ */

const STORAGE_KEY = 'heal_english_v5';

const defaultScenarios = [
  {
    id: 'greeting', labelEn: 'Greeting', labelTh: 'การทักทาย', icon: '👋',
    phrases: [
      { id:'g1', en:'Hello, welcome to our hospital.', th:'สวัสดีค่ะ ยินดีต้อนรับสู่โรงพยาบาลค่ะ', zh:'您好，欢迎来到我们医院。', phonetic_en:'เฮลโล เวลคัม ทู เอาเออร์ ฮอสพิเทิล', phonetic_zh:'หนี่ว เฮา ฮวน อิ๋ง ไหลต้าว อู่เหมิน อี้ยวน', context:'First contact with patient at entrance or reception', contextTh:'ใช้เมื่อต้อนรับผู้ป่วยที่ทางเข้าหรือเคาน์เตอร์' },
      { id:'g2', en:'How can I help you today?', th:'วันนี้มีอะไรให้ช่วยไหมคะ?', zh:'我今天能帮您什么？', phonetic_en:'เฮา แคน ไอ เฮลป์ ยู ทูเดย์', phonetic_zh:'โว่ จิ่นเทียน เหนิง บ้านหวู่ หนิน เสิน เมอ', context:'Opening a patient encounter to ask about needs', contextTh:'ใช้เปิดการสนทนาเพื่อสอบถามความต้องการผู้ป่วย' },
      { id:'g3', en:'Please wait here for a moment.', th:'กรุณารอสักครู่ตรงนี้ค่ะ', zh:'请在这里稍等片刻。', phonetic_en:'พลีส เวท เฮียร์ ฟอร์ อะ โมเมินท์', phonetic_zh:'ชิ่ง ไจ่ จ่างหลี่ เซาเต่ง เพี่ยนเกอะ', context:'Asking patient to wait while preparing or checking information', contextTh:'ใช้ขอให้ผู้ป่วยรอขณะเตรียมข้อมูลหรือดำเนินการ' },
      { id:'g4', en:'Good morning! How are you feeling today?', th:'สวัสดีตอนเช้าค่ะ วันนี้รู้สึกเป็นอย่างไรบ้างคะ?', zh:'早上好！今天感觉怎么样？', phonetic_en:'กุด มอร์นิ่ง เฮา อาร์ ยู ฟีลิ่ง ทูเดย์', phonetic_zh:'จ้าวเซิ่งฮ่าว จิ่นเทียน เกินจวี่ เจ่นมะยาง', context:'Morning greeting when visiting a patient in the ward', contextTh:'ใช้ทักทายตอนเช้าเมื่อเยี่ยมผู้ป่วยในหอผู้ป่วย' },
      { id:'g5', en:'Are you here for a check-up?', th:'คุณมาตรวจสุขภาพไหมคะ?', zh:'您是来体检的吗？', phonetic_en:'อาร์ ยู เฮียร์ ฟอร์ อะ เช็คอัพ', phonetic_zh:'หนิน ซือ่ ไหลตี่เจียน ตี ม่า', context:'Confirming the purpose of the patient visit', contextTh:'ใช้ยืนยันวัตถุประสงค์การมาโรงพยาบาลของผู้ป่วย' },
      { id:'g6', en:'Sorry for the delay.', th:'ขอโทษที่ต้องรอนานนะคะ', zh:'抱歉让您久等了。', phonetic_en:'ซอร์รี่ ฟอร์ เดอะ ดีเลย์', phonetic_zh:'เปา เฉียน ร้าง หนิน จิ่วเต่ง ลิ่ว', context:'Apologizing to a patient for waiting time', contextTh:'ใช้ขอโทษผู้ป่วยที่ต้องรอนาน' },
      { id:'g7', en:'Please follow me.', th:'กรุณาตามมาด้วยค่ะ', zh:'请跟我来。', phonetic_en:'พลีส ฟอลโล มี', phonetic_zh:'ชิ่ง เกิน โว่ ไหล', context:'Leading patient to an examination room or ward', contextTh:'ใช้นำผู้ป่วยไปยังห้องตรวจหรือหอผู้ป่วย' },
      { id:'g8', en:'Have you checked your blood pressure, weight and height?', th:'คุณวัดความดันโลหิต ชั่งน้ำหนัก วัดส่วนสูงหรือยังคะ?', zh:'您量过血压、体重和身高了吗？', phonetic_en:'แฮฟ ยู เช็กต์ ยอร์ บลัด เพรชเชอร์ เวท แอนด์ เฮท', phonetic_zh:'หนิน เลียง กว่อ เซี่ยวเอีย ตี้จ้ง เหอ เซินเกาลิ่ว ม่า', context:'Confirming vital sign pre-checks before consultation', contextTh:'ใช้ยืนยันการตรวจสัญญาณชีพก่อนพบแพทย์' }
    ]
  },
  {
    id: 'registration', labelEn: 'Registration', labelTh: 'การลงทะเบียน', icon: '📋',
    phrases: [
      { id:'r1', en:'May I have your full name, please?', th:'ขอทราบชื่อ-นามสกุลด้วยค่ะ', zh:'请问您的全名是什么？', phonetic_en:'เมย์ ไอ แฮฟ ยอร์ ฟูล เนม พลีส', phonetic_zh:'ชิ่งเวิ่น หนิน ตี่ ชวน่อ ชื่อ เสิน เมอ', context:'Collecting patient identity at registration desk', contextTh:'ใช้เก็บข้อมูลตัวตนผู้ป่วยที่เคาน์เตอร์ลงทะเบียน' },
      { id:'r2', en:'Do you have an appointment today?', th:'ได้นัดไว้หรือเปล่าคะ?', zh:'您今天有预约吗？', phonetic_en:'ดู ยู แฮฟ แอน อะพอยต์เมินท์ ทูเดย์', phonetic_zh:'หนิน จิ่นเทียน หยวว ยู่เยว่ ม่า', context:'Checking if patient has a prior appointment', contextTh:'ใช้ตรวจสอบว่าผู้ป่วยมีนัดล่วงหน้าหรือไม่' },
      { id:'r3', en:'Please fill in this form.', th:'กรุณากรอกแบบฟอร์มนี้ด้วยค่ะ', zh:'请填写这张表格。', phonetic_en:'พลีส ฟิล อิน ดิส ฟอร์ม', phonetic_zh:'ชิ่ง เที่ยนเสียะ จ่างจ้าง เปี่ยวเก่อ', context:'Handing over a patient registration form', contextTh:'ใช้ขณะมอบแบบฟอร์มลงทะเบียนให้ผู้ป่วยกรอก' },
      { id:'r4', en:'Can I see your passport or ID card?', th:'ขอดูหนังสือเดินทางหรือบัตรประชาชนได้ไหมคะ?', zh:'我可以看一下您的护照或身份证吗？', phonetic_en:'แคน ไอ ซี ยอร์ พาสปอร์ท ออร์ ไอดี การ์ด', phonetic_zh:'โว่ เกอะ อี่ เซี่ยะ หนิน ตี่ ฮู่จ้าว หวือ เซิ่นฝีจ่าง ม่า', context:'Verifying identity of foreign or new patients', contextTh:'ใช้ยืนยันตัวตนผู้ป่วยต่างชาติหรือผู้ป่วยใหม่' },
      { id:'r5', en:'Please take a seat.', th:'กรุณานั่งรอได้เลยค่ะ', zh:'请坐下等待。', phonetic_en:'พลีส เทค อะ ซีท', phonetic_zh:'ชิ่ง จ้วว เซียเต่งไต่', context:'Asking patient to sit down and wait', contextTh:'ใช้ขอให้ผู้ป่วยนั่งรอ' },
      { id:'r6', en:'The nurse will call you soon.', th:'พยาบาลจะเรียกคุณในอีกไม่นานค่ะ', zh:'护士很快就会叫您了。', phonetic_en:'เดอะ เนิร์ส วิล คอล ยู ซูน', phonetic_zh:'ฮู่ซือ่ เหิน ไขว่ จิ่ว ฮวี่ เจี้ยว หนิน ลิ่ว', context:'Reassuring patient that their turn is coming', contextTh:'ใช้ให้ผู้ป่วยมั่นใจว่าจะได้รับการเรียกเร็วๆ นี้' },
      { id:'r7', en:'The screen will show your queue number.', th:'หน้าจอจะแสดงหมายเลขคิวของคุณค่ะ', zh:'屏幕上会显示您的排队号码。', phonetic_en:'เดอะ สกรีน วิล โชว์ ยอร์ คิว นัมเบอร์', phonetic_zh:'ผิงหมู่ชาง ฮวี่ เซี่ยนซือ่ หนิน ตี่ ไผ่ตุ้ย เฮ่าม่า', context:'Directing patient to watch the display screen for queue number', contextTh:'ใช้บอกให้ผู้ป่วยดูหน้าจอแสดงหมายเลขคิว' },
      { id:'r8', en:'The doctor will see you shortly.', th:'คุณหมอจะพบคุณในอีกสักครู่ค่ะ', zh:'医生很快就会见您。', phonetic_en:'เดอะ ด็อกเตอร์ วิล ซี ยู ชอร์ทลี', phonetic_zh:'อี้เซิง เหิน ไขว่ จิ่ว ฮวี่ เจียน หนิน', context:'Informing patient that doctor will be with them soon', contextTh:'ใช้แจ้งผู้ป่วยว่าแพทย์จะพบในไม่ช้า' },
      { id:'r9', en:'Could you repeat that, please?', th:'ช่วยพูดซ้ำอีกครั้งได้ไหมคะ?', zh:'请您再说一遍好吗？', phonetic_en:'คุด ยู รีพีท แดท พลีส', phonetic_zh:'ชิ่ง หนิน ไจ่ ซัว อี้เปี้ยน เฮ่า ม่า', context:'Asking patient to repeat when you did not understand', contextTh:'ใช้ขอให้ผู้ป่วยพูดซ้ำเมื่อไม่เข้าใจ' },
      { id:'r10', en:'What is your phone number?', th:'เบอร์โทรศัพท์ของคุณคือเบอร์อะไรคะ?', zh:'您的电话号码是什么？', phonetic_en:'วอท อิซ ยอร์ โฟน นัมเบอร์', phonetic_zh:'หนิน ตี่ เตียนฮวา เฮ่าม่า ซือ่ เสิน เมอ', context:'Collecting contact number for patient records', contextTh:'ใช้เก็บเบอร์โทรศัพท์ในระเบียนผู้ป่วย' },
      { id:'r11', en:'When did the symptoms start?', th:'อาการเริ่มต้นเมื่อไหร่คะ?', zh:'症状是什么时候开始的？', phonetic_en:'เวน ดิด เดอะ ซิมทัมส์ สตาร์ท', phonetic_zh:'เจิ้งจวั้ง ซือ่ เสิน เมอ ซือ์โหว ไคชื่อ ตี', context:'Asking when patient first noticed symptoms', contextTh:'ใช้สอบถามจุดเริ่มต้นของอาการเจ็บป่วย' },
      { id:'r12', en:'Where does it hurt?', th:'เจ็บที่ไหนคะ?', zh:'哪里疼？', phonetic_en:'แวร์ ดัซ อิท เฮิร์ท', phonetic_zh:'หน่า หลี่ เทิ่ง', context:'Locating the area of pain on patient body', contextTh:'ใช้ระบุตำแหน่งที่เจ็บปวดของผู้ป่วย' },
      { id:'r13', en:'How severe is the pain? On a scale of 1 to 10.', th:'ปวดมากแค่ไหนคะ? จากคะแนน 1 ถึง 10', zh:'疼痛有多严重？从1到10分。', phonetic_en:'เฮา ซีเวียร์ อิซ เดอะ เปน ออน อะ สเกล ออฟ วัน ทู เทน', phonetic_zh:'เทิ่งถ่ง หยว มัว หยัน จ้ง จง อี้ ต้าว ซือ่ เฝิน', context:'Assessing pain intensity using a numerical scale', contextTh:'ใช้วัดระดับความเจ็บปวดด้วยคะแนน' },
      { id:'r14', en:'Do you have a fever?', th:'คุณมีไข้ไหมคะ?', zh:'您发烧了吗？', phonetic_en:'ดู ยู แฮฟ อะ ฟีเวอร์', phonetic_zh:'หนิน ฝาเซา ลิ่ว ม่า', context:'Checking for elevated body temperature', contextTh:'ใช้ตรวจสอบอาการมีไข้' },
      { id:'r15', en:'Are you currently taking any medication?', th:'ตอนนี้คุณกำลังทานยาอะไรอยู่ไหมคะ?', zh:'您目前在服用任何药物吗？', phonetic_en:'อาร์ ยู เคอร์เรินท์ลี เทคคิ่ง เอนี เมดิเคชัน', phonetic_zh:'หนิน มู้เฉียน ไจ่ ฝู้หยง เหรินเฮา เอี่ยวอู้ ม่า', context:'Checking current medications before treatment', contextTh:'ใช้ตรวจสอบยาที่ผู้ป่วยกำลังทานอยู่ก่อนรักษา' },
      { id:'r16', en:'Do you have any chronic diseases?', th:'คุณมีโรคประจำตัวไหมคะ?', zh:'您有任何慢性病吗？', phonetic_en:'ดู ยู แฮฟ เอนี โครนิก ดิซีซิส', phonetic_zh:'หนิน หยวว เหรินเฮา หม่าน ซิ่ง ปิ้ง ม่า', context:'Screening for underlying chronic conditions', contextTh:'ใช้คัดกรองโรคประจำตัวของผู้ป่วย' },
      { id:'r17', en:'Have you eaten today?', th:'วันนี้ทานอาหารแล้วยังคะ?', zh:'您今天吃饭了吗？', phonetic_en:'แฮฟ ยู อีทเทิน ทูเดย์', phonetic_zh:'หนิน จิ่นเทียน ชีฝาน ลิ่ว ม่า', context:'Asking if patient has eaten before procedures', contextTh:'ใช้ถามว่ารับประทานอาหารแล้วหรือยัง' },
      { id:'r18', en:'Do you smoke or drink alcohol?', th:'คุณสูบบุหรี่หรือดื่มแอลกอฮอล์ไหมคะ?', zh:'您抽烟或喝酒吗？', phonetic_en:'ดู ยู สโมค ออร์ ดริ้งค์ แอลกอฮอล', phonetic_zh:'หนิน โจวเอีย หวือ เหอ จิ่ว ม่า', context:'Lifestyle screening for health assessment', contextTh:'ใช้สอบถามพฤติกรรมสุขภาพ' },
      { id:'r19', en:'Please sign here.', th:'กรุณาเซ็นชื่อตรงนี้ด้วยค่ะ', zh:'请在这里签名。', phonetic_en:'พลีส ไซน์ เฮียร์', phonetic_zh:'ชิ่ง ไจ่ จ่างหลี่ เชียนหมิง', context:'Requesting patient signature on consent or registration forms', contextTh:'ใช้ขอลายเซ็นผู้ป่วยในแบบฟอร์มต่างๆ' },
      { id:'r20', en:'We need to check your vital signs first.', th:'เราต้องตรวจสัญญาณชีพก่อนนะคะ', zh:'我们需要先检查您的生命体征。', phonetic_en:'วี นีด ทู เช็ก ยอร์ ไวทัล ไซนส์ เฟิร์สท์', phonetic_zh:'โว่เหมิน ซวีเอี้ยว เซียน เจียนฉา หนิน ตี่ เซิ่งหมิงตี้เจิง', context:'Explaining vital sign check before consultation', contextTh:'ใช้อธิบายขั้นตอนตรวจสัญญาณชีพก่อนพบแพทย์' }
    ]
  },
  {
    id: 'direction', labelEn: 'Direction', labelTh: 'การบอกทาง', icon: '🗺️',
    phrases: [
      { id:'d1', en:'The pharmacy is on the first floor.', th:'ห้องยาอยู่ที่ชั้น 1 ค่ะ', zh:'药房在一楼。', phonetic_en:'เดอะ ฟาร์มาซี อิซ ออน เดอะ เฟิร์สท์ ฟลอร์', phonetic_zh:'เอี่ยวฝาง ไจ่ อี้หลาว', context:'Directing patient to the pharmacy after consultation', contextTh:'ใช้บอกทางไปห้องยาหลังพบแพทย์' },
      { id:'d2', en:'Go straight ahead and turn left.', th:'เดินตรงไปแล้วเลี้ยวซ้ายค่ะ', zh:'一直走，然后左转。', phonetic_en:'โก สเตรท อะเฮด แอนด์ เทิร์น เลฟท์', phonetic_zh:'อี้จือ่ โจ่ว เหรินเฮา จ้วว ต์วน', context:'Giving basic directions within the hospital building', contextTh:'ใช้บอกทิศทางพื้นฐานภายในอาคารโรงพยาบาล' },
      { id:'d3', en:'The elevator is at the end of the corridor.', th:'ลิฟต์อยู่ที่ปลายทางเดินค่ะ', zh:'电梯在走廊尽头。', phonetic_en:'เดอะ เอลิเวเตอร์ อิซ แอท เดอะ เอนด์ ออฟ เดอะ คอริดอร์', phonetic_zh:'เตียนตี้ ไจ่ โจ่วหลาง จิ่น โถว', context:'Helping patient find the elevator to another floor', contextTh:'ใช้ช่วยผู้ป่วยหาลิฟต์เพื่อขึ้น-ลงชั้น' },
      { id:'d4', en:'The restroom is around the corner.', th:'ห้องน้ำอยู่แถวหัวมุมค่ะ', zh:'洗手间就在转角处。', phonetic_en:'เดอะ เรสรูม อิซ อะราวนด์ เดอะ คอร์เนอร์', phonetic_zh:'ซี่โซ่วเจียน จิ่วไจ่ จ้วนเจี่ยวชู่', context:'Pointing patient to the nearest restroom', contextTh:'ใช้บอกทางไปห้องน้ำที่ใกล้ที่สุด' },
      { id:'d5', en:'Please register at the Medical Records Room, first floor.', th:'กรุณาลงทะเบียนที่ห้องเวชระเบียน ชั้น 1 ค่ะ', zh:'请在一楼病历室登记。', phonetic_en:'พลีส เรจิสเตอร์ แอท เดอะ เมดิเคิล เรคคอร์ดส รูม เฟิร์สท์ ฟลอร์', phonetic_zh:'ชิ่ง ไจ่ อี้หลาว ปิ้งลี่ซือ่ เติงจี้', context:'Directing patient to the medical records registration room', contextTh:'ใช้บอกทางไปลงทะเบียนที่ห้องเวชระเบียน' },
      { id:'d6', en:'The cashier is on the second floor.', th:'แคชเชียร์อยู่ที่ชั้น 2 ค่ะ', zh:'收费处在二楼。', phonetic_en:'เดอะ แคชเชียร์ อิซ ออน เดอะ เซคเคินด์ ฟลอร์', phonetic_zh:'โซ่วเฟ่ยชู่ ไจ่ เอ้อร์หลาว', context:'Directing patient to pay at the cashier counter', contextTh:'ใช้บอกทางไปชำระเงินที่แคชเชียร์' },
      { id:'d7', en:'The laboratory is on the third floor.', th:'ห้องปฏิบัติการอยู่ที่ชั้น 3 ค่ะ', zh:'化验室在三楼。', phonetic_en:'เดอะ แล็บโบระทอรี อิซ ออน เดอะ เทิร์ด ฟลอร์', phonetic_zh:'ฮวาเยี่ยนซือ่ ไจ่ ซานหลาว', context:'Directing patient to get blood or urine tests', contextTh:'ใช้บอกทางไปห้องปฏิบัติการตรวจเลือดหรือปัสสาวะ' },
      { id:'d8', en:'The X-ray room is next to the radiology department.', th:'ห้องเอกซ์เรย์อยู่ติดกับภาควิชารังสีวิทยาค่ะ', zh:'X光室就在放射科旁边。', phonetic_en:'เดอะ เอกซ์เรย์ รูม อิซ เน็กซ์ท ทู เดอะ เรดิโอโลจี ดีพาร์ทเมินท์', phonetic_zh:'เอกซ์กวางซือ่ จิ่วไจ่ ฝางเซ่อเคอ ผั่งเบียน', context:'Directing patient for X-ray imaging', contextTh:'ใช้บอกทางไปถ่ายเอกซ์เรย์' },
      { id:'d9', en:'Please take the stairs to the fourth floor.', th:'กรุณาขึ้นบันไดไปยังชั้น 4 ค่ะ', zh:'请走楼梯到四楼。', phonetic_en:'พลีส เทค เดอะ สแตร์ส ทู เดอะ โฟร์ท ฟลอร์', phonetic_zh:'ชิ่ง โจ่ว โหลวตี ต้าว ซือ่หลาว', context:'Directing patient to use stairs instead of elevator', contextTh:'ใช้บอกให้ผู้ป่วยใช้บันไดแทนลิฟต์' },
      { id:'d10', en:'The outpatient department is in the main building.', th:'แผนกผู้ป่วยนอกอยู่ในอาคารหลักค่ะ', zh:'门诊部在主楼。', phonetic_en:'เดอะ เอาพาเชินท์ ดีพาร์ทเมินท์ อิซ อิน เดอะ เมน บิลดิ้ง', phonetic_zh:'เหมินเจิ้นปู้ ไจ่ จูโหลว', context:'Directing patient to outpatient clinic', contextTh:'ใช้บอกทางไปแผนกผู้ป่วยนอก' },
      { id:'d11', en:'Turn right at the end of the hallway.', th:'เลี้ยวขวาที่ปลายทางเดินค่ะ', zh:'在走廊尽头向右转。', phonetic_en:'เทิร์น ไรท์ แอท เดอะ เอนด์ ออฟ เดอะ ฮอลเวย์', phonetic_zh:'ไจ่ โจ่วหลาง จิ่นโถว เซียงโย่วจ้วน', context:'Giving turn-right directions inside hospital', contextTh:'ใช้บอกทิศทางเลี้ยวขวาภายในโรงพยาบาล' },
      { id:'d12', en:'The emergency room is on the ground floor near the main entrance.', th:'ห้องฉุกเฉินอยู่ที่ชั้นล่างใกล้ทางเข้าหลักค่ะ', zh:'急诊室在一楼靠近主入口处。', phonetic_en:'เดอะ อิเมอร์เจนซี รูม อิซ ออน เดอะ กราวนด์ ฟลอร์ เนียร์ เดอะ เมน เอ็นทรานซ์', phonetic_zh:'จี๋เจิ้นซือ่ ไจ่ อี้หลาว เคาจิ้น จูรู้โข่วชู่', context:'Directing a patient or visitor to the emergency room', contextTh:'ใช้บอกทางไปห้องฉุกเฉิน' },
      { id:'d13', en:'The pediatrics department is in the children\'s building.', th:'แผนกกุมารเวชศาสตร์อยู่ในอาคารเด็กค่ะ', zh:'儿科在儿童楼。', phonetic_en:'เดอะ พีเดียทริกส์ ดีพาร์ทเมินท์ อิซ อิน เดอะ ชิลเดรนส์ บิลดิ้ง', phonetic_zh:'เอ๋อเคอ ไจ่ เอ๋อร์ถงโหลว', context:'Directing parents with children to the pediatrics ward', contextTh:'ใช้บอกทางไปแผนกกุมารเวชศาสตร์' },
      { id:'d14', en:'The parking lot is behind the hospital.', th:'ที่จอดรถอยู่ด้านหลังโรงพยาบาลค่ะ', zh:'停车场在医院后面。', phonetic_en:'เดอะ พาร์กิ้ง ลอท อิซ บีไฮนด์ เดอะ ฮอสพิเทิล', phonetic_zh:'ถิงเชอชาง ไจ่ อี้ยวนเฮ่าเมียน', context:'Directing visitors or patients to car parking area', contextTh:'ใช้บอกทางไปที่จอดรถ' },
      { id:'d15', en:'You can take the shuttle bus from the main entrance.', th:'คุณสามารถนั่งรถรับส่งได้จากทางเข้าหลักค่ะ', zh:'您可以从主入口乘坐班车。', phonetic_en:'ยู แคน เทค เดอะ ชัทเทิล บัส ฟรอม เดอะ เมน เอ็นทรานซ์', phonetic_zh:'หนิน เกอะ อี่ จง จูรู้โข่ว เฉิงจ้วว บานเชอ', context:'Informing patient about shuttle service between buildings', contextTh:'ใช้แจ้งผู้ป่วยเกี่ยวกับรถรับส่งระหว่างอาคาร' }
    ]
  },
  {
    id: 'care', labelEn: 'During Care', labelTh: 'ระหว่างดูแล', icon: '🩺',
    phrases: [
      { id:'c1', en:'Please lie down on the bed.', th:'กรุณานอนลงบนเตียงด้วยค่ะ', zh:'请躺在床上。', phonetic_en:'พลีส ไลย์ ดาวน์ ออน เดอะ เบด', phonetic_zh:'ชิ่ง ถ่างไจ่ ฉวงชาง', context:'Asking patient to lie down for examination', contextTh:'ใช้ขอให้ผู้ป่วยนอนลงเพื่อตรวจ' },
      { id:'c2', en:'Please roll up your sleeve.', th:'กรุณาพับแขนเสื้อขึ้นด้วยค่ะ', zh:'请卷起袖子。', phonetic_en:'พลีส โรล อัพ ยอร์ สลีฟ', phonetic_zh:'ชิ่ง จวน ชี่ ซิ่วจือ', context:'Asking patient to roll up sleeve before injection or blood draw', contextTh:'ใช้ขอให้ผู้ป่วยพับแขนเสื้อก่อนฉีดยาหรือเจาะเลือด' },
      { id:'c3', en:'Take a deep breath and relax.', th:'หายใจลึกๆ และผ่อนคลายนะคะ', zh:'请深呼吸，放松。', phonetic_en:'เทค อะ ดีพ เบรธ แอนด์ รีแล็กซ์', phonetic_zh:'ชิ่ง เซิน ฮูซี ฝางซง', context:'Calming patient before or during procedure', contextTh:'ใช้ช่วยผู้ป่วยผ่อนคลายก่อนหรือระหว่างทำหัตถการ' },
      { id:'c4', en:'Please sit still.', th:'กรุณานั่งนิ่งๆ ด้วยค่ะ', zh:'请保持不动。', phonetic_en:'พลีส ซิท สทิล', phonetic_zh:'ชิ่ง เป่าฉือ่ ปู้ต้ง', context:'Asking patient not to move during examination', contextTh:'ใช้ขอให้ผู้ป่วยนั่งนิ่งระหว่างตรวจ' },
      { id:'c5', en:'This might feel a little uncomfortable.', th:'อาจจะรู้สึกไม่สบายนิดหน่อยนะคะ', zh:'这可能会有点不舒服。', phonetic_en:'ดิส ไมท์ ฟีล อะ ลิทเทิล อันคัมฟอร์ทาเบิล', phonetic_zh:'จ่า เกอะ เหนิง ฮวี่ หยว เตี่ยน ปู้ ซูฝู', context:'Warning patient about a procedure that may be uncomfortable', contextTh:'ใช้แจ้งผู้ป่วยว่าอาจรู้สึกไม่สบายนิดหน่อย' },
      { id:'c6', en:'Tell me if you feel any pain.', th:'ถ้ารู้สึกเจ็บบอกได้เลยนะคะ', zh:'如果感到疼痛，请告诉我。', phonetic_en:'เทล มี อิฟ ยู ฟีล เอนี เปน', phonetic_zh:'รู๋กว่อ เกินต้าว เทิ่งถ่ง ชิ่ง เกาซู่ โว่', context:'Asking patient to report pain during examination or procedure', contextTh:'ใช้ขอให้ผู้ป่วยบอกหากรู้สึกเจ็บ' },
      { id:'c7', en:'Do you feel dizzy?', th:'รู้สึกเวียนหัวไหมคะ?', zh:'您感到头晕吗？', phonetic_en:'ดู ยู ฟีล ดิซซี่', phonetic_zh:'หนิน เกินต้าว โถวหยุน ม่า', context:'Checking if patient is experiencing dizziness', contextTh:'ใช้ตรวจสอบอาการเวียนหัวของผู้ป่วย' },
      { id:'c8', en:'Take this medicine twice a day after meals.', th:'ทานยานี้วันละสองครั้งหลังอาหารนะคะ', zh:'这药每天饭后服用两次。', phonetic_en:'เทค ดิส เมดิซิน ทไวส์ อะ เดย์ อาฟเตอร์ มีลส์', phonetic_zh:'จ่า เอี่ยว เหม่ยเทียน ฝานเฮ่า ฝู้หยง เลี่ยงซื้', context:'Giving medication instruction after consultation', contextTh:'ใช้อธิบายวิธีทานยาหลังพบแพทย์' },
      { id:'c9', en:'Do you have any allergies to medication?', th:'คุณแพ้ยาอะไรบ้างไหมคะ?', zh:'您对任何药物过敏吗？', phonetic_en:'ดู ยู แฮฟ เอนี อะเลอร์จีส ทู เมดิเคชัน', phonetic_zh:'หนิน ตุ้ย เหรินเฮา เอี่ยวอู้ กว่อหมิน ม่า', context:'Screening for drug allergies before prescribing', contextTh:'ใช้คัดกรองการแพ้ยาก่อนสั่งจ่ายยา' },
      { id:'c10', en:'Your test results will be ready in 30 minutes.', th:'ผลการตรวจจะพร้อมใน 30 นาทีค่ะ', zh:'您的检查结果将在30分钟内出来。', phonetic_en:'ยอร์ เทสท์ รีซัลทส์ วิล บี เรดี อิน เทิร์ที มินิทส์', phonetic_zh:'หนิน ตี่ เจียนฉา เจี๋ยกว่อ เจียง ไจ่ ซานซือ่ เฝินจง เน่ย ชูไหล', context:'Informing patient how long to wait for test results', contextTh:'ใช้แจ้งผู้ป่วยว่าต้องรอผลการตรวจนานเท่าไร' },
      { id:'c11', en:'If the symptoms get worse, please come back immediately.', th:'ถ้าอาการแย่ลง กรุณากลับมาทันทีนะคะ', zh:'如果症状加重，请立即回来。', phonetic_en:'อิฟ เดอะ ซิมทัมส์ เกท เวิร์ส พลีส คัม แบค อิมมีเดียทลี', phonetic_zh:'รู๋กว่อ เจิ้งจวั้ง เจียจ้ง ชิ่ง ลี่จี๋ หวยไหล', context:'Giving patient instructions for when to return to hospital', contextTh:'ใช้บอกผู้ป่วยว่าควรกลับมาพบแพทย์เมื่อไร' },
      { id:'c12', en:'Please do not eat or drink anything 4 hours before the procedure.', th:'กรุณาอย่ากินอาหารหรือน้ำ 4 ชั่วโมงก่อนทำหัตถการนะคะ', zh:'手术前4小时请勿进食或饮水。', phonetic_en:'พลีส ดู นอท อีท ออร์ ดริ้งค์ เอนีธิ่ง โฟร์ เอาเออร์ส บีโฟร์ เดอะ โพรซีเจอร์', phonetic_zh:'โซ่วซู่เฉียน ซื่อ เซี่ยวซือ่ ชิ่งอู้ จิ้นซือ่ หวือ อิ่นซุ่ย', context:'Fasting instructions before surgery or medical procedure', contextTh:'ใช้แจ้งผู้ป่วยให้งดอาหารและน้ำก่อนหัตถการ' },
      { id:'c13', en:'I am going to give you an injection.', th:'ฉันจะฉีดยาให้คุณนะคะ', zh:'我要给您打针了。', phonetic_en:'ไอ แอม โกอิ่ง ทู กิฟ ยู แอน อินเจคชัน', phonetic_zh:'โว่ เอี้ยว เกย หนิน ต่าเจิน ลิ่ว', context:'Warning patient before giving an injection', contextTh:'ใช้แจ้งผู้ป่วยก่อนฉีดยา' },
      { id:'c14', en:'Do you have any questions for me?', th:'คุณมีคำถามอะไรจะถามฉันไหมคะ?', zh:'您还有什么问题要问我吗？', phonetic_en:'ดู ยู แฮฟ เอนี เควสชันส์ ฟอร์ มี', phonetic_zh:'หนิน ไห่ หยวว เสิน เมอ เวินตี้ เอี้ยว เวิ่น โว่ ม่า', context:'Checking if patient has any remaining questions', contextTh:'ใช้ถามผู้ป่วยว่ามีคำถามเพิ่มเติมไหม' },
      { id:'c15', en:'Please press here gently with this cotton.', th:'กรุณากดตรงนี้เบาๆ ด้วยสำลีนะคะ', zh:'请用棉球轻轻按压这里。', phonetic_en:'พลีส เพรส เฮียร์ เจนทลี วิธ ดิส คอททัน', phonetic_zh:'ชิ่ง หยง เหมียนชิ่ว ชิงชิง อันยา จ่างหลี่', context:'Instructing patient after injection or blood draw', contextTh:'ใช้บอกให้ผู้ป่วยกดสำลีหลังฉีดยาหรือเจาะเลือด' }
    ]
  }
];

/* ── State ────────────────────────────────────────────────── */
let scenarios = [];
let activeScenarioId = 'greeting';
let practiceTarget = '';
let isRecording = false;
let isChatMic = false;
let isAddModalRecording = false;
let recRef = null;
let translateDebounce = null;
let editingId = null;
let modalAutoTimer = null;
let chatHistory = [];

/* ── Init ────────────────────────────────────────────────── */
function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      scenarios = parsed;
    } catch (e) {
      scenarios = JSON.parse(JSON.stringify(defaultScenarios));
    }
  } else {
    scenarios = JSON.parse(JSON.stringify(defaultScenarios));
  }
  renderScenarios();
  renderPhrases();
  renderPracticeSelect();
  renderQuickPhrases();
  initChat();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
}

function currentScenario() {
  return scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
}

/* ── Scenarios ────────────────────────────────────────────── */
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
  practiceTarget = '';
  renderScenarios();
  renderPhrases();
  renderPracticeSelect();
  renderQuickPhrases();
}

/* ── Phrases ──────────────────────────────────────────────── */
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
              ${p.phonetic_en ? `<span class="phrase-phonetic">🔤 ${esc(p.phonetic_en)}</span>` : ''}
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
              ${p.phonetic_zh ? `<span class="phrase-phonetic">🔤 ${esc(p.phonetic_zh)}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="phrase-actions">
          <button class="btn-icon blue" onclick="speakText('${ea(p.en)}','en')" title="ฟัง EN"><i class="fas fa-volume-up"></i></button>
          <button class="btn-icon green" onclick="openEditModal('${ea(p.id)}')" title="แก้ไข"><i class="fas fa-pen"></i></button>
          <button class="btn-icon red" onclick="openDeleteModal('${ea(p.id)}')" title="ลบ"><i class="fas fa-trash"></i></button>
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

/* Auto-translate on Thai input — fills actual fields */
function onModalThaiInput() {
  const th = document.getElementById('f-th').value.trim();
  if (modalAutoTimer) clearTimeout(modalAutoTimer);
  if (!th) {
    const prev = document.getElementById('autoPreview');
    if (prev) prev.classList.remove('visible');
    return;
  }
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
    const [en, zh] = await Promise.all([
      gTranslate(th, 'th', 'en'),
      gTranslate(th, 'th', 'zh-CN')
    ]);
    const phonEn = genPhonetics(en);
    const ctx = analyzeCtx(th, en);

    /* Fill actual input fields so submit picks them up */
    const fEn = document.getElementById('f-en');
    const fZh = document.getElementById('f-zh');
    const fPhEn = document.getElementById('f-phonetic-en');
    const fCtxTh = document.getElementById('f-ctx-th');
    const fCtxEn = document.getElementById('f-ctx-en');
    if (fEn && !fEn.value) fEn.value = en;
    if (fZh && !fZh.value) fZh.value = zh;
    if (fPhEn && !fPhEn.value) fPhEn.value = phonEn;
    if (fCtxTh && !fCtxTh.value) fCtxTh.value = ctx.th;
    if (fCtxEn && !fCtxEn.value) fCtxEn.value = ctx.en;

    /* Show preview summary */
    document.getElementById('autoPreviewContent').innerHTML = `
      <div class="auto-preview-row">
        <div class="auto-preview-label">🇬🇧 English</div>
        <div class="auto-preview-text">${esc(en)}</div>
        ${phonEn ? `<span class="auto-preview-phonetic">🔤 ${esc(phonEn)}</span>` : ''}
      </div>
      <div class="auto-preview-row">
        <div class="auto-preview-label">🇨🇳 中文</div>
        <div class="auto-preview-text">${esc(zh)}</div>
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
  if (!th) { setErr('err-th', 'f-th', 'กรุณากรอกประโยคภาษาไทย'); return; }

  let en = document.getElementById('f-en').value.trim();
  let zh = document.getElementById('f-zh').value.trim();
  let phonEn = document.getElementById('f-phonetic-en').value.trim();
  let phonZh = document.getElementById('f-phonetic-zh').value.trim();
  let ctxTh = document.getElementById('f-ctx-th').value.trim();
  let ctxEn = document.getElementById('f-ctx-en').value.trim();

  const btn = document.getElementById('btnConfirmAdd');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังบันทึก...';

  if (!en || !zh) {
    try {
      const [enR, zhR] = await Promise.all([
        en ? Promise.resolve(en) : gTranslate(th, 'th', 'en'),
        zh ? Promise.resolve(zh) : gTranslate(th, 'th', 'zh-CN')
      ]);
      en = enR; zh = zhR;
      if (!phonEn) phonEn = genPhonetics(en);
      if (!ctxTh || !ctxEn) {
        const c = analyzeCtx(th, en);
        ctxTh = ctxTh || c.th;
        ctxEn = ctxEn || c.en;
      }
    } catch (e) {}
  }

  btn.disabled = false;
  const isEdit = !!editingId;
  btn.innerHTML = isEdit ? '<i class="fas fa-save"></i> บันทึก' : '<i class="fas fa-plus"></i> เพิ่มประโยค';

  if (!en) { setErr('err-en', 'f-en', 'ไม่สามารถแปลได้ กรุณากรอกเอง'); return; }
  if (!zh) { setErr('err-zh', 'f-zh', 'ไม่สามารถแปลได้ กรุณากรอกเอง'); return; }

  const s = currentScenario();
  if (isEdit) {
    const idx = s.phrases.findIndex(p => p.id === editingId);
    if (idx !== -1) {
      s.phrases[idx] = { ...s.phrases[idx], en, th, zh, phonetic_en: phonEn, phonetic_zh: phonZh, context: ctxEn, contextTh: ctxTh };
    }
  } else {
    s.phrases.push({ id: 'c_' + Date.now(), en, th, zh, phonetic_en: phonEn, phonetic_zh: phonZh, context: ctxEn, contextTh: ctxTh });
  }

  save();
  closeAddModal();
  renderPhrases();
  renderPracticeSelect();
  renderQuickPhrases();
}

function setErr(errId, inputId, msg) {
  const e = document.getElementById(errId); if (e) e.textContent = msg;
  const i = document.getElementById(inputId); if (i) i.classList.add('error');
}

/* Mic for add modal */
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
  const s = currentScenario();
  const phrase = s.phrases.find(p => p.id === id);
  if (!phrase) return;
  deleteTargetId = id;
  document.getElementById('deletePhrasePreview').innerHTML =
    `<strong>${esc(phrase.en)}</strong><br><span style="font-size:12px;color:var(--text-sub)">${esc(phrase.th)}</span>`;
  document.getElementById('deleteModal').classList.add('open');
}
function closeDeleteModal() {
  document.getElementById('deleteModal').classList.remove('open');
  deleteTargetId = null;
}
function doDelete() {
  if (!deleteTargetId) return;
  const s = currentScenario();
  s.phrases = s.phrases.filter(p => p.id !== deleteTargetId);
  save();
  closeDeleteModal();
  renderPhrases();
  renderPracticeSelect();
  renderQuickPhrases();
}

/* ── Google Translate ─────────────────────────────────────── */
async function gTranslate(text, sl, tl) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error();
  const data = await res.json();
  return data[0].map(i => i[0]).join('');
}

/* ── Phonetics Generator ─────────────────────────────────── */
function genPhonetics(en) {
  if (!en) return '';
  const map = {
    'hello':'เฮลโล','welcome':'เวลคัม','to':'ทู','our':'เอาเออร์','hospital':'ฮอสพิเทิล',
    'how':'เฮา','can':'แคน','i':'ไอ','help':'เฮลป์','you':'ยู','today':'ทูเดย์',
    'please':'พลีส','wait':'เวท','here':'เฮียร์','for':'ฟอร์','a':'อะ','moment':'โมเมินท์',
    'good':'กุด','morning':'มอร์นิ่ง','are':'อาร์','feeling':'ฟีลิ่ง','better':'เบ็ตเตอร์',
    'now':'เนา','do':'ดู','have':'แฮฟ','any':'เอนี','allergies':'อะเลอร์จีส',
    'take':'เทค','this':'ดิส','medicine':'เมดิซิน','twice':'ทไวส์','day':'เดย์',
    'see':'ซี','your':'ยอร์','passport':'พาสปอร์ท','or':'ออร์','id':'ไอดี','card':'การ์ด',
    'relax':'รีแล็กส์','hurt':'เฮิร์ท','much':'มัช','go':'โก','straight':'สเตรท',
    'ahead':'อะเฮด','and':'แอนด์','turn':'เทิร์น','left':'เลฟท์','right':'ไรท์',
    'the':'เดอะ','pharmacy':'ฟาร์มาซี','is':'อิซ','on':'ออน','first':'เฟิร์สท์','floor':'ฟลอร์',
    'elevator':'เอลิเวเตอร์','at':'แอท','end':'เอนด์','of':'ออฟ','corridor':'คอริดอร์',
    'restroom':'เรสรูม','around':'อะราวนด์','corner':'คอร์เนอร์','may':'เมย์',
    'full':'ฟูล','name':'เนม','appointment':'อะพอยต์เมินท์','fill':'ฟิล','in':'อิน',
    'form':'ฟอร์ม','an':'แอน','follow':'ฟอลโล','me':'มี','sorry':'ซอร์รี่','delay':'ดีเลย์',
    'check':'เช็ก','up':'อัพ','blood':'บลัด','pressure':'เพรชเชอร์','weight':'เวท',
    'height':'เฮท','nurse':'เนิร์ส','will':'วิล','call':'คอล','soon':'ซูน',
    'screen':'สกรีน','show':'โชว์','queue':'คิว','number':'นัมเบอร์','doctor':'ด็อกเตอร์',
    'shortly':'ชอร์ทลี','could':'คุด','repeat':'รีพีท','that':'แดท','what':'วอท',
    'phone':'โฟน','when':'เวน','did':'ดิด','symptoms':'ซิมทัมส์','start':'สตาร์ท',
    'where':'แวร์','does':'ดัซ','it':'อิท','severe':'ซีเวียร์','pain':'เปน',
    'scale':'สเกล','ten':'เทน','fever':'ฟีเวอร์','currently':'เคอร์เรินท์ลี',
    'taking':'เทคคิ่ง','medication':'เมดิเคชัน','chronic':'โครนิก','diseases':'ดิซีซิส',
    'eaten':'อีทเทิน','smoke':'สโมค','drink':'ดริ้งค์','alcohol':'แอลกอฮอล',
    'sign':'ไซน์','we':'วี','need':'นีด','vital':'ไวทัล','signs':'ไซนส์',
    'lie':'ไลย์','down':'ดาวน์','sit':'ซิท','still':'สทิล','roll':'โรล',
    'sleeve':'สลีฟ','deep':'ดีพ','breath':'เบรธ','move':'มูฟ','not':'นอท',
    'going':'โกอิ่ง','uncomfortable':'อันคัมฟอร์ทาเบิล','little':'ลิทเทิล',
    'tell':'เทล','if':'อิฟ','dizzy':'ดิซซี่','test':'เทสท์','results':'รีซัลทส์',
    'worse':'เวิร์ส','return':'รีเทิร์น','immediately':'อิมมีเดียทลี','questions':'เควสชันส์',
    'contact':'คอนแทคท์','cashier':'แคชเชียร์','register':'เรจิสเตอร์','medical':'เมดิเคิล',
    'records':'เรคคอร์ดส','room':'รูม','laboratory':'แล็บโบระทอรี','x-ray':'เอกซ์เรย์',
    'pediatrics':'พีเดียทริกส์','building':'บิลดิ้ง','give':'กิฟ','injection':'อินเจคชัน',
    'cotton':'คอททัน','press':'เพรส','gently':'เจนทลี','with':'วิธ','after':'อาฟเตอร์',
    'meals':'มีลส์','might':'ไมท์','feel':'ฟีล','am':'แอม','service':'เซอร์วิส',
    'bed':'เบด','up':'อัพ','outpatient':'เอาพาเชินท์','department':'ดีพาร์ทเมินท์',
    'main':'เมน','entrance':'เอ็นทรานซ์','emergency':'อิเมอร์เจนซี','stairs':'สแตร์ส',
    'second':'เซคเคินด์','third':'เทิร์ด','fourth':'โฟร์ท','parking':'พาร์กิ้ง','lot':'ลอท',
    'behind':'บีไฮนด์','shuttle':'ชัทเทิล','bus':'บัส','from':'ฟรอม','can':'แคน',
    'ready':'เรดี','minutes':'มินิทส์','thirty':'เทิร์ที','eat':'อีท','anything':'เอนีธิ่ง',
    'hours':'เอาเออร์ส','before':'บีโฟร์','procedure':'โพรซีเจอร์','get':'เกท',
    'back':'แบค','come':'คัม','been':'บีน'
  };
  return en.toLowerCase().split(/\s+/).map(w => {
    const c = w.replace(/[.,!?;:'"]/g, '');
    return map[c] || c;
  }).join(' ');
}

/* ── Context Analyzer ────────────────────────────────────── */
function analyzeCtx(th, en) {
  const rules = [
    { rx:/สวัสดี|ยินดี|ต้อนรับ|welcome|greet|morning|good morning/i, en:'Greeting and welcoming patients', th:'ใช้เมื่อต้อนรับและทักทายผู้ป่วย' },
    { rx:/ชื่อ|นาม|name|identity|passport|id card/i, en:'Collecting patient information and identity', th:'ใช้เก็บข้อมูลส่วนตัวหรือยืนยันตัวตนผู้ป่วย' },
    { rx:/นัด|appointment/i, en:'Checking appointment status', th:'ใช้ตรวจสอบการนัดหมาย' },
    { rx:/ปวด|เจ็บ|pain|hurt|symptom|ache|อาการ/i, en:'Assessing patient symptoms and pain', th:'ใช้สอบถามอาการและระดับความเจ็บปวด' },
    { rx:/ยา|medicine|medication|injection|ฉีด/i, en:'Providing medication or injection instructions', th:'ใช้อธิบายการให้ยาหรือการฉีดยา' },
    { rx:/ทาง|direction|floor|ชั้น|ห้อง|ลิฟต์|elevator|stair/i, en:'Giving directions within the hospital', th:'ใช้บอกทิศทางหรือสถานที่ภายในโรงพยาบาล' },
    { rx:/แพ้|allergy|allergic/i, en:'Screening for drug or food allergies', th:'ใช้คัดกรองการแพ้ยาหรืออาหาร' },
    { rx:/นอน|นิ่ง|lie|sit|still|move|ลง|ผ่อน/i, en:'Positioning or calming patient for examination', th:'ใช้จัดท่าหรือช่วยให้ผู้ป่วยผ่อนคลายก่อนตรวจ' },
    { rx:/รอ|wait|result|ผล/i, en:'Asking patient to wait for results or service', th:'ใช้ขอให้ผู้ป่วยรอผลการตรวจหรือบริการ' },
    { rx:/ไข้|fever|temperature/i, en:'Checking body temperature or fever', th:'ใช้ตรวจสอบอาการมีไข้' },
    { rx:/เลือด|blood|เจาะ|draw|กด|press|สำลี|cotton/i, en:'Instructions after blood draw or injection', th:'ใช้หลังการเจาะเลือดหรือฉีดยา' },
    { rx:/กิน|อาหาร|eat|food|drink|งด|fast/i, en:'Dietary or fasting instructions', th:'ใช้แนะนำเรื่องอาหารหรือการงดอาหาร' },
  ];
  for (const r of rules) {
    if (r.rx.test(th) || r.rx.test(en)) return { en: r.en, th: r.th };
  }
  return { en: 'General medical communication', th: 'ใช้ในการสื่อสารทั่วไปทางการแพทย์' };
}

/* ── Practice ─────────────────────────────────────────────── */
function renderPracticeSelect() {
  const sel = document.getElementById('practiceSelect');
  if (!sel) return;
  sel.innerHTML = '<option value="">— เลือกประโยคที่ต้องการฝึก —</option>';
  scenarios.forEach(s => {
    if (!s.phrases.length) return;
    const og = document.createElement('optgroup');
    og.label = s.icon + ' ' + s.labelEn + ' · ' + s.labelTh;
    s.phrases.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.en;
      opt.textContent = p.en.length > 60 ? p.en.slice(0, 60) + '…' : p.en;
      opt.dataset.ph = JSON.stringify({ phonetic_en: p.phonetic_en || '' });
      og.appendChild(opt);
    });
    sel.appendChild(og);
  });
  if (practiceTarget) sel.value = practiceTarget;
}

function onPracticeSelectChange() {
  const sel = document.getElementById('practiceSelect');
  const val = sel.value;
  if (!val) {
    practiceTarget = '';
    document.getElementById('targetBox').style.display = 'none';
    document.getElementById('scoreBox').style.display = 'none';
    document.getElementById('recResult').style.display = 'none';
    document.getElementById('recPlaceholder').style.display = '';
    return;
  }
  practiceTarget = val;
  let foundPhrase = null;
  for (const s of scenarios) {
    const p = s.phrases.find(p => p.en === val);
    if (p) { foundPhrase = p; break; }
  }
  document.getElementById('targetBox').style.display = 'flex';
  document.getElementById('targetText').textContent = val;
  const pe = document.getElementById('targetPhonetic');
  if (foundPhrase && foundPhrase.phonetic_en) {
    pe.textContent = '🔤 ' + foundPhrase.phonetic_en;
    pe.style.display = 'block';
  } else { pe.style.display = 'none'; }
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('recResult').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = '';
}

function goToPractice() {
  const s = currentScenario();
  if (s.phrases.length) {
    practiceTarget = s.phrases[0].en;
    const sel = document.getElementById('practiceSelect');
    if (sel) sel.value = practiceTarget;
    onPracticeSelectChange();
  }
  switchTab('practice', document.querySelector('[data-tab="practice"]'));
}
function playPracticeAudio() { if (practiceTarget) speakText(practiceTarget, 'en'); }

/* ── Recording ────────────────────────────────────────────── */
function toggleRecording() {
  if (!practiceTarget) {
    alert('กรุณาเลือกประโยคที่ต้องการฝึกก่อนค่ะ');
    return;
  }
  if (isRecording) { recRef && recRef.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showRecResult('Browser ไม่รองรับ กรุณาใช้ Chrome'); return; }
  const rec = new SR(); rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = false; recRef = rec;
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

/* ── Score + Word Analysis ────────────────────────────────── */
function showScore(spoken) {
  const pct = calcScore(spoken, practiceTarget);
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
  buildWordAnalysis(spoken, practiceTarget);
}

function buildWordAnalysis(spoken, target) {
  const wa = document.getElementById('wordAnalysis');
  if (!target) { wa.innerHTML = ''; return; }
  const tw = target.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean);
  const sw = spoken.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean);
  const results = tw.map(t => {
    let best = 0;
    sw.forEach(s => { const sc = wordSim(s, t); if (sc > best) best = sc; });
    return { word: t, correct: best >= 0.8 };
  });
  const wrong = results.filter(r => !r.correct);
  let html = `<div class="word-analysis-title"><i class="fas fa-spell-check"></i> วิเคราะห์รายคำ (กดคำเพื่อฟัง):</div>`;
  html += `<div class="word-tokens">${results.map(r =>
    `<div class="word-token ${r.correct ? 'correct' : 'wrong'}" onclick="speakText('${ea(r.word)}','en')">
      ${esc(r.word)}<span class="token-hint">${r.correct ? '✓' : '✗'}</span>
    </div>`).join('')}</div>`;
  if (wrong.length > 0) {
    html += `<div class="wrong-tips">`;
    wrong.slice(0, 4).forEach(r => {
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
  const sw = spoken.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean);
  const tw = target.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean);
  if (!tw.length) return 85;
  let m = 0;
  tw.forEach(t => { let b = 0; sw.forEach(s => { const sc = wordSim(s, t); if (sc > b) b = sc; }); m += b; });
  return Math.min(100, Math.max(0, Math.round((m / tw.length) * 100 + (Math.random() * 4 - 2))));
}
function wordSim(a, b) {
  const long = a.length >= b.length ? a : b, short = a.length >= b.length ? b : a;
  if (!long.length) return 1;
  return (long.length - editDist(long, short)) / long.length;
}
function editDist(s1, s2) {
  const c = [];
  for (let i = 0; i <= s1.length; i++) {
    let last = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) { c[j] = j; continue; }
      if (j > 0) { let nv = c[j - 1]; if (s1[i - 1] !== s2[j - 1]) nv = Math.min(nv, last, c[j]) + 1; c[j - 1] = last; last = nv; }
    }
    if (i > 0) c[s2.length] = last;
  }
  return c[s2.length];
}

/* ── Chat (Smart AI Role Play) ───────────────────────────── */
function initChat() {
  chatHistory = [];
  const box = document.getElementById('chatBox');
  box.innerHTML = `
    <div class="msg ai">
      <div class="msg-avatar"><i class="fas fa-robot"></i></div>
      <div class="msg-content">
        <div class="msg-bubble">Hello, excuse me. I'm not feeling well. Can you help me please?</div>
        <div class="msg-hint">สวัสดีค่ะ ขอโทษนะคะ ฉันไม่ค่อยสบาย คุณช่วยฉันได้ไหมคะ?</div>
        <button class="msg-listen" onclick="speakText('Hello, excuse me. I\\'m not feeling well. Can you help me please?','en')">▶ ฟัง</button>
      </div>
    </div>`;
}

function resetChat() {
  chatHistory = [];
  initChat();
}

/* Smart AI — pattern rules with context tracking */
const aiPatterns = [
  {
    keys: /help|hello|hi\b|สวัสดี|ช่วย|excuse me|good (morning|afternoon|evening)/i,
    replies: [
      { en: "Oh, thank goodness. I've been having a terrible stomachache since last night. The pain is really bad.", th: "โอ้โห ขอบคุณมากเลยค่ะ ฉันปวดท้องมากตั้งแต่เมื่อคืนค่ะ ปวดมากจริงๆ" },
      { en: "Thank you so much for coming. I have a very bad headache and feel dizzy. I'm a tourist and I don't know what to do.", th: "ขอบคุณที่มาช่วยค่ะ ฉันปวดหัวและเวียนหัวมากค่ะ ฉันเป็นนักท่องเที่ยวและไม่รู้จะทำอย่างไรค่ะ" }
    ]
  },
  {
    keys: /your name|ชื่อ|who are you|name is/i,
    replies: [
      { en: "My name is Sarah Mitchell. I'm from the United Kingdom. I'm here on holiday and suddenly feel very unwell.", th: "ชื่อเซาร์ร่า มิทเชลล์ค่ะ มาจากสหราชอาณาจักรค่ะ มาท่องเที่ยวแล้วรู้สึกไม่สบายกะทันหันค่ะ" },
      { en: "I'm James Brown, from Australia. My passport number is AB123456 if you need it.", th: "ฉันชื่อเจมส์ บราวน์ค่ะ มาจากออสเตรเลียค่ะ หมายเลขพาสปอร์ต AB123456 ถ้าต้องการค่ะ" }
    ]
  },
  {
    keys: /where.*hurt|hurt|pain|ปวด|เจ็บ|which part|ตรงไหน|where does|ไหน/i,
    replies: [
      { en: "It hurts right here — in my lower abdomen, on the right side. The pain started about 4 hours ago and it keeps getting worse. It's sharp, like a stabbing feeling.", th: "เจ็บตรงนี้เลยค่ะ ท้องน้อยด้านขวาค่ะ อาการเริ่มมาประมาณ 4 ชั่วโมงแล้ว และเจ็บมากขึ้นเรื่อยๆ ปวดแบบเสียดมากค่ะ" },
      { en: "It's my stomach, here in the middle. Also my chest feels tight and I find it hard to breathe sometimes.", th: "ปวดบริเวณท้องตรงกลางค่ะ แล้วก็รู้สึกแน่นหน้าอกด้วย หายใจได้ไม่สะดวกบางครั้งค่ะ" }
    ]
  },
  {
    keys: /how.*pain|pain.*scale|1 to 10|score|severe|มากแค่ไหน|คะแนน/i,
    replies: [
      { en: "I would say it's about a 7 out of 10. It's quite bad. I tried to rest and drink water but it didn't help at all.", th: "ประมาณ 7 จาก 10 ค่ะ ปวดมากทีเดียวค่ะ พยายามนอนพักและดื่มน้ำแล้วแต่ไม่ดีขึ้นเลยค่ะ" },
      { en: "Honestly it's an 8. I've never felt pain like this before. It started as a dull ache and got much worse.", th: "จริงๆ แล้วประมาณ 8 ค่ะ ไม่เคยปวดแบบนี้มาก่อนเลยค่ะ เริ่มจากปวดตื้อๆ แล้วก็แย่ลงมากค่ะ" }
    ]
  },
  {
    keys: /symptom|feel|better|worse|อาการ|รู้สึก|ดีขึ้น|แย่ลง|nausea|vomit|คลื่นไส้|อาเจียน/i,
    replies: [
      { en: "No, not better at all. I also feel nauseous and I vomited once about an hour ago. I can't eat anything right now.", th: "ไม่ดีขึ้นเลยค่ะ ยังคลื่นไส้อยู่ด้วย และอาเจียนครั้งนึงเมื่อชั่วโมงที่แล้วค่ะ ตอนนี้กินอะไรไม่ได้เลยค่ะ" },
      { en: "I feel a bit dizzy and my whole body aches. I also have a slight fever, I think. I feel very hot.", th: "รู้สึกเวียนหัวนิดหน่อยและปวดเมื่อยทั้งตัวค่ะ คิดว่ามีไข้เล็กน้อยด้วย รู้สึกร้อนมากค่ะ" }
    ]
  },
  {
    keys: /medication|medicine|drug|ยา|ทาน|กิน|taking|currently|presently/i,
    replies: [
      { en: "Yes, I take amlodipine 5mg every morning for my blood pressure. I also took two paracetamol about two hours ago for the pain but it didn't help.", th: "ค่ะ ฉันทานแอมโลดิพีน 5mg ทุกเช้าสำหรับความดันโลหิตค่ะ แล้วก็ทานพาราเซตามอล 2 เม็ดเมื่อ 2 ชั่วโมงที่แล้วแต่ไม่ดีขึ้นค่ะ" },
      { en: "I'm not taking any regular medication. I'm generally healthy. I just took some ibuprofen this morning but it hasn't helped much.", th: "ฉันไม่ได้ทานยาประจำค่ะ สุขภาพดีโดยปกติค่ะ ทานไอบูโพรเฟนเมื่อเช้าแต่ไม่ค่อยได้ผลค่ะ" }
    ]
  },
  {
    keys: /allergy|allergic|แพ้/i,
    replies: [
      { en: "Yes! I'm very allergic to penicillin. I had a severe anaphylactic reaction to it 10 years ago. Please put that in my record.", th: "ค่ะ ฉันแพ้เพนิซิลินมากค่ะ เคยเกิดปฏิกิริยารุนแรงมากเมื่อ 10 ปีที่แล้วค่ะ กรุณาบันทึกไว้ด้วยนะคะ" },
      { en: "As far as I know, I'm not allergic to any medication. But I'm allergic to shellfish, if that matters.", th: "เท่าที่ทราบไม่แพ้ยาอะไรค่ะ แต่แพ้อาหารทะเลประเภทกุ้งหอยค่ะ ถ้าสำคัญนะคะ" }
    ]
  },
  {
    keys: /appointment|นัด|walk.?in|come today/i,
    replies: [
      { en: "No, I don't have an appointment. I'm a walk-in patient. I wasn't planning to visit a hospital today but the pain became too much.", th: "ไม่มีนัดค่ะ มาแบบ walk-in ค่ะ ไม่ได้วางแผนจะมาโรงพยาบาลแต่ปวดมากจนทนไม่ไหวค่ะ" }
    ]
  },
  {
    keys: /fever|temperature|ไข้|ร้อน|hot|cold/i,
    replies: [
      { en: "Yes, I think I have a fever. I feel alternately hot and cold and I've been sweating a lot since this morning.", th: "ค่ะ คิดว่ามีไข้ค่ะ รู้สึกร้อนๆ หนาวๆ สลับกันและเหงื่อออกมากตั้งแต่เช้าค่ะ" },
      { en: "I'm not sure. I feel very hot but I don't have a thermometer to check. Can you check my temperature please?", th: "ไม่แน่ใจค่ะ รู้สึกร้อนมากแต่ไม่มีเทอร์โมมิเตอร์วัด คุณช่วยวัดอุณหภูมิให้หน่อยได้ไหมคะ?" }
    ]
  },
  {
    keys: /lie down|sit|roll|sleeve|breath|relax|นอน|นั่ง|พับแขน|หายใจ|ผ่อน|still|move/i,
    replies: [
      { en: "Of course, I'll do whatever you need. Should I remove my jacket first? Is this okay like this?", th: "ได้ค่ะ จะทำตามที่บอกทุกอย่างค่ะ ต้องถอดแจ็กเก็ตก่อนไหมคะ? แบบนี้โอเคไหมคะ?" },
      { en: "Okay. Oh — I'm a little nervous. Please tell me what you're going to do step by step.", th: "โอเคค่ะ โอ้ — หนูตื่นเต้นนิดหน่อยค่ะ ช่วยบอกด้วยว่าจะทำอะไรทีละขั้นตอนนะคะ" }
    ]
  },
  {
    keys: /inject|ฉีด|needle|prick|blood draw|เจาะ/i,
    replies: [
      { en: "Oh, I'm a bit scared of needles actually. Will it hurt a lot? I'll try to stay still.", th: "โอ้ จริงๆ แล้วฉันกลัวเข็มนิดหน่อยค่ะ จะเจ็บมากไหมคะ? จะพยายามนิ่งนะคะ" }
    ]
  },
  {
    keys: /restroom|toilet|bathroom|ห้องน้ำ/i,
    replies: [
      { en: "Oh yes, could you show me the way to the restroom? I feel quite nauseous and I might need to go urgently.", th: "โอ้ได้เลยค่ะ ช่วยบอกทางไปห้องน้ำด้วยได้ไหมคะ? รู้สึกคลื่นไส้มากและอาจต้องรีบไปค่ะ" }
    ]
  },
  {
    keys: /insurance|ประกัน/i,
    replies: [
      { en: "Yes, I have travel insurance through my bank. The policy number is TI-789456. I also have the emergency contact number for the insurer.", th: "ค่ะ มีประกันการเดินทางผ่านธนาคารค่ะ หมายเลขกรมธรรม์ TI-789456 ค่ะ มีเบอร์ติดต่อฉุกเฉินของบริษัทประกันด้วยค่ะ" }
    ]
  },
  {
    keys: /dizzy|เวียน|light.?headed|faint|หน้ามืด/i,
    replies: [
      { en: "Yes, I feel dizzy when I stand up quickly. I've been sitting down mostly. Should I lie down?", th: "ค่ะ เวียนหัวตอนลุกเร็วค่ะ นั่งอยู่ส่วนมากค่ะ ควรนอนลงไหมคะ?" }
    ]
  },
  {
    keys: /result|ผล|how long|wait|รอ|นาน/i,
    replies: [
      { en: "Okay, I'll wait. Is there somewhere comfortable I can sit? I still feel quite unwell and a little weak.", th: "โอเคค่ะ จะรอค่ะ มีที่นั่งสบายๆ ไหมคะ? ยังรู้สึกไม่ดีและอ่อนเพลียอยู่นิดหน่อยค่ะ" }
    ]
  },
  {
    keys: /thank|ขอบคุณ|okay|understand|เข้าใจ|alright|got it/i,
    replies: [
      { en: "Thank you so much for explaining. You've been very helpful and patient with me. I really appreciate your kindness.", th: "ขอบคุณมากที่อธิบายค่ะ คุณช่วยเหลือได้ดีมากและอดทนกับฉันค่ะ ขอบคุณสำหรับความใจดีจริงๆ ค่ะ" },
      { en: "I understand. Thank you. One more question — can my friend come in with me? She speaks a little Thai.", th: "เข้าใจค่ะ ขอบคุณค่ะ ขอถามอีกอย่างนะคะ เพื่อนฉันสามารถเข้ามาด้วยได้ไหมคะ? เธอพูดภาษาไทยได้นิดหน่อยค่ะ" }
    ]
  },
  {
    keys: /question|ask|สงสัย|ถาม/i,
    replies: [
      { en: "Yes, I want to know — will the doctor speak English? And how long will the whole process take? I have a flight tonight.", th: "ค่ะ อยากทราบว่าหมอพูดภาษาอังกฤษได้ไหมคะ? แล้วกระบวนการทั้งหมดจะใช้เวลานานเท่าไรคะ? มีเที่ยวบินคืนนี้ค่ะ" }
    ]
  }
];

function getAIReply(text) {
  for (const p of aiPatterns) {
    if (p.keys.test(text)) {
      const replies = p.replies;
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
  /* Context-aware fallbacks based on chat history */
  const allText = chatHistory.join(' ').toLowerCase();
  if (allText.includes('pain') || allText.includes('hurt')) {
    const follow = [
      { en: "The pain is still the same. It hasn't gotten any better. What will happen next?", th: "อาการยังเหมือนเดิมค่ะ ไม่ดีขึ้นเลยค่ะ ขั้นต่อไปจะทำอะไรคะ?" },
      { en: "Could you ask the doctor to come quickly? I'm really not feeling well at all.", th: "ช่วยเรียกหมอให้เร็วขึ้นได้ไหมคะ? ฉันรู้สึกไม่ดีมากเลยค่ะ" }
    ];
    return follow[Math.floor(Math.random() * follow.length)];
  }
  const defaults = [
    { en: "I'm sorry, I didn't quite understand that. Could you speak a little slower? My Thai isn't very good.", th: "ขอโทษนะคะ ฉันไม่ค่อยเข้าใจค่ะ ช่วยพูดช้าลงนิดได้ไหมคะ? ภาษาไทยฉันไม่ค่อยดีค่ะ" },
    { en: "Excuse me? Could you repeat that please? I want to make sure I understand correctly.", th: "ขอโทษนะคะ ช่วยพูดซ้ำได้ไหมคะ? อยากให้แน่ใจว่าเข้าใจถูกต้องค่ะ" },
    { en: "I'm still feeling quite unwell. Is there anything else I need to do right now?", th: "ฉันยังรู้สึกไม่สบายอยู่ค่ะ มีอะไรอีกไหมที่ต้องทำตอนนี้คะ?" }
  ];
  return defaults[Math.floor(Math.random() * defaults.length)];
}

function sendChat() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  chatHistory.push(text);
  appendMsg('user', text);
  const typId = appendTyping();
  setTimeout(() => {
    removeTyping(typId);
    const reply = getAIReply(text);
    appendMsg('ai', reply.en, reply.th);
    speakText(reply.en, 'en');
  }, 700 + Math.random() * 600);
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
async function doTranslate(text) {
  try {
    const r = await gTranslate(text, document.getElementById('fromLang').value, document.getElementById('toLang').value);
    setTransOutput(r);
  } catch { setTransOutput('', '[ไม่สามารถเชื่อมต่อได้]'); }
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
        <div class="q-en">${esc(p.en)}</div>
        ${p.phonetic_en ? `<div class="q-phonetic-en">🔤 ${esc(p.phonetic_en)}</div>` : ''}
        <div class="q-th">🇹🇭 ${esc(p.th)}</div>
        <div class="q-zh">🇨🇳 ${esc(p.zh)}</div>
        ${p.phonetic_zh ? `<div class="q-phonetic-zh">🔤 ${esc(p.phonetic_zh)}</div>` : ''}
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
  function doSpeak() {
    const utt = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const targets = {
      'th': ['th-TH', 'th'], 'en': ['en-US', 'en-GB', 'en-AU', 'en'],
      'zh': ['zh-CN', 'zh-TW', 'zh'], 'zh-CN': ['zh-CN', 'zh-TW', 'zh'], 'zh-TW': ['zh-TW', 'zh-CN', 'zh']
    }[lang] || ['en-US'];
    const voice = voices.find(v => targets.some(t => v.lang.startsWith(t)));
    if (voice) utt.voice = voice;
    utt.lang = targets[0]; utt.rate = 0.85; utt.pitch = 1.0; utt.volume = 1.0;
    synth.speak(utt);
  }
  const voices = synth.getVoices();
  if (voices.length > 0) { setTimeout(doSpeak, 60); }
  else {
    const prev = synth.onvoiceschanged;
    synth.onvoiceschanged = function () { synth.onvoiceschanged = prev; setTimeout(doSpeak, 60); };
    setTimeout(doSpeak, 600);
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
