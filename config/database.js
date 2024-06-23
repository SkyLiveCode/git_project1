// นำเข้าไลบรารี mysql2
const mysql = require('mysql2');

// สร้างการเชื่อมต่อกับฐานข้อมูลโดยใช้ค่าจาก environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // ชื่อโฮสต์ของฐานข้อมูล
  user: process.env.DB_USER,     // ชื่อผู้ใช้สำหรับเชื่อมต่อฐานข้อมูล
  password: process.env.DB_PASS, // รหัสผ่านสำหรับเชื่อมต่อฐานข้อมูล
  database: process.env.DB_NAME  // ชื่อฐานข้อมูลที่จะใช้
});

// เริ่มการเชื่อมต่อกับฐานข้อมูล
db.connect((err) => {
  if (err) throw err;           // ถ้าเกิดข้อผิดพลาดในการเชื่อมต่อ ให้แสดงข้อผิดพลาด
  console.log('Connected to database'); // แสดงข้อความในคอนโซลเมื่อเชื่อมต่อสำเร็จ
});

// ส่งออกโมดูล db เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = db;
