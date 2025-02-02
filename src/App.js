import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import RegistrationForm from './components/RegistrationForm';
import Index from './components/Index';
function App() {
  return (
    <Router>
      <Routes>
      <Route path="register" element={<RegistrationForm />} />
      <Route path='' element={<Index/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
