// เชื่อมต่อกับเซิร์ฟเวอร์ Socket.IO
const socket = io();

// ฟังก์ชันสำหรับการคำนวณ
function calculate() {
  // ดึงค่าจาก input ที่มี id เป็น input1, input2, input3, input4, และ signature
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  const input3 = document.getElementById('input3').value;
  const input4 = document.getElementById('input4').value;
  const signature = document.getElementById('signature').value;
  
  // ส่งค่า input1, input2, input3, input4, และ signature ไปยังเซิร์ฟเวอร์ผ่าน event 'calculate'
  socket.emit('calculate', { input1, input2, input3, input4, signature });
}

// เพิ่ม event listener สำหรับฟอร์มคำนวณ เพื่อฟังการเปลี่ยนแปลงของ input
document.getElementById('calcForm').addEventListener('input', calculate);

// ฟัง event 'calculatedResult' จากเซิร์ฟเวอร์
socket.on('calculatedResult', (data) => {
  // แสดงผลลัพธ์ที่ได้รับจากเซิร์ฟเวอร์ใน element ที่มี id เป็น sumResult, differenceResult, และ signatureStatus
  document.getElementById('sumResult').innerText = data.sumResult;
  document.getElementById('differenceResult').innerText = data.differenceResult;
  document.getElementById('signatureStatus').innerText = data.signatureStatus;
});

// เรียกฟังก์ชันคำนวณเมื่อหน้าเว็บโหลดเสร็จ
window.onload = calculate;
