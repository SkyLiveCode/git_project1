// นำเข้าโมดูล express
const express = require('express');
// สร้าง router object จาก express
const router = express.Router();
// นำเข้า controller สำหรับการจัดการหน้าคำนวณ
const calController = require('../controllers/calController');
// นำเข้าโมดูล middleware
const { checkAuthenticated } = require('../middleware/authMiddleware'); 

// กำหนดเส้นทาง GET สำหรับการแสดงหน้าคำนวณ และเรียกใช้ฟังก์ชัน showCalculatePage จาก calController
router.get('/cal', checkAuthenticated, calController.showCalculatePage);

// เส้นทางสำหรับดึงข้อมูล inputs จากฐานข้อมูล
router.get('/get-inputs', calController.getInputs);

// เส้นทางสำหรับอัปเดตข้อมูล inputs ในฐานข้อมูล
router.post('/update-inputs', calController.updateInputs);

// ส่งออกโมดูล router เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = router;
