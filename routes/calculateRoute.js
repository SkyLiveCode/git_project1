const express = require('express');
const router = express.Router();
const calculateController1 = require('../controllers/calculateController1');
const calculateController2 = require('../controllers/calculateController2');
const { checkAuthenticated } = require('../middleware/authMiddleware');

// เส้นทางสำหรับชุดที่ 1
router.get('/calculate1', checkAuthenticated, calculateController1.showCalculatePage);
router.post('/calculate1', checkAuthenticated, calculateController1.calculate);
router.get('/get-inputs1', calculateController1.getInputs);
router.post('/update-inputs1', calculateController1.updateInputs);

// เส้นทางสำหรับชุดที่ 2
router.get('/calculate2', checkAuthenticated, calculateController2.showCalculatePage);
router.post('/calculate2', checkAuthenticated, calculateController2.calculate);
router.get('/get-inputs2', calculateController2.getInputs);
router.post('/update-inputs2', calculateController2.updateInputs);

module.exports = router;
