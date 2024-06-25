const express = require('express');
const router = express.Router();
const medicalEquipmentController = require('../controllers/medicalEquipmentController');

// เส้นทางเพื่อแสดงหน้า medical equipment information
router.get('/html/pages-medical_equipment', medicalEquipmentController.renderMedicalEquipmentInformation);

// เส้นทางเพื่อเพิ่ม medical equipment ใหม่
router.post('/addMedicalEquipment', medicalEquipmentController.addMedicalEquipment);

// เส้นทางเพื่อลบ medical equipment
router.post('/deleteMedicalEquipment', medicalEquipmentController.deleteMedicalEquipment);

// เส้นทางเพื่ออัปเดต medical equipment
router.post('/updateMedicalEquipment', medicalEquipmentController.updateMedicalEquipment);

module.exports = router;
