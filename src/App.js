import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>Promt Employee Management</h1>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/employees">Employees</Link></li>
          <li><Link to="/add-employee">Add Employee</Link></li>
        </ul>
      </nav>
      
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/add-employee" element={<EmployeeForm />} />
          <Route path="/edit-employee/:id" element={<EmployeeForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;