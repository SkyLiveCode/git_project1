// โหลด environment variables จากไฟล์ .env
require('dotenv').config();
// นำเข้าโมดูลที่จำเป็น
const express = require('express');    // นำเข้าโมดูล express
const http = require('http');          // นำเข้าโมดูล http
const socketIo = require('socket.io'); // นำเข้าโมดูล socket.io
const db = require('./config/database');  // นำเข้าโมดูลการเชื่อมต่อฐานข้อมูล
const QRCode = require('qrcode');                 // นำเข้าโมดูล qrcode
const { PDFDocument, rgb } = require('pdf-lib');  // นำเข้าโมดูล PDF generation
const fs = require('fs');                         // นำเข้าโมดูล filesystem
const authRoute = require('./routes/authRoute');            // นำเข้า authController
const calculateRoute = require('./routes/calculateRoute');  // นำเข้า calculateRoute

// สร้างแอปพลิเคชัน Express
const app = express();
// สร้างเซิร์ฟเวอร์ HTTP
const server = http.createServer(app);
// สร้างเซิร์ฟเวอร์ Socket.IO
const io = socketIo(server);

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

// กำหนดเส้นทางสำหรับการเข้าสู่ระบบและการสมัครสมาชิก
app.use('/', authRoute);
// กำหนดเส้นทางสำหรับหน้าคำนวณ
app.use('/', calculateRoute);

// กำหนดเส้นทางสำหรับหน้าแรก
app.get('/', (req, res) => {
  res.render('index');
});

// กำหนดเส้นทางสำหรับหน้าสมัครสมาชิก
app.get('/register', (req, res) => {
  res.render('register');
});

// กำหนดการเชื่อมต่อ Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected');

  // ฟัง event 'calculate' จากไคลเอนต์
  socket.on('calculate', (data) => {
    // คำนวณผลรวมของ input1 และ input2
    const result = Number(data.input1) + Number(data.input2);
    // ส่งผลลัพธ์กลับไปที่ไคลเอนต์
    socket.emit('calculatedResult', { result });
  });

  // ฟัง event 'disconnect' เมื่อไคลเอนต์ตัดการเชื่อมต่อ
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// กำหนดพอร์ตที่เซิร์ฟเวอร์จะฟัง
const PORT = process.env.PORT || 3000;
// เริ่มเซิร์ฟเวอร์และฟังพอร์ตที่กำหนด
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
