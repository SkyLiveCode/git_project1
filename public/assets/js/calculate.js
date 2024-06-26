// เชื่อมต่อกับเซิร์ฟเวอร์ Socket.IO
const socket = io();

// ฟังก์ชันสำหรับการคำนวณ
function calculate() {
  const calinput1 = document.getElementById('calinput1').value;
  const calinput2 = document.getElementById('calinput2').value;
  const calinput3 = document.getElementById('calinput3').value;
  const calinput4 = document.getElementById('calinput4').value;
  const signature1 = document.getElementById('signature1').value;
  const signature2 = document.getElementById('signature2').value;
  const signature3 = document.getElementById('signature3').value;
  const textarea1 = document.getElementById('textarea1').value;
  const textarea2 = document.getElementById('textarea2').value;
  const radio1 = document.querySelector('input[name="radio1"]:checked') ? document.querySelector('input[name="radio1"]:checked').value : '';
  const radio2 = document.querySelector('input[name="radio2"]:checked') ? document.querySelector('input[name="radio2"]:checked').value : '';
  const infoinput1 = document.getElementById('infoinput1').value;
  const infoinput2 = document.getElementById('infoinput2').value;
  const infoinput3 = document.getElementById('infoinput3').value;
  const infoinput4 = document.getElementById('infoinput4').value;

  socket.emit('calculate', { calinput1, calinput2, calinput3, calinput4, signature1, signature2, signature3, textarea1, textarea2, radio1, radio2, infoinput1, infoinput2, infoinput3, infoinput4 });
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

  // Setting radio buttons
  document.getElementById('radio1Option1').checked = data.radio1 === 'option1';
  document.getElementById('radio1Option2').checked = data.radio1 === 'option2';
  document.getElementById('radio1Option3').checked = data.radio1 === 'option3';
  document.getElementById('radio2Option1').checked = data.radio2 === 'option1';
  document.getElementById('radio2Option2').checked = data.radio2 === 'option2';
  document.getElementById('radio2Option3').checked = data.radio2 === 'option3';
  document.getElementById('infoinput1').value = data.infoinput1 || '';
  document.getElementById('infoinput2').value = data.infoinput2 || '';
  document.getElementById('infoinput3').value = data.infoinput3 || '';
  document.getElementById('infoinput4').value = data.infoinput4 || '';
});

// เรียกฟังก์ชันคำนวณเมื่อหน้าเว็บโหลดเสร็จ
window.onload = calculate;
