const express = require('express');
const router = express.Router();
const medicalEquipmentController = require('../controllers/medicalEquipmentController');

// เส้นทางสำหรับรับ id
router.get('/html/pages-medical_equipment_by_id/:id', (req, res) => {
    req.session.id_hospital = req.params.id; // เก็บ id_hospital ใน session
    res.redirect('/html/pages-medical_equipment'); // เปลี่ยนเส้นทางไปยังหน้าข้อมูลอุปกรณ์ทางการแพทย์
});

// เส้นทางสำหรับรับ id_hospital
router.get('/html/pages-medical_equipment_by_id_hospital/:id_hospital', (req, res) => {
    req.session.id_hospital = req.params.id_hospital; // เก็บ id_hospital ใน session
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
