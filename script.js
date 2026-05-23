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
      { id:'g4', en:'Good morning! How are you feeling today?', th:'สวัสดีตอนเช้าค่ะ วันนี้รู้สึกเป็นอย่างไรบ้างคะ?', zh:'早上好！今天感觉怎么样？', phonetic_en:'กุด มอร์นิ่ง เฮา อาร์ ยู ฟีลิ่ง ทูเดย์', phonetic_zh:'จ้าวเซิ่งฮ่าว จิ่นเทียน เกินจวี่ เจ่นมะยาง', context:'Morning greeting when visiting a patient in the word', contextTh:'ใช้ทักทายตอนเช้าเมื่อเยี่ยมผู้ป่วยในหอผู้ป่วย' },
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
      { id:'r20', en:'We need to check your vital signs first.', th:'เราต้องตรวจสัญญาณชีพก่อนนะคะ', zh:'我们需要先检查您的生命体征。', phonetic_en:'วี นีด ทู เช็ก ยอร์ ไวทัล ไซน์ส เฟิร์สท์', phonetic_zh:'โว่ เหมิน ซือ่ เยี่ยว เซียน เจียนฉา หนิน ตี่ เซิงมิ่ง ตี่เจิง', context:'Informing patient about vital sign check before seeing doctor', contextTh:'ใช้แจ้งผู้ป่วยว่าต้องตรวจสัญญาณชีพก่อนพบแพทย์' }
    ]
  },
  {
    id: 'direction', labelEn: 'Direction', labelTh: 'การบอกทาง', icon: '🗺️',
    phrases: [
      { id:'d1', en:'Please register at the Medical Records Room, Number 19, 1st floor, Chalerm Phra Baramee Building.', th:'ลงทะเบียนที่ห้องเวชระเบียน หมายเลข 19 ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'请在 Chalerm Phra Baramee 大楼一楼19号病历室登记。', phonetic_en:'พลีส เรจิสเตอร์ แอท เดอะ เมดิเคิล เรคคอร์ดส รูม นัมเบอร์ ไนน์ทีน เฟิร์สท์ ฟลอร์ เฉลิมพระบารมี บิลดิ้ง', phonetic_zh:'ชิ่ง ไจ่ Chalerm Phra Baramee ต้าโหลว อี้หลาว ซือ่จิ่ว เฮ่า ปิ้งลี่ซือ่ เติงจี้', context:'Directing to registration', contextTh:'บอกทางไปลงทะเบียน' },
      { id:'d2', en:'Please contact customer service centre, 1st floor, Chalerm Phra Baramee Building.', th:'กรุณาติดต่อ customer service centre ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'请联系 Chalerm Phra Baramee 大楼一楼的客户服务中心。', phonetic_en:'พลีส คอนแทค คัสตอมเมอร์ เซอร์วิส เซนเทอร์ เฟิร์สท์ ฟลอร์ เฉลิมพระบารมี บิลดิ้ง', phonetic_zh:'ชิ่ง เหลียนซี่ Chalerm Phra Baramee ต้าโหลว อี้หลาว ตี่ เค้าฮู้ ฝูอู้ จงซิน', context:'Directing to customer service', contextTh:'บอกทางไปศูนย์บริการลูกค้า' },
      { id:'d3', en:'Please contact cashier number 1 on the first floor of Sujinno Building.', th:'กรุณาติดต่อแคชเชียร์หมายเลข 1 ชั้น 1 อาคารสุจิณโณค่ะ', zh:'请联系 Sujinno 大楼一楼的1号收费处。', phonetic_en:'พลีส คอนแทค แคชเชียร์ นัมเบอร์ วัน ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ สุจิณโณ บิลดิ้ง', phonetic_zh:'ชิ่ง เหลียนซี่ Sujinno ต้าโหลว อี้หลาว ตี่ อีเฮ่า โซ่วเฟ่ยชู่', context:'Directing to cashier at Sujinno', contextTh:'บอกทางไปแคชเชียร์อาคารสุจิณโณ' },
      { id:'d4', en:'Please contact cashier number 2 on the first floor of Chalerm Phra Baramee Building.', th:'กรุณาติดต่อแคชเชียร์หมายเลข 2 ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'请联系 Chalerm Phra Baramee 大楼一楼的2号收费处。', phonetic_en:'พลีส คอนแทค แคชเชียร์ นัมเบอร์ ทู ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ เฉลิมพระบารมี บิลดิ้ง', phonetic_zh:'ชิ่ง เหลียนซี่ Chalerm Phra Baramee ต้าโหลว อี้หลาว ตี่ เอ้อร์เฮ่า โซ่วเฟ่ยชู่', context:'Directing to cashier at Chalerm Phra Baramee', contextTh:'บอกทางไปแคชเชียร์อาคารเฉลิมพระบารมี' },
      { id:'d5', en:'Please contact cashier number 3 on the first floor of Sriphat Building.', th:'กรุณาติดต่อแคชเชียร์หมายเลข 3 ชั้น 1 อาคารศรีพัฒน์ค่ะ', zh:'请联系 Sriphat 大楼一楼的3号收费处。', phonetic_en:'พลีส คอนแทค แคชเชียร์ นัมเบอร์ ทรี ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ ศรีพัฒน์ บิลดิ้ง', phonetic_zh:'ชิ่ง เหลียนซี่ Sriphat ต้าโหลว อี้หลาว ตี่ ซานเฮ่า โซ่วเฟ่ยชู่', context:'Directing to cashier at Sriphat', contextTh:'บอกทางไปแคชเชียร์อาคารศรีพัฒน์' },
      { id:'d6', en:'The laboratory room number 11 is on the first floor of Chalerm Phra Baramee Building.', th:'ห้องปฏิบัติการหมายเลข 11 อยู่ที่ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'11号化验室在 Chalerm Phra Baramee 大楼一楼。', phonetic_en:'เดอะ แล็บโบระทอรี รูม นัมเบอร์ อิเลฟเวิน อิซ ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ เฉลิมพระบารมี บิลดิ้ง', phonetic_zh:'ซือ่อีเฮ่า ฮวาเยี่ยนซือ่ ไจ่ Chalerm Phra Baramee ต้าโหลว อี้หลาว', context:'Directing to lab', contextTh:'บอกทางไปห้องแล็บ' },
      { id:'d7', en:'X-ray is at room number 33 on the first floor of Boonsom Martin Building.', th:'เอกซ์เรย์ที่ห้องหมายเลข 33 ชั้น 1 อาคารบุญสม มาร์ตินค่ะ', zh:'X光室在 Boonsom Martin 大楼一楼33号房。', phonetic_en:'เอกซ์เรย์ อิซ แอท รูม นัมเบอร์ เทอร์ตี้ ทรี ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ บุญสม มาร์ติน บิลดิ้ง', phonetic_zh:'เอกซ์กวาง ไจ่ Boonsom Martin ต้าโหลว อี้หลาว ซานซือ่ซาน เฮ่าฝาง', context:'Directing to X-ray', contextTh:'บอกทางไปห้องเอกซ์เรย์' },
      { id:'d8', en:'Please contact for EKG at room number 110 on the first floor of Boonsom Martin Building.', th:'ติดต่อตรวจคลื่นไฟฟ้าหัวใจที่ห้องหมายเลข 110 ชั้น 1 อาคารบุญสม มาร์ตินค่ะ', zh:'请到 Boonsom Martin 大楼一楼110号房做心电图检查。', phonetic_en:'พลีส คอนแทค ฟอร์ อีเคจี แอท รูม นัมเบอร์ วัน ฮันเดรด แอนด์ เท็น ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ บุญสม มาร์ติน บิลดิ้ง', phonetic_zh:'ชิ่ง ต้าว Boonsom Martin ต้าโหลว อี้หลาว อี้ไป๋อี่ซือ่ เฮ่าฝาง จ้วว ซินเตียนถู เจียนฉา', context:'Directing to EKG', contextTh:'บอกทางไปตรวจคลื่นไฟฟ้าหัวใจ' },
      { id:'d9', en:'Collect appointment slips for special tests on the second floor of Sriphat Building.', th:'รับใบนัดตรวจพิเศษต่างๆ ที่ชั้น 2 อาคารศรีพัฒน์ค่ะ', zh:'请在 Sriphat 大楼二楼领取的特殊检查預約單。', phonetic_en:'คอลเลคท์ อะพอยต์เมินท์ สลิปส์ ฟอร์ สเปเชิล เทสท์ส ออน เดอะ เซคเคินด์ ฟลอร์ ออฟ ศรีพัฒน์ บิลดิ้ง', phonetic_zh:'ชิ่ง ไจ่ Sriphat ต้าโหลว เอ้อร์หลาว หลิ่งจวี่ เตอ เท่อซู เจียนฉา ยววเยว่ ตัน', context:'Directing to special test appointments', contextTh:'บอกทางไปรับใบนัดตรวจพิเศษ' },
      { id:'d10', en:'The pharmacy number 30 is on the first floor of Chalerm Phra Baramee Building.', th:'ห้องยาหมายเลข 30 อยู่ที่ชั้น 1 อาคารเฉลิมพระบารมีค่ะ', zh:'30号药房在 Chalerm Phra Baramee 大楼一楼。', phonetic_en:'เดอะ ฟาร์มาซี นัมเบอร์ เทอร์ตี้ อิซ ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ เฉลิมพระบารมี บิลดิ้ง', phonetic_zh:'ซานซือ่เฮ่า เอี่ยวฝาง ไจ่ Chalerm Phra Baramee ต้าโหลว อี้หลาว', context:'Directing to pharmacy 30', contextTh:'บอกทางไปห้องยา 30' },
      { id:'d11', en:'The pharmacy number 16 is on the first floor of Sriphat Building.', th:'ห้องยาหมายเลข 16 อยู่ที่ชั้น 1 อาคารศรีพัฒน์ค่ะ', zh:'16号药房在 Sriphat 大楼一楼。', phonetic_en:'เดอะ ฟาร์มาซี นัมเบอร์ ซิกซ์ทีน อิซ ออน เดอะ เฟิร์สท์ ฟลอร์ ออฟ ศรีพัฒน์ บิลดิ้ง', phonetic_zh:'ซือ่ลิ่วเฮ่า เอี่ยวฝาง ไจ่ Sriphat ต้าโหลว อี้หลาว', context:'Directing to pharmacy 16', contextTh:'บอกทางไปห้องยา 16' },
      { id:'d12', en:'The pediatrics pharmacy is on the sixth floor of Sriphat Building.', th:'ห้องยากุมารเวชกรรมอยู่ที่ชั้น 6 อาคารศรีพัฒน์ค่ะ', zh:'儿科药房在 Sriphat 大楼六楼。', phonetic_en:'เดอะ พีเดียทริกส์ ฟาร์มาซี อิซ ออน เดอะ ซิกซ์ธ ฟลอร์ ออฟ ศรีพัฒน์ บิลดิ้ง', phonetic_zh:'เอ๋อเคอ เอี่ยวฝาง ไจ่ Sriphat ต้าโหลว ลิ่วหลาว', context:'Directing to pediatrics pharmacy', contextTh:'บอกทางไปห้องยาเด็ก' },
      { id:'d13', en:'Please follow the signs.', th:'กรุณาเดินตามป้ายบอกทางค่ะ', zh:'请随指示牌走。', phonetic_en:'พลีส ฟอลโล เดอะ ไซน์ส', phonetic_zh:'ชิ่ง สุย จื่อซือ่ไผ่ โจ่ว', context:'General direction', contextTh:'บอกให้เดินตามป้าย' }
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

let scenarios = [];
let activeScenarioId = 'greeting';
let practiceTarget = { text: '', lang: 'en' };
let isRecording = false;
let isChatMic = false;
let isAddModalRecording = false;
let recRef = null;
let chatHistory = [];
let translateDebounce = null;
let modalAutoTimer = null;
let editingId = null;

function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      scenarios = parsed.scenarios || defaultScenarios;
      activeScenarioId = parsed.activeScenarioId || 'greeting';
    } catch (e) { scenarios = defaultScenarios; }
  } else {
    scenarios = JSON.parse(JSON.stringify(defaultScenarios));
  }
  renderScenarios();
  renderPhrases();
  renderPracticeSelect();
  initChat();
  renderQuickPhrases();
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ scenarios, activeScenarioId }));
}

