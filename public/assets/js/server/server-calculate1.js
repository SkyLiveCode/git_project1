// เชื่อมต่อกับเซิร์ฟเวอร์ Socket.IO
const socket = io();

// ฟังก์ชันจัดการการส่งข้อมูลของฟอร์ม
function calculate(event) {
  event.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
  
  const form = document.getElementById('calcForm'); // ดึงฟอร์มที่มี id เป็น 'calcForm'
  const formData = new FormData(form); // สร้าง FormData object จากฟอร์ม

  const data = {}; // สร้างออบเจ็กต์สำหรับเก็บข้อมูลฟอร์ม
  formData.forEach((value, key) => {
    data[key] = value; // ใส่ข้อมูลฟอร์มลงในออบเจ็กต์ data
  });

  fetch('/calculate1', {
    method: 'POST', // ใช้เมธอด POST
    headers: {
      'Content-Type': 'application/json', // กำหนดหัวข้อ Content-Type เป็น JSON
    },
    body: JSON.stringify(data), // แปลงออบเจ็กต์ data เป็น JSON และส่งไป
  })
  .then(response => response.json()) // แปลงการตอบกลับเป็น JSON
  .then(data => {
    document.getElementById('sumResult').innerText = data.sumResult; // แสดงผลลัพธ์การคำนวณผลรวม
    document.getElementById('differenceResult').innerText = data.differenceResult; // แสดงผลลัพธ์การคำนวณผลต่าง
    document.getElementById('signatureStatus1').innerText = data.signatureStatus1; // แสดงสถานะลายเซ็นต์ 1
    document.getElementById('signatureStatus2').innerText = data.signatureStatus2; // แสดงสถานะลายเซ็นต์ 2
    document.getElementById('signatureStatus3').innerText = data.signatureStatus3; // แสดงสถานะลายเซ็นต์ 3

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
document.getElementById('calcForm').addEventListener('submit', calculate); // ฟังก์ชัน calculate จะถูกเรียกเมื่อฟอร์มถูกส่ง

// เพิ่มการตรวจสอบแบบเรียลไทม์สำหรับการคำนวณ
document.getElementById('calcForm').addEventListener('input', () => {
  const formData = new FormData(document.getElementById('calcForm')); // สร้าง FormData object จากฟอร์ม
  const data = {}; // สร้างออบเจ็กต์สำหรับเก็บข้อมูลฟอร์ม
  formData.forEach((value, key) => {
    data[key] = value; // ใส่ข้อมูลฟอร์มลงในออบเจ็กต์ data
  });
  socket.emit('calculate', data); // ส่งข้อมูลไปยังเซิร์ฟเวอร์ผ่าน Socket.IO
});

socket.on('calculatedResult', (data) => { // รับผลลัพธ์ที่คำนวณแล้วจากเซิร์ฟเวอร์
  document.getElementById('sumResult').innerText = data.sumResult; // แสดงผลลัพธ์การคำนวณผลรวม
  document.getElementById('differenceResult').innerText = data.differenceResult; // แสดงผลลัพธ์การคำนวณผลต่าง
  document.getElementById('signatureStatus1').innerText = data.signatureStatus1; // แสดงสถานะลายเซ็นต์ 1
  document.getElementById('signatureStatus2').innerText = data.signatureStatus2; // แสดงสถานะลายเซ็นต์ 2
  document.getElementById('signatureStatus3').innerText = data.signatureStatus3; // แสดงสถานะลายเซ็นต์ 3

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
