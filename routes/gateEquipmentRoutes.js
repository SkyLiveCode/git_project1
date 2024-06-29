const express = require('express');
const router = express.Router();
const gateEquipmentController = require('../controllers/gateEquipmentController');

// เส้นทางสำหรับรับ id
router.get('/html/pages-gate_equipment_by_id/:id', (req, res) => {
    req.session.id_hospital = req.params.id; // เก็บ id_hospital ใน session
    res.redirect('/html/pages-gate_equipment'); // เปลี่ยนเส้นทางไปยังหน้าข้อมูลอุปกรณ์ทางการแพทย์
});

// เส้นทางสำหรับรับ id_hospital
router.get('/html/pages-gate_equipment_by_id_hospital/:id_hospital', (req, res) => {
    req.session.id_hospital = req.params.id_hospital; // เก็บ id_hospital ใน session
    res.redirect('/html/pages-gate_equipment'); // เปลี่ยนเส้นทางไปยังหน้าข้อมูลอุปกรณ์ทางการแพทย์
});

// เส้นทางเพื่อแสดงหน้า medical equipment information
router.get('/html/pages-gate_equipment', gateEquipmentController.renderMedicalEquipmentInformation);

module.exports = router;
