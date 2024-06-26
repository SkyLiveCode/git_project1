// เชื่อมต่อกับเซิร์ฟเวอร์ Socket.IO
const socket = io();

// ฟังก์ชันสำหรับการคำนวณ
function calculate() {
  const input1 = document.getElementById('input1').value;
  const input2 = document.getElementById('input2').value;
  const input3 = document.getElementById('input3').value;
  const input4 = document.getElementById('input4').value;
  const signature1 = document.getElementById('signature1').value;
  const signature2 = document.getElementById('signature2').value;
  const signature3 = document.getElementById('signature3').value;
  const textarea1 = document.getElementById('textarea1').value;
  const textarea2 = document.getElementById('textarea2').value;

  socket.emit('calculate', { input1, input2, input3, input4, signature1, signature2, signature3, textarea1, textarea2 });
}

// เพิ่ม event listener สำหรับฟอร์มคำนวณ เพื่อฟังการเปลี่ยนแปลงของ input
document.getElementById('calcForm').addEventListener('input', calculate);

// ฟัง event 'calculatedResult' จากเซิร์ฟเวอร์
socket.on('calculatedResult', (data) => {
  document.getElementById('sumResult').innerText = data.sumResult;
  document.getElementById('differenceResult').innerText = data.differenceResult;
  document.getElementById('signatureStatus1').innerText = data.signatureStatus1;
  document.getElementById('signatureStatus2').innerText = data.signatureStatus2;
  document.getElementById('signatureStatus3').innerText = data.signatureStatus3;
});

// เรียกฟังก์ชันคำนวณเมื่อหน้าเว็บโหลดเสร็จ
window.onload = calculate;
