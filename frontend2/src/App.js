import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './components/PatientList';
import PatientDetail from './components/PatientDetail';
import AuthRequestForm from './components/AuthRequestForm';
import AddPatient from './components/AddPatient';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patient/:id" element={<PatientDetail />} />
          <Route path="/auth-request" element={<AuthRequestForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;