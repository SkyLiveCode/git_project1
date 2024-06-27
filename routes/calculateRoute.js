// calculateRoute.js

const express = require('express');
const router = express.Router();
const calculateController1 = require('../controllers/calculateController1');
const calculateController2 = require('../controllers/calculateController2');
const { checkAuthenticated } = require('../middleware/authMiddleware');

// Calculate 1
router.get('/calculate1', checkAuthenticated, (req, res) => {
    req.session.equipment_id = req.query.equipment_id;
    req.session.id_hospital = req.query.id_hospital;
    req.session.id_categories = req.query.id_categories;
    calculateController1.showCalculatePage(req, res);
});
router.post('/calculate1', checkAuthenticated, calculateController1.calculate);
router.get('/get-inputs1', calculateController1.getInputs);
router.post('/update-inputs1', calculateController1.updateInputs);

// Calculate 2
router.get('/calculate2', checkAuthenticated, (req, res) => {
    req.session.equipment_id = req.query.equipment_id;
    req.session.id_hospital = req.query.id_hospital;
    req.session.id_categories = req.query.id_categories;
    calculateController2.showCalculatePage(req, res);
});
router.post('/calculate2', checkAuthenticated, calculateController2.calculate);
router.get('/get-inputs2', calculateController2.getInputs);
router.post('/update-inputs2', calculateController2.updateInputs);

module.exports = router;
