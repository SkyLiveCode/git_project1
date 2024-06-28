// นำเข้าโมเดล userModel จากโฟลเดอร์ models
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

// ฟังก์ชันแสดงหน้าแรก
exports.showHomePage = (req, res) => {
  const user = req.session.user;
  res.render('index', { user });
};

// ฟังก์ชัน login สำหรับจัดการการเข้าสู่ระบบ
exports.login = async (req, res) => {
  const { email, password } = req.body; // รับค่า email และ password จาก request body
  try {
    const user = await userModel.findUserByEmail(email); // ค้นหาผู้ใช้โดยอีเมล
    if (!user) { // ถ้าไม่พบผู้ใช้
      console.log('Invalid email');
      return res.render('login', { emailError: 'Invalid email' }); // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
    }
    const isMatch = await bcrypt.compare(password, user.password); // เปรียบเทียบรหัสผ่าน
    if (!isMatch) { // ถ้ารหัสผ่านไม่ตรงกัน
      console.log('Invalid password');
      return res.render('login', { passwordError: 'Invalid password' }); // ส่งค่าข้อความแจ้งเตือนกลับไปที่เทมเพลต
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
  const { name, email, password, confirmPassword } = req.body;
  
  // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
  if (password !== confirmPassword) {
    return res.render('register', { passwordError: 'Passwords do not match' });
  }

  try {
    // ตรวจสอบว่ามีผู้ใช้ที่ใช้ชื่อหรืออีเมลนี้อยู่แล้วหรือไม่
    const existingUserByName = await userModel.findUserByName(name);
    if (existingUserByName) {
      return res.render('register', { nameError: 'Full Name is already taken' });
    }
    
    const existingUserByEmail = await userModel.findUserByEmail(email);
    if (existingUserByEmail) {
      return res.render('register', { emailError: 'Email is already registered' });
    }

    // สร้างผู้ใช้ใหม่
    await userModel.createUser({ name, email, password });
    res.redirect('/login');
  } catch (err) {
    console.error('Error in register:', err);
    res.status(500).render('register', { error: 'Registration failed' });
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
