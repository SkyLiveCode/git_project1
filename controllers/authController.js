// นำเข้าโมเดล userModel จากโฟลเดอร์ models
const userModel = require('../models/userModel');

// ฟังก์ชัน login สำหรับจัดการการเข้าสู่ระบบ
exports.login = (req, res) => {
  const { email, password } = req.body;  // รับค่า email และ password จาก request body
  userModel.findUser(email, password, (err, user) => {  // เรียกใช้ฟังก์ชัน findUser จาก userModel
    if (err || !user) {  // ถ้ามีข้อผิดพลาดหรือไม่พบผู้ใช้
      console.log('Invalid credentials');
      return res.render('index', { error: 'Invalid credentials' });  // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
    }
    res.redirect('/calculate');  // ถ้าเข้าสู่ระบบสำเร็จ เปลี่ยนเส้นทางไปที่ '/calculate'
  });
};

// ฟังก์ชัน register สำหรับจัดการการสมัครสมาชิก
exports.register = (req, res) => {
  const { name, email, password } = req.body;  // รับค่า name, email และ password จาก request body
  userModel.createUser({ name, email, password }, (err, user) => {  // เรียกใช้ฟังก์ชัน createUser จาก userModel
    if (err) {  // ถ้ามีข้อผิดพลาดในการสมัครสมาชิก
      console.log('Registration failed');
      return res.render('register', { error: 'Registration failed' });  // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
    }
    res.redirect('/');  // ถ้าสมัครสมาชิกสำเร็จ เปลี่ยนเส้นทางไปที่หน้าแรก
  });
};
