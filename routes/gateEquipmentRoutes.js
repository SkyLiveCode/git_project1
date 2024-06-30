const express = require('express');
const router = express.Router();
const gateEquipmentController = require('../controllers/gateEquipmentController');

// เส้นทางสำหรับรับ id
router.get('/html/pages-gate_equipment_by_id/:equipment_id/:id_hospital/:id_categories', (req, res) => {
    req.session.equipment_id = req.params.equipment_id;
    req.session.id_hospital = req.params.id_hospital;
    req.session.id_categories = req.params.id_categories;
    res.redirect('/html/pages-gate_equipment'); // เปลี่ยนเส้นทางไปยังหน้า Calculate 1
});

// เส้นทางสำหรับรับ id_hospital
router.get('/html/pages-gate_equipment_by_id_hospital/:id_hospital', (req, res) => {
    req.session.id_hospital = req.params.id_hospital; // เก็บ id_hospital ใน session
    res.redirect('/html/pages-gate_equipment'); // เปลี่ยนเส้นทางไปยังหน้าข้อมูลอุปกรณ์ทางการแพทย์
});

// เส้นทางเพื่อแสดงหน้า medical equipment information
router.get('/html/pages-gate_equipment', gateEquipmentController.renderMedicalEquipmentInformation);

module.exports = router;