function currentScenario() {
  return scenarios.find(s => s.id === activeScenarioId) || scenarios[0];
}

/* ── UI Rendering ─────────────────────────────────────────── */
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
          <button class="btn-icon yellow" onclick="speakText('${ea(p.zh)}','zh')" title="ฟัง ZH"><i class="fas fa-volume-up"></i></button>
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
        <div class="auto-preview-text" onclick="speakText('${ea(en)}','en')" style="cursor:pointer">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(en)}
        </div>
        ${phonEn ? `<span class="auto-preview-phonetic">🔤 ${esc(phonEn)}</span>` : ''}
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
    'ahead':'อะเฮด','and':'แอนด์','turn':'เทิร์น','left':'เลฟท์','right':'ไรท์','the':'เดอะ','pharmacy':'ฟาร์มาซี'
  };
  const w = en.toLowerCase().replace(/[^a-z ]/g,'').split(' ');
  return w.map(x => map[x] || '').filter(Boolean).join(' ');
}

function analyzeCtx(th, en) {
  const t = th.toLowerCase(), e = en.toLowerCase();
  if (t.includes('ทักทาย') || t.includes('สวัสดี') || e.includes('hello') || e.includes('welcome')) return { th:'ใช้ทักทายผู้ป่วย', en:'Greeting the patient' };
  if (t.includes('ทาง') || t.includes('ชั้น') || e.includes('floor') || e.includes('direction')) return { th:'ใช้บอกทางภายในโรงพยาบาล', en:'Giving directions' };
  if (t.includes('ยา') || e.includes('medicine') || e.includes('pharmacy')) return { th:'ใช้แนะนำเรื่องยา', en:'Medication instructions' };
  if (t.includes('เจ็บ') || t.includes('ปวด') || e.includes('pain') || e.includes('hurt')) return { th:'ใช้สอบถามอาการปวด', en:'Assessing pain' };
  return { th:'ใช้ในการสนทนาทั่วไปกับผู้ป่วย', en:'General patient interaction' };
}

