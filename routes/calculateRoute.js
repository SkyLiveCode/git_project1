// นำเข้าโมดูล express
const express = require('express');
// สร้าง router object จาก express
const router = express.Router();
// นำเข้า controller สำหรับการจัดการหน้าคำนวณ
const calculateController = require('../controllers/calculateController');
// นำเข้าโมดูล middleware
const { checkAuthenticated } = require('../middleware/authMiddleware'); 

// กำหนดเส้นทาง GET สำหรับการแสดงหน้าคำนวณ และเรียกใช้ฟังก์ชัน showCalculatePage จาก calculateController
router.get('/calculate', checkAuthenticated, calculateController.showCalculatePage);

// เส้นทาง POST สำหรับการคำนวณ
router.post('/calculate', checkAuthenticated, calculateController.calculate);

// เส้นทางสำหรับดึงข้อมูล inputs จากฐานข้อมูล
router.get('/get-inputs', calculateController.getInputs);

// เส้นทางสำหรับอัปเดตข้อมูล inputs ในฐานข้อมูล
router.post('/update-inputs', calculateController.updateInputs);

// ส่งออกโมดูล router เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = router;
