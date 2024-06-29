const db = require('../config/database');

// ฟังก์ชันเพื่อแสดงหน้า medical equipment information
exports.renderMedicalEquipmentInformation = async (req, res) => {
    try {
        const { equipment_id, id_hospital, id_categories } = req.session;
        const user = req.session.user;
        res.render('html/pages-gate_equipment', { equipment_id, id_hospital, id_categories, user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};


