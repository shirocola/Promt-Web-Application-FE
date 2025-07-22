import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CContainer, CRow, CCol, CHeader, CHeaderBrand, CHeaderNav } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import EmployeeList from './views/EmployeeList';
import EmployeeForm from './views/EmployeeForm';

function App() {
  return (
    <Router>
      <div className="App">
        <CHeader className="mb-4">
          <CContainer fluid>
            <CHeaderBrand href="/">
              <h4 className="mb-0">Employee Management System</h4>
            </CHeaderBrand>
          </CContainer>
        </CHeader>
        
        <CContainer fluid>
          <CRow>
            <CCol>
              <Routes>
                <Route path="/" element={<EmployeeList />} />
                <Route path="/employee/new" element={<EmployeeForm />} />
                <Route path="/employee/edit/:id" element={<EmployeeForm />} />
              </Routes>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </Router>
  );
}

export default App;