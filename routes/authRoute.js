// นำเข้าโมดูล express
const express = require('express');
// สร้าง router object จาก express
const router = express.Router();
// นำเข้า controller สำหรับการจัดการการเข้าสู่ระบบและการสมัครสมาชิก
const authController = require('../controllers/authController');

// กำหนดเส้นทาง POST สำหรับการเข้าสู่ระบบ และเรียกใช้ฟังก์ชัน login จาก authController
router.post('/login', authController.login);
router.get('/login', (req, res) => {
    res.render('login');
  });
// กำหนดเส้นทาง POST สำหรับการสมัครสมาชิก และเรียกใช้ฟังก์ชัน register จาก authController
router.post('/register', authController.register);
router.get('/register', (req, res) => {
    res.render('register');
  });
// กำหนดเส้นทาง POST สำหรับการออกจากระบบ และเรียกใช้ฟังก์ชัน logout จาก authController
router.post('/api/logout', authController.logout);
// กำหนดเส้นทาง reset-password
router.get('/reset-password-direct', (req, res) => {
  res.render('resetPasswordDirect');
});
router.post('/reset-password-direct', authController.resetPasswordDirect);

// ส่งออกโมดูล router เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = router;
