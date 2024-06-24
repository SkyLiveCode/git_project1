// ฟังก์ชัน middleware สำหรับตรวจสอบการเข้าสู่ระบบ
function checkAuthenticated(req, res, next) {
//    if (req.session.user) { // ถ้ามีข้อมูลผู้ใช้ใน session
      return next(); // ดำเนินการต่อ
//    }
//    res.redirect('/login'); // ถ้าไม่ได้เข้าสู่ระบบ เปลี่ยนเส้นทางไปที่หน้าแรก
  }
  
  module.exports = {
    checkAuthenticated,
  };
  


// เอาคอมเม้นออกเวลาใช้งานจริง