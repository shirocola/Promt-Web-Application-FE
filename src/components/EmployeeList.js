import React, { useState, useEffect } from 'react';
import employeeService from '../services/employeeService';
import { formatCurrency, formatDate } from '../utils/formHelpers';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const employeeData = employeeService.getAllEmployees();
      setEmployees(employeeData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        employeeService.deleteEmployee(id);
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="employee-list">
      <h2>All Employees</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="employees-grid">
          {employees.map(employee => (
            <div key={employee.id} className="employee-card">
              <h3>{employee.firstName} {employee.lastName}</h3>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              {employee.salary && <p><strong>Salary:</strong> {formatCurrency(employee.salary)}</p>}
              {employee.hireDate && <p><strong>Hire Date:</strong> {formatDate(employee.hireDate)}</p>}
              <div className="employee-actions">
                <button className="btn">Edit</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList;