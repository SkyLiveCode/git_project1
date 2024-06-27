// เชื่อมต่อกับเซิร์ฟเวอร์ Socket.IO
const socket = io();

// ฟังก์ชันจัดการการส่งข้อมูลของฟอร์ม
function calculate(event) {
  event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
  
  const form = document.getElementById('calcForm');
  const formData = new FormData(form);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch('/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('sumResult').innerText = data.sumResult;
    document.getElementById('differenceResult').innerText = data.differenceResult;
    document.getElementById('signatureStatus1').innerText = data.signatureStatus1;
    document.getElementById('signatureStatus2').innerText = data.signatureStatus2;
    document.getElementById('signatureStatus3').innerText = data.signatureStatus3;

    // ตั้งค่าปุ่มเลือกแบบตัวเลือก
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
}

// เพิ่ม event listener สำหรับการส่งฟอร์ม
document.getElementById('calcForm').addEventListener('submit', calculate);

// เพิ่มการตรวจสอบแบบเรียลไทม์สำหรับการคำนวณ
document.getElementById('calcForm').addEventListener('input', () => {
  const formData = new FormData(document.getElementById('calcForm'));
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  socket.emit('calculate', data);
});

socket.on('calculatedResult', (data) => {
  document.getElementById('sumResult').innerText = data.sumResult;
  document.getElementById('differenceResult').innerText = data.differenceResult;
  document.getElementById('signatureStatus1').innerText = data.signatureStatus1;
  document.getElementById('signatureStatus2').innerText = data.signatureStatus2;
  document.getElementById('signatureStatus3').innerText = data.signatureStatus3;

  // ตั้งค่าปุ่มเลือกแบบตัวเลือก
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
