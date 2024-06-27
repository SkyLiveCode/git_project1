const db = require('../config/database');

// ฟังก์ชันเพื่อแสดงหน้า hospital information
exports.renderHospitalInformation = async (req, res) => {
    try {
        const [hospitals] = await db.query('SELECT * FROM hospital');
        req.session.hospitals = hospitals; // เก็บข้อมูล hospitals ใน session
        res.render('html/pages-hospital_information', { hospitals });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันเพื่อเพิ่ม hospital ใหม่
exports.addHospital = async (req, res) => {
    try {
        const { hospital_name, province } = req.body;
        await db.query('INSERT INTO hospital (hospital_name, province) VALUES (?, ?)', [hospital_name, province]);
        res.redirect('/html/pages-hospital_information');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันเพื่อลบ hospital
exports.deleteHospital = async (req, res) => {
    try {
        const { id } = req.body;
        await db.query('DELETE FROM hospital WHERE id = ?', [id]);
        res.redirect('/html/pages-hospital_information');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// ฟังก์ชันเพื่ออัปเดต hospital
exports.updateHospital = async (req, res) => {
    try {
        const { id, hospital_name, province } = req.body;
        await db.query('UPDATE hospital SET hospital_name = ?, province = ? WHERE id = ?', [hospital_name, province, id]);
        res.redirect('/html/pages-hospital_information');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
