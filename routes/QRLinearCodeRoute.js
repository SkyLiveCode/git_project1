// นำเข้าโมดูล express
const express = require('express');
// สร้าง router object จาก express
const router = express.Router();
// นำเข้า controller สำหรับการจัดการการเข้าสู่ระบบและการสมัครสมาชิก
const authController = require('../controllers/authController');
// นำเข้าโมดูล bwipjs
const bwipjs = require('bwip-js');

router.get('/qrcode', async (req, res) => {
  try {
    bwipjs.toBuffer({
      bcid: 'qrcode',       // ประเภทของ Barcode: QR code
      text: 'http://localhost:3000/login',    // ข้อความที่จะแปลงเป็น QR code
      scale: 3,              // ขนาดของ QR code
      includetext: true,     // รวมข้อความที่ด้านล่างของ QR code
      textxalign: 'center',  // จัดข้อความให้อยู่กึ่งกลาง
    }, (err, png) => {
      if (err) {
        res.status(500).send('Error generating QR code');
      } else {
        res.type('png');
        res.send(png);
      }
    });
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).send('Error creating QR code');
  }
});

router.get('/barcode', (req, res) => {
  try {
    bwipjs.toBuffer({
      bcid: 'code128',       // ประเภทของ Barcode: code128
      text: 'http://localhost:3000/login',    // ข้อความที่จะแปลงเป็น Barcode
      scale: 3,              // ขนาดของ Barcode
      height: 10,            // ความสูงของ Barcode
      includetext: true,     // รวมข้อความที่ด้านล่างของ Barcode
      textxalign: 'center',  // จัดข้อความให้อยู่กึ่งกลาง
    }, (err, png) => {
      if (err) {
        res.status(500).send('Error generating barcode');
      } else {
        res.type('png');
        res.send(png);
      }
    });
  } catch (error) {
    console.error('Error creating barcode:', error);
    res.status(500).send('Error creating barcode');
  }
});


// ส่งออกโมดูล router เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = router;