/* ── Practice ────────────────────────────────────────────── */
function renderPracticeSelect() {
  const sel = document.getElementById('practiceSelect');
  if (!sel) return;
  sel.innerHTML = '<option value="">— เลือกประโยคที่ต้องการฝึก —</option>';
  scenarios.forEach(s => {
    if (!s.phrases.length) return;
    const og = document.createElement('optgroup');
    og.label = s.icon + ' ' + s.labelEn + ' · ' + s.labelTh;
    s.phrases.forEach(p => {
      // English option
      const optEn = document.createElement('option');
      optEn.value = 'en|' + p.en;
      optEn.textContent = '🇬🇧 ' + (p.en.length > 50 ? p.en.slice(0, 50) + '…' : p.en);
      og.appendChild(optEn);
      
      // Chinese option
      const optZh = document.createElement('option');
      optZh.value = 'zh|' + p.zh;
      optZh.textContent = '🇨🇳 ' + (p.zh.length > 50 ? p.zh.slice(0, 50) + '…' : p.zh);
      og.appendChild(optZh);
    });
    sel.appendChild(og);
  });
  if (practiceTarget.text) sel.value = practiceTarget.lang + '|' + practiceTarget.text;
}

function onPracticeSelectChange() {
  const sel = document.getElementById('practiceSelect');
  const val = sel.value;
  if (!val) {
    practiceTarget = { text: '', lang: 'en' };
    document.getElementById('targetBox').style.display = 'none';
    document.getElementById('scoreBox').style.display = 'none';
    document.getElementById('recResult').style.display = 'none';
    document.getElementById('recPlaceholder').style.display = '';
    return;
  }
  
  const [lang, text] = val.split('|');
  practiceTarget = { text, lang };
  
  let foundPhrase = null;
  for (const s of scenarios) {
    const p = s.phrases.find(p => p[lang] === text);
    if (p) { foundPhrase = p; break; }
  }
  
  document.getElementById('targetBox').style.display = 'flex';
  document.getElementById('targetText').textContent = text;
  
  const pe = document.getElementById('targetPhonetic');
  const phoneticKey = lang === 'en' ? 'phonetic_en' : 'phonetic_zh';
  if (foundPhrase && foundPhrase[phoneticKey]) {
    pe.textContent = '🔤 ' + foundPhrase[phoneticKey];
    pe.style.display = 'block';
  } else { pe.style.display = 'none'; }
  
  document.getElementById('scoreBox').style.display = 'none';
  document.getElementById('recResult').style.display = 'none';
  document.getElementById('recPlaceholder').style.display = '';
}

