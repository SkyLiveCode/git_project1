// โหลด environment variables จากไฟล์ .env
require('dotenv').config();

// นำเข้าโมดูลที่จำเป็น
const express = require('express');    // นำเข้าโมดูล express สำหรับสร้างแอปพลิเคชันเว็บ
const http = require('http');          // นำเข้าโมดูล http สำหรับสร้างเซิร์ฟเวอร์
const socketIo = require('socket.io'); // นำเข้าโมดูล socket.io สำหรับการสื่อสารแบบ real-time
const db = require('./config/database');  // นำเข้าโมดูลการเชื่อมต่อฐานข้อมูล
const QRCode = require('qrcode');                 // นำเข้าโมดูล qrcode สำหรับสร้าง QR code
const { PDFDocument, rgb } = require('pdf-lib');  // นำเข้าโมดูล PDF generation สำหรับสร้าง PDF
const fs = require('fs');                         // นำเข้าโมดูล filesystem สำหรับการจัดการไฟล์
const cookieParser = require('cookie-parser'); // นำเข้าโมดูล cookie-parser สำหรับจัดการคุกกี้
const session = require('express-session'); // นำเข้าโมดูล express-session สำหรับจัดการ session
const { checkAuthenticated } = require('./middleware/authMiddleware'); // นำเข้าโมดูล middleware
const calculateController1 = require('./controllers/calculateController1'); // นำเข้าโมดูล calculateController1
const calculateController2 = require('./controllers/calculateController2'); // นำเข้าโมดูล calculateController2
const authRoute = require('./routes/authRoute');            // นำเข้า authRoute สำหรับการจัดการเส้นทางการรับรองความถูกต้อง
const calculateRoute = require('./routes/calculateRoute');  // นำเข้า calculateRoute สำหรับการจัดการเส้นทางการคำนวณ
const hospitalRoutes = require('./routes/hospitalRoutes'); // นำเข้าโมดูล hospitalRoutes
const medicalEquipmentRoutes = require('./routes/medicalEquipmentRoutes'); // นำเข้าโมดูล medicalEquipmentRoutes

const app = express();                 // สร้างแอปพลิเคชัน Express
const server = http.createServer(app); // สร้างเซิร์ฟเวอร์ HTTP
const io = socketIo(server);           // สร้างเซิร์ฟเวอร์ Socket.IO

// กำหนดค่า URL ของแอปพลิเคชันจาก environment variables หรือใช้ค่าเริ่มต้น
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

// กำหนดค่า view engine เป็น EJS
app.set('view engine', 'ejs');
// กำหนดโฟลเดอร์สำหรับไฟล์เทมเพลต
app.set('views', './views');
// กำหนดโฟลเดอร์สำหรับไฟล์สาธารณะ
app.use(express.static('public'));
// กำหนด middleware สำหรับการแปลงข้อมูลจากฟอร์ม
app.use(express.urlencoded({ extended: true }));
// กำหนด middleware สำหรับการแปลงข้อมูล JSON
app.use(express.json());
// กำหนด middleware สำหรับการ parse คุกกี้
app.use(cookieParser());
// กำหนด middleware สำหรับการจัดการ session
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // กำหนดอายุคุกกี้เป็น 7 วัน
}));

// กำหนด Route
app.use('/', authRoute);
app.use('/', calculateRoute);
app.use('/', hospitalRoutes);
app.use('/', medicalEquipmentRoutes);

// กำหนดเส้นทางและ middleware เพื่อป้องกันการเข้าถึงสำหรับหน้าแรก
app.get('/', checkAuthenticated, (req, res) => {
  const user = req.session.user;
  res.render('index', { user }); // ส่งข้อมูลผู้ใช้ไปยังเทมเพลต
});

// กำหนดการเชื่อมต่อ Socket.IO
calculateController1.handleSocketConnection(io);
calculateController2.handleSocketConnection(io);

// กำหนดพอร์ตที่เซิร์ฟเวอร์จะฟัง
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} URL : ${APP_URL}`);
});
