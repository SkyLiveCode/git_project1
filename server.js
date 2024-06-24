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
const authRoute = require('./routes/authRoute');            // นำเข้า authRoute สำหรับการจัดการเส้นทางการรับรองความถูกต้อง
const calculateRoute = require('./routes/calculateRoute');  // นำเข้า calculateRoute สำหรับการจัดการเส้นทางการคำนวณ
const cookieParser = require('cookie-parser'); // นำเข้าโมดูล cookie-parser สำหรับจัดการคุกกี้
const session = require('express-session'); // นำเข้าโมดูล express-session สำหรับจัดการ session
const { checkAuthenticated } = require('./middleware/authMiddleware'); // นำเข้าโมดูล middleware

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
// กำหนดเส้นทางสำหรับการเข้าสู่ระบบและการสมัครสมาชิก
app.use('/', authRoute);

// กำหนดเส้นทางสำหรับหน้าเข้าสู่ระบบ
app.get('/login', (req, res) => {
  res.render('login'); // แสดงหน้า login.ejs (หน้า login)
});

// กำหนดเส้นทางสำหรับหน้าสมัครสมาชิก
app.get('/register', (req, res) => {
  res.render('register'); // แสดงหน้า register.ejs (หน้า register)
});

// กำหนดเส้นทางและ middleware เพื่อป้องกันการเข้าถึงสำหรับหน้าแรก
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index'); // แสดงหน้า index.ejs (หน้าแรก)
});

// กำหนดเส้นทางและ middleware เพื่อป้องกันการเข้าถึงสำหรับหน้าคำนวณ
app.get('/calculate', checkAuthenticated, (req, res) => {
  res.render('calculate'); // แสดงหน้า calculate.ejs (หน้า calculate)
});


// เส้นทางสำหรับดึงข้อมูล inputs จากฐานข้อมูล
app.get('/get-inputs', (req, res) => {
  const sql = 'SELECT inputs FROM calculationstest WHERE id = 1';
  db.query(sql, (err, result) => {
    if (err) throw err;  // ถ้ามีข้อผิดพลาด ให้แสดงข้อผิดพลาด
    res.json(result[0]); // ส่งข้อมูล inputs กลับไปในรูปแบบ JSON
  });
});

// เส้นทางสำหรับอัปเดตข้อมูล inputs ในฐานข้อมูล
app.post('/update-inputs', (req, res) => {
  const inputs = req.body.inputs;  // ดึงข้อมูล inputs จาก request body
  const sql = 'UPDATE calculationstest SET inputs = ? WHERE id = 1';  // คำสั่ง SQL สำหรับอัปเดตข้อมูล
  db.query(sql, [JSON.stringify(inputs)], (err, result) => {
    if (err) throw err;  // ถ้ามีข้อผิดพลาด ให้แสดงข้อผิดพลาด
    res.json({ success: true });  // ส่งข้อมูลตอบกลับว่าอัปเดตสำเร็จ
  });
});

// กำหนดการเชื่อมต่อ Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected'); // แสดงข้อความเมื่อมีการเชื่อมต่อใหม่จากไคลเอนต์

  socket.on('calculate', (data) => {
    const result = Number(data.input1) + Number(data.input2);
    socket.emit('calculatedResult', { result });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected'); // แสดงข้อความเมื่อไคลเอนต์ตัดการเชื่อมต่อ
  });
});

// กำหนดพอร์ตที่เซิร์ฟเวอร์จะฟัง
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
