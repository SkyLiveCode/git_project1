const express = require('express');
const router = express.Router();
const medicalEquipmentController = require('../controllers/medicalEquipmentController');

// เส้นทางเพื่อเก็บ id_hospital ใน session และเปลี่ยนเส้นทางไปยังหน้า pages-medical_equipment
// เส้นทางนี้จะดึง id_hospital จาก URL เก็บใน session และเปลี่ยนเส้นทางผู้ใช้ไปยังหน้า medical equipment
router.get('/html/pages-medical_equipment/:a', (req, res) => {
    req.session.id_hospital = req.params.a; // เก็บ id_hospital ใน session
    res.redirect('/html/pages-medical_equipment'); // เปลี่ยนเส้นทางไปยังหน้าข้อมูลอุปกรณ์ทางการแพทย์
});

// เส้นทางเพื่อแสดงหน้า medical equipment information
router.get('/html/pages-medical_equipment', medicalEquipmentController.renderMedicalEquipmentInformation);

// เส้นทางเพื่อเพิ่ม medical equipment ใหม่
router.post('/addMedicalEquipment', medicalEquipmentController.addMedicalEquipment);

// เส้นทางเพื่อลบ medical equipment
router.post('/deleteMedicalEquipment', medicalEquipmentController.deleteMedicalEquipment);

// เส้นทางเพื่ออัปเดต medical equipment
router.post('/updateMedicalEquipment', medicalEquipmentController.updateMedicalEquipment);

module.exports = router;
