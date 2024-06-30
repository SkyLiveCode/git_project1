const db = require('../config/database');
const { sum } = require('../utils/util');

// ฟังก์ชันแสดงหน้าคำนวณ
exports.showCalculatePage = (req, res) => {
    const { equipment_id, id_hospital, id_categories } = req.session;
    const user = req.session.user;
    res.render('html/pages-calculates/pages-calculate1', { equipment_id, id_hospital, id_categories, user });
};

// ฟังก์ชันคำนวณและส่งผลลัพธ์กลับ
exports.calculate = (req, res) => {
    const { 
        calinput1, 
        calinput2, 
        calinput3, 
        calinput4, 
        signature1, 
        signature2, 
        signature3, 
        textarea1, 
        textarea2, 
        radio1, 
        radio2, 
        infoinput1, 
        infoinput2, 
        infoinput3, 
        infoinput4
        // <<<<<<<<<< เพิ่มรายการ... 
    } = req.body; 

    const sumResult = sum(Number(calinput1), Number(calinput2));
    const differenceResult = Number(calinput3) - Number(calinput4);
    const signatureStatus1 = signature1 ? 'Signed' : 'Not Signed';
    const signatureStatus2 = signature2 ? 'Signed' : 'Not Signed';
    const signatureStatus3 = signature3 ? 'Signed' : 'Not Signed';
    // <<<<<<<<<< เพิ่มรายการ... 


    res.json({
        sumResult,
        differenceResult,
        signatureStatus1,
        signatureStatus2,
        signatureStatus3,
        radio1,
        radio2,
        infoinput1,
        infoinput2,
        infoinput3,
        infoinput4
        // <<<<<<<<<< เพิ่มรายการ... 
    });
};

// ฟังก์ชันสำหรับดึงข้อมูล inputs จากฐานข้อมูล
exports.getInputs = async (req, res) => {
    try {
        const equipment_id = req.session.equipment_id; // ใช้ id = equipment_id ที่ถูกส่งมา
        const sql = 'SELECT inputs FROM equipment WHERE id = ?';  
        const [result] = await db.query(sql, [equipment_id]);
        res.json(result[0]); // ส่งข้อมูล inputs กลับไปในรูปแบบ JSON
    } catch (err) {
        console.error(err); // แสดงข้อผิดพลาด
        res.status(500).send('Server Error'); // ส่งข้อความข้อผิดพลาดกลับไปยังไคลเอนต์
    }
};

// ฟังก์ชันสำหรับอัปเดตข้อมูล inputs ในฐานข้อมูล
exports.updateInputs = async (req, res) => {
    try {
        const inputs = req.body.inputs;  // ดึงข้อมูล inputs จาก request body
        const equipment_id = req.session.equipment_id; // ใช้ id = equipment_id ที่ถูกส่งมา
        const sql = 'UPDATE equipment SET inputs = ? WHERE id = ?';  
        await db.query(sql, [JSON.stringify(inputs), equipment_id]);
        res.json({ success: true });  // ส่งข้อมูลตอบกลับว่าอัปเดตสำเร็จ
    } catch (err) {
        console.error(err); // แสดงข้อผิดพลาด
        res.status(500).send('Server Error'); // ส่งข้อความข้อผิดพลาดกลับไปยังไคลเอนต์
    }
};

// ฟังก์ชันสำหรับการเชื่อมต่อ Socket.IO
exports.handleSocketConnection = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected'); // แสดงข้อความเมื่อมีการเชื่อมต่อใหม่จากไคลเอนต์

        socket.on('calculate', (data) => {
            const sumResult = sum(Number(data.calinput1), Number(data.calinput2));
            const differenceResult = Number(data.calinput3) - Number(data.calinput4);
            const signatureStatus1 = data.signature1 ? 'Signed' : 'Not Signed';
            const signatureStatus2 = data.signature2 ? 'Signed' : 'Not Signed';
            const signatureStatus3 = data.signature3 ? 'Signed' : 'Not Signed';
            // <<<<<<<<<< เพิ่มรายการ... 
            socket.emit('calculatedResult', { 
                sumResult, 
                differenceResult, 
                signatureStatus1, 
                signatureStatus2, 
                signatureStatus3,
                radio1: data.radio1, 
                radio2: data.radio2,
                infoinput1: data.infoinput1,
                infoinput2: data.infoinput2,
                infoinput3: data.infoinput3,
                infoinput4: data.infoinput4
                // <<<<<<<<<< เพิ่มรายการ... 
            });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected'); // แสดงข้อความเมื่อไคลเอนต์ตัดการเชื่อมต่อ
        });
    });
};
