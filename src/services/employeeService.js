import employeesData from '../data/employees.json';

// Since we're working with a JSON file in a React app, we'll simulate
// database operations with localStorage to persist changes
const STORAGE_KEY = 'employees';

class EmployeeService {
  constructor() {
    // Initialize localStorage with JSON data if not exists
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employeesData));
    }
  }

  // Get all employees
  getAllEmployees() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Get employee by ID
  getEmployeeById(id) {
    const employees = this.getAllEmployees();
    return employees.find(emp => emp.id === id);
  }

  // Create new employee
  createEmployee(employee) {
    const employees = this.getAllEmployees();
    const newId = (Math.max(...employees.map(emp => parseInt(emp.id)), 0) + 1).toString();
    const newEmployee = { ...employee, id: newId };
    employees.push(newEmployee);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    return newEmployee;
  }

  // Update employee
  updateEmployee(id, updatedEmployee) {
    const employees = this.getAllEmployees();
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      employees[index] = { ...updatedEmployee, id };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
      return employees[index];
    }
    return null;
  }

  // Delete employee
  deleteEmployee(id) {
    const employees = this.getAllEmployees();
    const filteredEmployees = employees.filter(emp => emp.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredEmployees));
    return true;
  }
}

const employeeService = new EmployeeService();
export default employeeService;