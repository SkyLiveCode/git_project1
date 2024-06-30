// ฟังก์ชันสำหรับดึงข้อมูล inputs จากเซิร์ฟเวอร์
function fetchInputs() {
  fetch('/get-inputs1') // เรียกข้อมูลจากเซิร์ฟเวอร์
    .then(response => response.json()) // แปลงข้อมูลที่ได้รับเป็น JSON
    .then(data => {
      if (data.inputs) { // ตรวจสอบว่ามีข้อมูล inputs หรือไม่
        Object.keys(data.inputs).forEach(key => { // วนลูปผ่านทุกคีย์ใน inputs
          if (document.getElementById(key)) { // ถ้ามีองค์ประกอบในหน้า HTML ที่มี ID ตรงกับคีย์
            document.getElementById(key).value = data.inputs[key] || ''; // ตั้งค่าค่าให้กับองค์ประกอบนั้น
          }
        });

        // ตั้งค่าปุ่มเลือกแบบตัวเลือกตามข้อมูลที่ได้รับ
        if (data.inputs.radio1) {
          document.querySelector(`input[name="radio1"][value="${data.inputs.radio1}"]`).checked = true;
        }
        if (data.inputs.radio2) {
          document.querySelector(`input[name="radio2"][value="${data.inputs.radio2}"]`).checked = true;
        }

        // เรียกฟังก์ชันส่งข้อมูลเพื่อแสดงผลลัพธ์เบื้องต้น
        sendInputs(data.inputs);

        // อัพเดทสถานะของ signature1, signature2 และ signature3
        updateSignatureStatus('signature1', 'bg_signatureStatus1');
        updateSignatureStatus('signature2', 'bg_signatureStatus2');
        updateSignatureStatus('signature3', 'bg_signatureStatus3');
      }
    });
}

// ฟังก์ชันส่งข้อมูล inputs ไปยังเซิร์ฟเวอร์
function sendInputs(inputs) {
  const socket = io(); // สร้างการเชื่อมต่อ Socket.IO
  socket.emit('calculate', inputs); // ส่งข้อมูล inputs ไปยังเซิร์ฟเวอร์เพื่อคำนวณ
  socket.on('calculatedResult', (data) => { // รับผลลัพธ์ที่คำนวณแล้วจากเซิร์ฟเวอร์
    document.getElementById('sumResult').textContent = data.sumResult;
    document.getElementById('differenceResult').textContent = data.differenceResult;
    document.getElementById('signatureStatus1').textContent = data.signatureStatus1;
    document.getElementById('signatureStatus2').textContent = data.signatureStatus2;
    document.getElementById('signatureStatus3').textContent = data.signatureStatus3;

    // แสดง/ซ่อนรูปภาพตามลายเซ็นต์ 3
    const signature3 = document.getElementById('signature3').value.toLowerCase();
    const signatureImage = document.getElementById('signatureImage');
    if (signature3 === 'sky') {
      signatureImage.src = 'path_to_sky_image.jpg';
      signatureImage.style.display = 'block';
    } else if (signature3 === 'นายพงศ์สกาย รุ่งรพีพรพงษ์') {
      signatureImage.src = 'path_to_nezuko_image.jpg';
      signatureImage.style.display = 'block';
    } else {
      signatureImage.style.display = 'none';
    }

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

    // อัพเดทสถานะของ signature1, signature2 และ signature3
    updateSignatureStatus('signature1', 'bg_signatureStatus1');
    updateSignatureStatus('signature2', 'bg_signatureStatus2');
    updateSignatureStatus('signature3', 'bg_signatureStatus3');
  });
}

// เรียกฟังก์ชัน fetchInputs เมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', fetchInputs); // ดึงข้อมูล inputs เมื่อโหลดหน้าเว็บ

// ฟังก์ชันสำหรับกรอกข้อมูลลายเซ็นต์
document.getElementById('fillSignature1').addEventListener('click', function() {
  const signature1Input = document.getElementById('signature1');
  if (!signature1Input.value) {
    signature1Input.value = userName;
    sendInputs(getInputs());
  }
  updateSignatureStatus('signature1', 'bg_signatureStatus1'); // อัพเดทสถานะของ signature1
});

document.getElementById('fillSignature2').addEventListener('click', function() {
  const signature2Input = document.getElementById('signature2');
  if (!signature2Input.value) {
    signature2Input.value = userName;
    sendInputs(getInputs());
  }
  updateSignatureStatus('signature2', 'bg_signatureStatus2'); // อัพเดทสถานะของ signature2
});

document.getElementById('fillSignature3').addEventListener('click', function() {
  const signature3Input = document.getElementById('signature3');
  if (!signature3Input.value) {
    signature3Input.value = userName;
    sendInputs(getInputs());
  }
  updateSignatureStatus('signature3', 'bg_signatureStatus3'); // อัพเดทสถานะของ signature3
});

// ฟังก์ชันสำหรับดึงข้อมูล inputs จากฟอร์ม
function getInputs() {
  const inputs = {};
  document.querySelectorAll('#calcForm input, #calcForm textarea').forEach(input => {
    if (input.type === 'radio') {
      if (input.checked) {
        inputs[input.name] = input.value;
      }
    } else {
      inputs[input.name] = input.value;
    }
  });
  return inputs;
}

// ส่งข้อมูลเมื่อฟอร์มถูก submit
document.getElementById('calcForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const inputs = getInputs();

  fetch('/update-inputs1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: inputs }),
  }).then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Inputs updated successfully');
        sendInputs(inputs);
      }
    });
});

// ตรวจสอบลายเซ็นต์ 3 แบบเรียลไทม์
document.getElementById('signature3').addEventListener('input', function() {
  const signature3 = document.getElementById('signature3').value.toLowerCase();
  const signatureImage = document.getElementById('signatureImage');
  if (signature3 === 'sky') {
    signatureImage.src = 'path_to_sky_image.jpg';
    signatureImage.style.display = 'block';
  } else if (signature3 === 'นายพงศ์สกาย รุ่งรพีพรพงษ์') {
    signatureImage.src = 'path_to_nezuko_image.jpg';
    signatureImage.style.display = 'block';
  } else {
    signatureImage.style.display = 'none';
  }
  updateSignatureStatus('signature3', 'bg_signatureStatus3'); // อัพเดทสถานะของ signature3
});

// ฟังก์ชันสำหรับอัพเดทสถานะของ signature
function updateSignatureStatus(inputId, statusId) {
  const inputElement = document.getElementById(inputId);
  const statusElement = document.getElementById(statusId);

  if (inputElement.value) {
    statusElement.className = "mt-2 badge rounded-pill bg-success";
    statusElement.textContent = "Completed";
  } else {
    statusElement.className = "mt-2 badge rounded-pill bg-warning";
    statusElement.textContent = "Pending";
  }
}

// เพิ่ม event listener สำหรับตรวจสอบการเปลี่ยนแปลงของ signature1, signature2 และ signature3
document.getElementById('signature1').addEventListener('input', function() {
  updateSignatureStatus('signature1', 'bg_signatureStatus1');
});

document.getElementById('signature2').addEventListener('input', function() {
  updateSignatureStatus('signature2', 'bg_signatureStatus2');
});

document.getElementById('signature3').addEventListener('input', function() {
  updateSignatureStatus('signature3', 'bg_signatureStatus3');
});
