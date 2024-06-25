const db = require('../config/database');

// ฟังก์ชันเพื่อแสดงหน้า medical equipment information
exports.renderMedicalEquipmentInformation = async (req, res) => {
    try {
        const [medicalEquipments] = await db.query('SELECT * FROM equipment');
        res.render('html/pages-medical_equipment', { medicalEquipments });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันเพื่อเพิ่ม medical equipment ใหม่
exports.addMedicalEquipment = async (req, res) => {
    try {
        const { equipment, id_no } = req.body;
        await db.query('INSERT INTO equipment (equipment, `ID. No.`) VALUES (?, ?)', [equipment, id_no]);
        res.redirect('/html/pages-medical_equipment');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันเพื่อลบ medical equipment
exports.deleteMedicalEquipment = async (req, res) => {
    try {
        const { id } = req.body;
        await db.query('DELETE FROM equipment WHERE id = ?', [id]);
        res.redirect('/html/pages-medical_equipment');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันเพื่ออัปเดต medical equipment
exports.updateMedicalEquipment = async (req, res) => {
    try {
        const { id, equipment, id_no } = req.body;
        await db.query('UPDATE equipment SET equipment = ?, `ID. No.` = ? WHERE id = ?', [equipment, id_no, id]);
        res.redirect('/html/pages-medical_equipment');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
