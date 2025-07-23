import { sampleEmployees } from '../data/employees.js';

// Since we're working with sample data in a React app, we'll simulate
// database operations with localStorage to persist changes
const STORAGE_KEY = 'employees';

class EmployeeService {
  constructor() {
    this.initializeData();
  }

  // Initialize data with sample employees
  initializeData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleEmployees));
  }

  // Clear all employees
  clearAllEmployees() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  }

  // Get all employees (return a copy to prevent mutation)
  getAllEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    const employees = data ? JSON.parse(data) : [];
    return JSON.parse(JSON.stringify(employees)); // Deep copy
  }

  // Get employee by ID (return a copy)
  getEmployeeById(id) {
    if (id === undefined || id === null) {
      throw new Error('Employee ID is required');
    }

    const employees = this.getAllEmployees();
    const employee = employees.find(emp => emp.id === parseInt(id));
    
    if (!employee) {
      throw new Error('Employee not found');
    }

    return JSON.parse(JSON.stringify(employee)); // Deep copy
  }

  // Validate employee data
  validateEmployee(employee, isUpdate = false, existingId = null) {
    if (!employee) {
      throw new Error('Employee data is required');
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'position'];
    
    for (const field of requiredFields) {
      if (!employee[field] || (typeof employee[field] === 'string' && employee[field].trim() === '')) {
        throw new Error(`${field} is required`);
      }
    }

    // Check for duplicate email
    const employees = this.getAllEmployees();
    const existingEmployee = employees.find(emp => 
      emp.email === employee.email && emp.id !== existingId
    );
    
    if (existingEmployee) {
      throw new Error('Employee with this email already exists');
    }
  }

  // Create new employee
  createEmployee(employee) {
    this.validateEmployee(employee);

    const employees = this.getAllEmployees();
    const newId = employees.length > 0 
      ? Math.max(...employees.map(emp => parseInt(emp.id))) + 1 
      : 1;
    
    const now = new Date().toISOString();
    const newEmployee = { 
      ...employee, 
      id: newId,
      createdAt: now,
      updatedAt: now
    };
    
    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return JSON.parse(JSON.stringify(newEmployee)); // Deep copy
  }

  // Update employee
  updateEmployee(id, updatedData) {
    if (id === undefined || id === null) {
      throw new Error('Employee ID is required');
    }

    if (!updatedData) {
      throw new Error('Update data is required');
    }

    const employees = this.getAllEmployees();
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Employee not found');
    }

    const existingEmployee = employees[index];
    const updatedEmployee = { ...existingEmployee, ...updatedData };

    // Validate the updated employee data
    this.validateEmployee(updatedEmployee, true, parseInt(id));

    updatedEmployee.updatedAt = new Date().toISOString();
    employees[index] = updatedEmployee;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    
    return JSON.parse(JSON.stringify(updatedEmployee)); // Deep copy
  }

  // Delete employee
  deleteEmployee(id) {
    if (id === undefined || id === null) {
      throw new Error('Employee ID is required');
    }

    const employees = this.getAllEmployees();
    const employeeIndex = employees.findIndex(emp => emp.id === parseInt(id));
    
    if (employeeIndex === -1) {
      throw new Error('Employee not found');
    }

    const deletedEmployee = employees[employeeIndex];
    const filteredEmployees = employees.filter(emp => emp.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEmployees));
    
    return JSON.parse(JSON.stringify(deletedEmployee)); // Deep copy
  }

  // Search employees by name, email, or position
  searchEmployees(searchTerm) {
    const employees = this.getAllEmployees();
    
    if (!searchTerm || searchTerm.trim() === '') {
      return employees;
    }

    const term = searchTerm.toLowerCase();
    return employees.filter(emp => 
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      (emp.position && emp.position.toLowerCase().includes(term))
    );
  }

  // Get employees by department
  getEmployeesByDepartment(department) {
    const employees = this.getAllEmployees();
    
    if (!department || department.trim() === '') {
      return employees;
    }

    const dept = department.toLowerCase();
    return employees.filter(emp => 
      emp.department && emp.department.toLowerCase() === dept
    );
  }

  // Get total employee count
  getTotalEmployeeCount() {
    return this.getAllEmployees().length;
  }
}

const employeeService = new EmployeeService();
export default employeeService;