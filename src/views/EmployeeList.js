import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons';
import { MaterialReactTable } from 'material-react-table';
import employeeService from '../services/employeeService';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ visible: false, employee: null });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    const data = employeeService.getAllEmployees();
    setEmployees(data);
  };

  const handleAddEmployee = () => {
    navigate('/employee/new');
  };

  const handleEditEmployee = (id) => {
    navigate(`/employee/edit/${id}`);
  };

  const handleDeleteEmployee = (employee) => {
    setDeleteModal({ visible: true, employee });
  };

  const confirmDelete = () => {
    if (deleteModal.employee) {
      employeeService.deleteEmployee(deleteModal.employee.id);
      loadEmployees();
      setDeleteModal({ visible: false, employee: null });
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ visible: false, employee: null });
  };

  const columns = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 80,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      size: 150,
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      size: 150,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      size: 150,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 200,
    },
    {
      id: 'actions',
      header: 'Actions',
      size: 150,
      Cell: ({ row }) => (
        <div>
          <CButton
            color="info"
            size="sm"
            className="me-2"
            onClick={() => handleEditEmployee(row.original.id)}
          >
            <CIcon icon={cilPencil} size="sm" />
          </CButton>
          <CButton
            color="danger"
            size="sm"
            onClick={() => handleDeleteEmployee(row.original)}
          >
            <CIcon icon={cilTrash} size="sm" />
          </CButton>
        </div>
      ),
    },
  ], []);

  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Employee List</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <CButton color="primary" onClick={handleAddEmployee}>
                  <CIcon icon={cilPlus} size="sm" className="me-2" />
                  Add New Employee
                </CButton>
              </div>
              <MaterialReactTable
                columns={columns}
                data={employees}
                enableRowSelection={false}
                enableColumnOrdering
                enableGlobalFilter
                muiTableContainerProps={{
                  sx: {
                    minHeight: '400px',
                  },
                }}
                muiTableProps={{
                  sx: {
                    fontFamily: 'Open Sans, sans-serif',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Delete Confirmation Modal */}
      <CModal
        visible={deleteModal.visible}
        onClose={cancelDelete}
        aria-labelledby="delete-modal-title"
      >
        <CModalHeader>
          <CModalTitle id="delete-modal-title">Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to delete employee{' '}
          <strong>
            {deleteModal.employee?.firstName} {deleteModal.employee?.lastName}
          </strong>
          ?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={cancelDelete}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default EmployeeList;