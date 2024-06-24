// นำเข้าไลบรารี mysql2/promise
const mysql = require('mysql2/promise');

// สร้าง connection pool โดยใช้ค่าจาก environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST,       // ชื่อโฮสต์ของฐานข้อมูล
  user: process.env.DB_USER,       // ชื่อผู้ใช้สำหรับเชื่อมต่อฐานข้อมูล
  password: process.env.DB_PASS,   // รหัสผ่านสำหรับเชื่อมต่อฐานข้อมูล
  database: process.env.DB_NAME,   // ชื่อฐานข้อมูลที่จะใช้
  waitForConnections: true,        // รอการเชื่อมต่อเมื่อจำนวนการเชื่อมต่อถึงขีดจำกัด
  connectionLimit: 10,             // จำนวนการเชื่อมต่อสูงสุดที่สามารถเปิดใช้งานพร้อมกัน
  queueLimit: 0,                   // ไม่มีขีดจำกัดของจำนวนคำขอที่สามารถรอการเชื่อมต่อ
  acquireTimeout: 10000,           // เวลา (ms) ที่จะรอการเชื่อมต่อที่ว่างก่อนที่จะเกิดข้อผิดพลาด | 10000 (ms) เท่ากับ 10 (seconds)
  connectTimeout: 10000,           // เวลา (ms) ที่จะรอการเชื่อมต่อก่อนที่จะเกิดข้อผิดพลาด | 10000 (ms) เท่ากับ 10 (seconds)
  timeout: 10000,                  // เวลา (ms) ที่จะรอคำสั่ง SQL ก่อนที่จะเกิดข้อผิดพลาด | 10000 (ms) เท่ากับ 10 (seconds)
  idleTimeout: 60000               // ปิดการเชื่อมต่อหลังจากไม่มีการใช้งานใน 60 วินาที
});

// ส่งออกโมดูล pool เพื่อให้สามารถใช้งานในไฟล์อื่นได้
module.exports = pool;
