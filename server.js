const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Supabase credentials
const supabaseUrl = 'https://lyuzgxlnqxjmwpcdlcbi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5dXpneGxucXhqbXdwY2RsY2JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwNTUxODksImV4cCI6MjA2NDYzMTE4OX0.2bU6e5E7IEJljaXCyLMkmUXG2hwzThvi25EvrdQyJuI';

const supabase = createClient(supabaseUrl, supabaseKey);

// Helper for errors
function handleError(res, error) {
  console.error(error);
  return res.status(500).json({ error: 'Database error' });
}

// Patients
app.get('/api/patients', async (req, res) => {
  const { data, error } = await supabase.from('patients').select('*');
  if (error) return handleError(res, error);
  res.json(data);
});

app.post('/api/patients', async (req, res) => {
  const { name, area_code, number } = req.body;
  const { data, error } = await supabase.from('patients').insert({ name, area_code, number }).select();
  if (error) return handleError(res, error);
  res.json(data);
});

app.put('/api/patients/:id', async (req, res) => {
  const { id } = req.params;
  const { name, area_code, number } = req.body;
  const { data, error } = await supabase.from('patients').update({ name, area_code, number }).eq('patient_id', id).select();
  if (error) return handleError(res, error);
  res.json(data);
});

app.delete('/api/patients/:id', async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('patients').delete().eq('patient_id', id);
  if (error) return handleError(res, error);
  res.json({ message: 'Patient deleted' });
});

// Medications
app.get('/api/medications', async (req, res) => {
  const { data, error } = await supabase.from('medications').select('*');
  if (error) return handleError(res, error);
  res.json(data);
});

app.post('/api/medications', async (req, res) => {
  const { name, end_date, patient_id } = req.body;
  const { data, error } = await supabase.from('medications').insert({ name, end_date, patient_id }).select();
  if (error) return handleError(res, error);
  res.json(data);
});

// Appointments
app.get('/api/appointments', async (req, res) => {
  const { data, error } = await supabase.from('appointments').select('*');
  if (error) return handleError(res, error);
  res.json(data);
});

app.post('/api/appointments', async (req, res) => {
  const { date, frequency, patient_id } = req.body;
  const { data, error } = await supabase.from('appointments').insert({ date, frequency, patient_id }).select();
  if (error) return handleError(res, error);
  res.json(data);
});

// Consultations
app.get('/api/consultations', async (req, res) => {
  const { data, error } = await supabase.from('consultations').select('*');
  if (error) return handleError(res, error);
  res.json(data);
});

app.post('/api/consultations', async (req, res) => {
  const { doctor_name, date, remarks, patient_id, doctor_id } = req.body;
  const { data, error } = await supabase.from('consultations').insert({ doctor_name, date, remarks, patient_id, doctor_id }).select();
  if (error) return handleError(res, error);
  res.json(data);
});

// Doctors
app.get('/api/doctors', async (req, res) => {
  const { data, error } = await supabase.from('doctors').select('*');
  if (error) return handleError(res, error);
  res.json(data);
});

app.post('/api/doctors', async (req, res) => {
  const { name, recovery_status } = req.body;
  const { data, error } = await supabase.from('doctors').insert({ name, recovery_status }).select();
  if (error) return handleError(res, error);
  res.json(data);
});

// Fallback: serve index.html for all unmatched routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Use Render's dynamic port or fallback to 4000 locally
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
