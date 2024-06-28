// นำเข้าโมเดล userModel จากโฟลเดอร์ models
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// ฟังก์ชัน login สำหรับจัดการการเข้าสู่ระบบ
exports.login = async (req, res) => {
  const { email, password } = req.body; // รับค่า email และ password จาก request body
  try {
    const user = await userModel.findUser(email, password); // เรียกใช้ฟังก์ชัน findUser จาก userModel
    if (!user) { // ถ้าไม่พบผู้ใช้
      console.log('Invalid credentials');
      return res.render('login', { error: 'Invalid credentials' }); // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
    }
    req.session.user = user; // เก็บข้อมูลผู้ใช้ใน session
    res.cookie('user', user, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // ตั้งค่า cookie สำหรับ 7 วัน
    res.redirect('/'); // ถ้าเข้าสู่ระบบสำเร็จ เปลี่ยนเส้นทางไปที่ '/'
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).render('login', { error: 'Server Error' }); // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
  }
};

// ฟังก์ชัน register สำหรับจัดการการสมัครสมาชิก
exports.register = async (req, res) => {
  const { name, email, password } = req.body; // รับค่า name, email และ password จาก request body
  try {
    await userModel.createUser({ name, email, password }); // เรียกใช้ฟังก์ชัน createUser จาก userModel
    res.redirect('/'); // ถ้าสมัครสมาชิกสำเร็จ เปลี่ยนเส้นทางไปที่หน้าแรก
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).render('register', { error: 'Registration failed' }); // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
  }
};

// ฟังก์ชัน logout สำหรับจัดการการออกจากระบบ
exports.logout = (req, res) => {
  res.clearCookie('user'); // ลบคุกกี้ผู้ใช้
  req.session.destroy(); // ทำลาย session
  res.redirect('/login'); // เปลี่ยนเส้นทางไปที่หน้าแรก
};

// ฟังก์ชัน reset Password
exports.resetPasswordDirect = async (req, res) => {
  // โค้ดฟังก์ชันเปล่า
  try {
    // ฟังก์ชันนี้จะมีการทำงานเพิ่มเติมในอนาคต
    res.render('resetPasswordDirect', { message: 'This is a placeholder for reset password functionality.' });
  } catch (err) {
    console.error('Error in resetPasswordDirect:', err);
    res.status(500).render('resetPasswordDirect', { error: 'Server Error' });
  }
};