function goToPractice() {
  const s = currentScenario();
  if (s.phrases.length) {
    practiceTarget = { text: s.phrases[0].en, lang: 'en' };
    const sel = document.getElementById('practiceSelect');
    if (sel) sel.value = 'en|' + practiceTarget.text;
    onPracticeSelectChange();
  }
  switchTab('practice', document.querySelector('[data-tab="practice"]'));
}
function playPracticeAudio() { if (practiceTarget.text) speakText(practiceTarget.text, practiceTarget.lang); }

/* ── Recording ────────────────────────────────────────────── */
function toggleRecording() {
  if (!practiceTarget.text) {
    alert('กรุณาเลือกประโยคที่ต้องการฝึกก่อนค่ะ');
    return;
  }
  if (isRecording) { recRef && recRef.stop(); return; }
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showRecResult('Browser ไม่รองรับ กรุณาใช้ Chrome'); return; }
  const rec = new SR(); 
  rec.lang = practiceTarget.lang === 'en' ? 'en-US' : 'zh-CN'; 
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
    // Chinese character split
    tw = target.replace(/[^\u4e00-\u9fa5]/g, '').split('');
    sw = spoken.replace(/[^\u4e00-\u9fa5]/g, '').split('');
  } else {
    // English word split
    tw = target.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean);
    sw = spoken.toLowerCase().replace(/[^a-z ]/g, '').split(' ').filter(Boolean);
  }
  
  const results = tw.map(t => {
    let best = 0;
    sw.forEach(s => { const sc = wordSim(s, t); if (sc > best) best = sc; });
    return { word: t, correct: best >= 0.8 };
  });
  
  const wrong = results.filter(r => !r.correct);
  let html = `<div class="word-analysis-title"><i class="fas fa-spell-check"></i> วิเคราะห์รายคำ (กดคำเพื่อฟัง):</div>`;
  html += `<div class="word-tokens">${results.map(r =>
    `<div class="word-token ${r.correct ? 'correct' : 'wrong'}" onclick="speakText('${ea(r.word)}','${lang}')">
      ${esc(r.word)}<span class="token-hint">${r.correct ? '✓' : '✗'}</span>
    </div>`).join('')}</div>`;
    
  if (wrong.length > 0 && lang === 'en') {
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

/* ── Chat (Smart AI Role Play - ChatGPT-like Logic) ──────── */
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

/* Advanced AI Response Logic */
const aiScenarios = {
  stomach: {
    active: false,
    keywords: /stomach|belly|abdomen|ปวดท้อง|ท้อง/i,
    replies: [
      { en: "It hurts right here in my lower abdomen, on the right side. It's a sharp pain.", th: "เจ็บตรงท้องน้อยด้านขวาค่ะ เจ็บแบบเสียดๆ" },
      { en: "I feel nauseous and I vomited once an hour ago. I can't eat anything.", th: "รู้สึกคลื่นไส้และอาเจียนไปครั้งนึงเมื่อชั่วโมงก่อน กินอะไรไม่ได้เลยค่ะ" }
    ]
  },
  headache: {
    active: false,
    keywords: /head|dizzy|faint|ปวดหัว|เวียนหัว/i,
    replies: [
      { en: "I have a very bad headache and the world is spinning. I feel like I might faint.", th: "ปวดหัวมากและโลกหมุนเลยค่ะ รู้สึกเหมือนจะเป็นลม" },
      { en: "It started this morning. I also feel very sensitive to light.", th: "เริ่มเป็นตั้งแต่เมื่อเช้าค่ะ แล้วก็รู้สึกสู้แสงไม่ได้ด้วย" }
    ]
  }
};

function getAIReply(text) {
  const t = text.toLowerCase();
  
  // Greeting & Identity
  if (/hello|hi|สวัสดี|ช่วย|help|excuse/i.test(t)) {
    return { en: "Thank you for coming. I'm Sarah, a tourist from London. I'm feeling very sick.", th: "ขอบคุณที่มาค่ะ ฉันชื่อซาร่า เป็นนักท่องเที่ยวจากลอนดอน รู้สึกไม่สบายมากเลยค่ะ" };
  }
  
  // Pain Location
  if (/where.*hurt|hurt|pain|ปวด|เจ็บ|ตรงไหน/i.test(t)) {
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
  
  // Pain Scale
  if (/scale|score|1 to 10|ปวดมากไหม|คะแนน/i.test(t)) {
    return { en: "I would say it's an 8 out of 10. It's very severe.", th: "ประมาณ 8 เต็ม 10 ค่ะ ปวดรุนแรงมาก" };
  }
  
  // Medication
  if (/medication|medicine|drug|ยา|กิน|taking/i.test(t)) {
    return { en: "I took some aspirin two hours ago, but it didn't help at all.", th: "ทานแอสไพรินไปเมื่อ 2 ชั่วโมงก่อน แต่ไม่ช่วยเลยค่ะ" };
  }
  
  // Allergy
  if (/allergy|allergic|แพ้/i.test(t)) {
    return { en: "Yes, I am allergic to Penicillin. Please be careful.", th: "ใช่ค่ะ ฉันแพ้เพนิซิลลิน ช่วยระวังด้วยนะคะ" };
  }
  
  // Wait / Procedure
  if (/wait|doctor|queue|รอ|หมอ/i.test(t)) {
    return { en: "Okay, I'll wait. How long will it take to see the doctor?", th: "ตกลงค่ะจะรอ นานไหมคะกว่าจะได้พบหมอ?" };
  }

  // Follow-up context based
  if (aiScenarios.stomach.active) return aiScenarios.stomach.replies[1];
  if (aiScenarios.headache.active) return aiScenarios.headache.replies[1];

  // Default smart fallback
  return { 
    en: "I'm sorry, I'm in a lot of pain and can't understand well. Could you explain that again simply?", 
    th: "ขอโทษนะคะ ฉันปวดมากจนไม่ค่อยเข้าใจ ช่วยอธิบายง่ายๆ อีกรอบได้ไหมคะ?" 
  };
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
        <div class="q-en" onclick="speakText('${ea(p.en)}','en')" style="cursor:pointer">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(p.en)}
        </div>
        ${p.phonetic_en ? `<div class="q-phonetic-en">🔤 ${esc(p.phonetic_en)}</div>` : ''}
        <div class="q-th">🇹🇭 ${esc(p.th)}</div>
        <div class="q-zh" onclick="speakText('${ea(p.zh)}','zh')" style="cursor:pointer;margin-top:2px">
          <i class="fas fa-volume-up" style="color:var(--primary);margin-right:4px"></i> ${esc(p.zh)}
        </div>
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
