// นำเข้าโมดูล express
const express = require('express');
// สร้าง router object จาก express
const router = express.Router();
// นำเข้า controller สำหรับการจัดการการเข้าสู่ระบบและการสมัครสมาชิก
const authController = require('../controllers/authController');
// นำเข้าโมดูล pdf-lib
const { PDFDocument, rgb } = require('pdf-lib');

router.get('/pdf', async (req, res) => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // เพิ่มข้อความลงในหน้า PDF
    page.drawText('Hello, PDF!', {
      x: 50,
      y: 350,
      size: 30,
      color: rgb(0, 0, 0)
    });

    // บันทึก PDF เป็น buffer
    const pdfBytes = await pdfDoc.save();

    // กำหนดหัวข้อเนื้อหาเพื่อให้เบราว์เซอร์รู้ว่าเป็นไฟล์ PDF
    res.contentType('application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=example.pdf');

    // ส่งไฟล์ PDF กลับไปยังผู้ใช้
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Error creating PDF:', error);
    res.status(500).send('Error creating PDF');
  }
});

// ส่งออกโมดูล router เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = router;
