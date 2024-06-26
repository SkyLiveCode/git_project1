const db = require('../config/database');

// ฟังก์ชัน showCalculatePage สำหรับแสดงหน้าคำนวณ
exports.showCalculatePage = (req, res) => {
    res.render('html/pages-calculates/calculate');  // เรนเดอร์ไฟล์เทมเพลต 'calculate.ejs'
};

// ฟังก์ชันสำหรับดึงข้อมูล inputs จากฐานข้อมูล
exports.getInputs = async (req, res) => {
    try {
        const sql = 'SELECT inputs FROM calculationstest WHERE id = 1';
        const [result] = await db.query(sql);
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
        const sql = 'UPDATE calculationstest SET inputs = ? WHERE id = 1';  // คำสั่ง SQL สำหรับอัปเดตข้อมูล
        await db.query(sql, [JSON.stringify(inputs)]);
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
            const sumResult = Number(data.input1) + Number(data.input2);
            const differenceResult = Number(data.input3) - Number(data.input4);
            const signatureStatus1 = data.signature1 ? 'Signed' : 'Not Signed';
            const signatureStatus2 = data.signature2 ? 'Signed' : 'Not Signed';
            const signatureStatus3 = data.signature3 ? 'Signed' : 'Not Signed';
            socket.emit('calculatedResult', { sumResult, differenceResult, signatureStatus1, signatureStatus2, signatureStatus3 });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected'); // แสดงข้อความเมื่อไคลเอนต์ตัดการเชื่อมต่อ
        });
    });
};
