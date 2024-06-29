const db = require('../config/database');

// ฟังก์ชันเพื่อแสดงหน้า medical equipment information
exports.renderMedicalEquipmentInformation = async (req, res) => {
    try {
        const id_hospital = req.session.id_hospital; // ดึง id_hospital จาก session
        const [hospital] = await db.query('SELECT * FROM hospital WHERE id = ?', [id_hospital]);
        const [medicalEquipments] = await db.query('SELECT * FROM equipment WHERE id_hospital = ?', [id_hospital]);
        const [categories] = await db.query('SELECT id, categorie_name, short_name FROM categories'); // ดึงข้อมูล categories
        const user = req.session.user;
        res.render('html/pages-gate_equipment', { medicalEquipments, id_hospital, categories, hospital, user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
