import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CFormFeedback,
  CAlert
} from '@coreui/react';
import employeeService from '../services/employeeService';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id && id !== 'new');

  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '', color: 'success' });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  useEffect(() => {
    if (isEdit) {
      const employee = employeeService.getEmployeeById(id);
      if (employee) {
        setFormData({
          firstName: employee.firstName || '',
          lastName: employee.lastName || '',
          phone: employee.phone || '',
          email: employee.email || ''
        });
      } else {
        setAlert({
          visible: true,
          message: 'Employee not found',
          color: 'danger'
        });
      }
    }
  }, [id, isEdit]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    try {
      if (isEdit) {
        employeeService.updateEmployee(id, formData);
        setAlert({
          visible: true,
          message: 'Employee updated successfully!',
          color: 'success'
        });
      } else {
        employeeService.createEmployee(formData);
        setAlert({
          visible: true,
          message: 'Employee created successfully!',
          color: 'success'
        });
      }

      // Redirect back to list after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setAlert({
        visible: true,
        message: 'Error saving employee data',
        color: 'danger'
      });
    }

    setValidated(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>
                {isEdit ? 'Edit Employee' : 'Add New Employee'}
              </strong>
            </CCardHeader>
            <CCardBody>
              {alert.visible && (
                <CAlert
                  color={alert.color}
                  dismissible
                  onClose={() => setAlert({ ...alert, visible: false })}
                >
                  {alert.message}
                </CAlert>
              )}
              
              <CForm
                className="row g-3 needs-validation"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={6}>
                  <CFormLabel htmlFor="firstName">First Name *</CFormLabel>
                  <CFormInput
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a valid first name.
                  </CFormFeedback>
                </CCol>
                
                <CCol md={6}>
                  <CFormLabel htmlFor="lastName">Last Name *</CFormLabel>
                  <CFormInput
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a valid last name.
                  </CFormFeedback>
                </CCol>
                
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Phone *</CFormLabel>
                  <CFormInput
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="081-234-5678"
                    required
                  />
                  <CFormFeedback invalid>
                    Please provide a valid phone number (format: 081-234-5678).
                  </CFormFeedback>
                </CCol>
                
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@domain.com"
                  />
                  <CFormFeedback invalid>
                    Please provide a valid email address.
                  </CFormFeedback>
                </CCol>
                
                <CCol xs={12}>
                  <CButton color="primary" type="submit">
                    {isEdit ? 'Update Employee' : 'Save Employee'}
                  </CButton>
                  <CButton color="secondary" className="ms-2" onClick={handleCancel}>
                    Cancel
                  </CButton>
                </CCol>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EmployeeForm;