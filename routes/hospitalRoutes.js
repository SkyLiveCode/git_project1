const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');

// เส้นทางเพื่อแสดงหน้า hospital information
router.get('/html/pages-hospital_information', hospitalController.renderHospitalInformation);

// เส้นทางเพื่อเก็บ id_hospital ใน session และเปลี่ยนเส้นทางไปยังหน้า medical equipment
router.get('/html/pages-medical_equipment/:id', (req, res) => {
    req.session.id_hospital = req.params.id; // เก็บ id_hospital ใน session
    res.redirect('/html/pages-medical_equipment'); // เปลี่ยนเส้นทางไปยังหน้าข้อมูลอุปกรณ์ทางการแพทย์
});

// เส้นทางเพื่อเพิ่ม hospital ใหม่
router.post('/addHospital', hospitalController.addHospital);

// เส้นทางเพื่อลบ hospital
router.post('/deleteHospital', hospitalController.deleteHospital);

// เส้นทางเพื่ออัปเดต hospital
router.post('/updateHospital', hospitalController.updateHospital);

module.exports = router;
