// นำเข้าโมดูลที่จำเป็น
const db = require('../config/database'); // นำเข้าโมดูลการเชื่อมต่อฐานข้อมูล
const bcrypt = require('bcrypt'); // นำเข้าโมดูล bcrypt สำหรับการเข้ารหัสรหัสผ่าน

// ฟังก์ชัน findUser สำหรับค้นหาผู้ใช้ในฐานข้อมูล
exports.findUser = (email, password, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?'; // คำสั่ง SQL สำหรับค้นหาผู้ใช้โดยอีเมล
  db.query(query, [email], (err, results) => { // รันคำสั่ง SQL
    if (err) return callback(err); // ถ้ามีข้อผิดพลาด ส่งข้อผิดพลาดกลับไปที่ callback
    if (results.length === 0) return callback(null, null); // ถ้าไม่พบผู้ใช้ ส่ง null กลับไปที่ callback

    const user = results[0]; // เก็บผลลัพธ์ผู้ใช้ที่พบ
    bcrypt.compare(password, user.password, (err, isMatch) => { // เปรียบเทียบรหัสผ่านที่กรอกกับรหัสผ่านที่เข้ารหัสในฐานข้อมูล
      if (err) return callback(err); // ถ้ามีข้อผิดพลาด ส่งข้อผิดพลาดกลับไปที่ callback
      if (!isMatch) return callback(null, null); // ถ้ารหัสผ่านไม่ตรงกัน ส่ง null กลับไปที่ callback
      callback(null, user); // ถ้ารหัสผ่านตรงกัน ส่งข้อมูลผู้ใช้กลับไปที่ callback
    });
  });
};

// ฟังก์ชัน createUser สำหรับสร้างผู้ใช้ใหม่ในฐานข้อมูล
exports.createUser = (userData, callback) => {
  bcrypt.hash(userData.password, 10, (err, hash) => { // เข้ารหัสรหัสผ่านของผู้ใช้
    if (err) return callback(err); // ถ้ามีข้อผิดพลาดในการเข้ารหัส ส่งข้อผิดพลาดกลับไปที่ callback
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'; // คำสั่ง SQL สำหรับเพิ่มผู้ใช้ใหม่
    db.query(query, [userData.name, userData.email, hash], (err, results) => { // รันคำสั่ง SQL
      if (err) return callback(err); // ถ้ามีข้อผิดพลาดในการเพิ่มผู้ใช้ ส่งข้อผิดพลาดกลับไปที่ callback
      callback(null, results.insertId); // ถ้าเพิ่มผู้ใช้สำเร็จ ส่ง ID ของผู้ใช้ใหม่กลับไปที่ callback
    });
  });
};
