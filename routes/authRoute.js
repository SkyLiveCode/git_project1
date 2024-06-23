// นำเข้าโมดูล express
const express = require('express');
// สร้าง router object จาก express
const router = express.Router();
// นำเข้า controller สำหรับการจัดการการเข้าสู่ระบบและการสมัครสมาชิก
const authController = require('../controllers/authController');

// กำหนดเส้นทาง POST สำหรับการเข้าสู่ระบบ และเรียกใช้ฟังก์ชัน login จาก authController
router.post('/login', authController.login);
// กำหนดเส้นทาง POST สำหรับการสมัครสมาชิก และเรียกใช้ฟังก์ชัน register จาก authController
router.post('/register', authController.register);

// ส่งออกโมดูล router เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = router;
