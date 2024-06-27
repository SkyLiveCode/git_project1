// calculateRoute.js

const express = require('express');
const router = express.Router();
const calculateController1 = require('../controllers/calculateController1');
const calculateController2 = require('../controllers/calculateController2');
const { checkAuthenticated } = require('../middleware/authMiddleware');

// Calculate 1
router.get('/html/pages-calculates/pages-calculate1/:equipment_id/:id_hospital/:id_categories', (req, res) => {
    req.session.equipment_id = req.params.equipment_id;
    req.session.id_hospital = req.params.id_hospital;
    req.session.id_categories = req.params.id_categories;
    res.redirect('/html/pages-calculates/pages-calculate1'); // เปลี่ยนเส้นทางไปยังหน้า Calculate 1
});
router.get('/html/pages-calculates/pages-calculate1', calculateController1.showCalculatePage);
router.get('/get-inputs1', calculateController1.getInputs);
router.post('/update-inputs1', calculateController1.updateInputs);

// Calculate 2
router.get('/html/pages-calculates/pages-calculate2/:equipment_id/:id_hospital/:id_categories', (req, res) => {
    req.session.equipment_id = req.params.equipment_id;
    req.session.id_hospital = req.params.id_hospital;
    req.session.id_categories = req.params.id_categories;
    res.redirect('/html/pages-calculates/pages-calculate2'); // เปลี่ยนเส้นทางไปยังหน้า Calculate 2
});
router.get('/html/pages-calculates/pages-calculate2', calculateController2.showCalculatePage);
router.get('/get-inputs2', calculateController2.getInputs);
router.post('/update-inputs2', calculateController2.updateInputs);

module.exports = router;
