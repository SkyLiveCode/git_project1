AT_PREVENT/
├── node_modules/
├── public/
│   └── assets/
│       ├── css/
│       ├── img/
│       ├── js/
│       │   └── script.js
│       └── vendor/
├── views/
│   ├── html/
│   └── index.ejs
│   └── register.ejs
│   └── calculate.ejs
├── controllers/
│   └── authController.js
│   └── calculateController.js
├── models/
│   └── userModel.js
├── routes/
│   └── authRoute.js
│   └── calculateRoute.js
├── utils/
│   └── util.js
├── config/
│   └── database.js
├── .env
├── server.js
├── package.json
└── package-lock.json

รายละเอียดของแต่ละโฟลเดอร์และไฟล์
node_modules/: เก็บแพ็กเกจที่ติดตั้งจาก npm
public/: โฟลเดอร์สำหรับไฟล์ที่สามารถเข้าถึงได้โดยตรงจากเว็บเบราว์เซอร์
assets/: โฟลเดอร์สำหรับไฟล์สาธารณะ เช่น CSS, รูปภาพ, JavaScript ฝั่งลูกค้า, และ vendor libraries
css/: โฟลเดอร์สำหรับไฟล์ CSS
img/: โฟลเดอร์สำหรับไฟล์รูปภาพ
js/: โฟลเดอร์สำหรับไฟล์ JavaScript ฝั่งลูกค้า
vendor/: โฟลเดอร์สำหรับไฟล์ไลบรารีจากบุคคลที่สาม
views/: โฟลเดอร์สำหรับไฟล์เทมเพลต
html/: โฟลเดอร์สำหรับไฟล์ HTML อื่น ๆ (ถ้ามี)
index.ejs: ไฟล์เทมเพลตสำหรับหน้าเข้าสู่ระบบ
register.ejs: ไฟล์เทมเพลตสำหรับหน้าสมัครสมาชิก
calculate.ejs: ไฟล์เทมเพลตสำหรับหน้าคำนวณแบบ real-time
controllers/: โฟลเดอร์สำหรับไฟล์ควบคุม (Controllers)
authController.js: ไฟล์ควบคุมสำหรับการจัดการการเข้าสู่ระบบและการสมัครสมาชิก
calculateController.js: ไฟล์ควบคุมสำหรับการจัดการหน้าคำนวณ
models/: โฟลเดอร์สำหรับไฟล์โมเดล (Models)
userModel.js: ไฟล์โมเดลสำหรับการทำงานกับข้อมูลผู้ใช้ในฐานข้อมูล
routes/: โฟลเดอร์สำหรับไฟล์กำหนดเส้นทาง (Routes)
authRoute.js: ไฟล์กำหนดเส้นทางสำหรับการเข้าสู่ระบบและการสมัครสมาชิก
calculateRoute.js: ไฟล์กำหนดเส้นทางสำหรับหน้าคำนวณ
utils/: โฟลเดอร์สำหรับไฟล์เครื่องมือที่ใช้ทั่วไป (Utility Functions)
util.js: ไฟล์สำหรับฟังก์ชันเครื่องมือทั่วไป
config/: โฟลเดอร์สำหรับไฟล์การกำหนดค่า (Configuration)
database.js: ไฟล์การกำหนดค่าการเชื่อมต่อฐานข้อมูล
.env: ไฟล์สำหรับเก็บ environment variables เช่น ข้อมูลการเชื่อมต่อฐานข้อมูล
server.js: ไฟล์หลักสำหรับเริ่มเซิร์ฟเวอร์
package.json: ไฟล์สำหรับเก็บรายการ dependencies และข้อมูลโปรเจกต์
package-lock.json: ไฟล์สำหรับล็อกเวอร์ชันของ dependencies
