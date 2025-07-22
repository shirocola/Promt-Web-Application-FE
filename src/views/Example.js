import React from 'react';
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons';

const Example = () => {
  return (
    <CContainer fluid>
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Example List</strong>
            </CCardHeader>
            <CCardBody>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                <CButton color="primary">
                  <CIcon icon={cilPlus} size="sm" className="me-2" />
                  Add New
                </CButton>
              </div>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>John Doe</CTableDataCell>
                    <CTableDataCell>john@example.com</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" size="sm" className="me-2">
                        <CIcon icon={cilPencil} size="sm" />
                      </CButton>
                      <CButton color="danger" size="sm">
                        <CIcon icon={cilTrash} size="sm" />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Example;