async function fetchData(entity, listId) {
    const res = await fetch(`http://localhost:4000/api/${entity}`);
    const data = await res.json();
    const list = document.getElementById(listId);
    list.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = JSON.stringify(item);
      list.appendChild(li);
    });
  }
  
  async function populateSelect(endpoint, selectId, labelField = 'name', valueField = 'patient_id') {
    const res = await fetch(`http://localhost:4000/api/${endpoint}`);
    const data = await res.json();
    const select = document.getElementById(selectId);
    select.innerHTML = '';
    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item[valueField];
      option.textContent = `${item[labelField]} (${item[valueField]})`;
      select.appendChild(option);
    });
  }
  
  window.onload = () => {
    fetchData('patients', 'patientsList');
    fetchData('medications', 'medicationsList');
    fetchData('appointments', 'appointmentsList');
    fetchData('doctors', 'doctorsList');
    fetchData('consultations', 'consultationsList');
  
    populateSelect('patients', 'medicationPatientId');
    populateSelect('patients', 'appointmentPatientId');
    populateSelect('patients', 'consultationPatientId');
    populateSelect('doctors', 'consultationDoctorId', 'name', 'doctor_id');
  };
  
  // Add Patient
  document.getElementById('addPatientForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('patientName').value;
    const area_code = document.getElementById('areaCode').value;
    const number = document.getElementById('phoneNumber').value;
  
    await fetch('http://localhost:4000/api/patients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, area_code, number })
    });
  
    fetchData('patients', 'patientsList');
    e.target.reset();
  });
  
  // Add Medication
  document.getElementById('addMedicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('medicationName').value;
    const end_date = document.getElementById('medicationDate').value;
    const patient_id = document.getElementById('medicationPatientId').value;
  
    await fetch('http://localhost:4000/api/medications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, end_date, patient_id })
    });
  
    fetchData('medications', 'medicationsList');
    e.target.reset();
  });
  
  // Add Appointment
  document.getElementById('addAppointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = document.getElementById('appointmentDate').value;
    const frequency = document.getElementById('appointmentFrequency').value;
    const patient_id = document.getElementById('appointmentPatientId').value;
  
    await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, frequency, patient_id })
    });
  
    fetchData('appointments', 'appointmentsList');
    e.target.reset();
  });
  
  // Add Doctor
  document.getElementById('addDoctorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('doctorName').value;
    const recovery_status = document.getElementById('doctorRecoveryStatus').value;
  
    await fetch('http://localhost:4000/api/doctors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, recovery_status })
    });
  
    fetchData('doctors', 'doctorsList');
    e.target.reset();
  });
  
  // Add Consultation
  document.getElementById('addConsultationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const doctor_name = document.getElementById('consultationDoctorName').value;
    const date = document.getElementById('consultationDate').value;
    const remarks = document.getElementById('consultationRemarks').value;
    const patient_id = document.getElementById('consultationPatientId').value;
    const doctor_id = document.getElementById('consultationDoctorId').value;
  
    await fetch('http://localhost:4000/api/consultations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doctor_name, date, remarks, patient_id, doctor_id })
    });
  
    fetchData('consultations', 'consultationsList');
    e.target.reset();
  });
  