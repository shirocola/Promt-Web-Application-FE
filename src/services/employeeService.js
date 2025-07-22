// Employee Service - CRUD operations for employee management
class EmployeeService {
  constructor() {
    this.employees = [];
    this.nextId = 1;
    this.initializeData();
  }

  // Initialize with sample data
  initializeData() {
    const sampleEmployees = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        position: 'Software Engineer',
        department: 'Engineering',
        salary: 75000,
        hireDate: '2023-01-15'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        position: 'Product Manager',
        department: 'Product',
        salary: 85000,
        hireDate: '2022-11-20'
      }
    ];
    
    this.employees = sampleEmployees;
    this.nextId = 3;
  }

  // Create a new employee
  createEmployee(employeeData) {
    if (!employeeData || typeof employeeData !== 'object') {
      throw new Error('Employee data is required');
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'position'];
    for (const field of requiredFields) {
      if (!employeeData[field] || employeeData[field].trim() === '') {
        throw new Error(`${field} is required`);
      }
    }

    // Check if email already exists
    if (this.employees.some(emp => emp.email === employeeData.email)) {
      throw new Error('Employee with this email already exists');
    }

    const newEmployee = {
      id: this.nextId++,
      ...employeeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.employees.push(newEmployee);
    return newEmployee;
  }

  // Get all employees
  getAllEmployees() {
    return [...this.employees];
  }

  // Get employee by ID
  getEmployeeById(id) {
    if (!id) {
      throw new Error('Employee ID is required');
    }

    const employee = this.employees.find(emp => emp.id === parseInt(id));
    if (!employee) {
      throw new Error('Employee not found');
    }

    return { ...employee };
  }

  // Update employee
  updateEmployee(id, updateData) {
    if (!id) {
      throw new Error('Employee ID is required');
    }

    if (!updateData || typeof updateData !== 'object') {
      throw new Error('Update data is required');
    }

    const employeeIndex = this.employees.findIndex(emp => emp.id === parseInt(id));
    if (employeeIndex === -1) {
      throw new Error('Employee not found');
    }

    // Check if email is being updated and if it conflicts
    if (updateData.email && updateData.email !== this.employees[employeeIndex].email) {
      if (this.employees.some(emp => emp.email === updateData.email)) {
        throw new Error('Employee with this email already exists');
      }
    }

    const updatedEmployee = {
      ...this.employees[employeeIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    this.employees[employeeIndex] = updatedEmployee;
    return { ...updatedEmployee };
  }

  // Delete employee
  deleteEmployee(id) {
    if (!id) {
      throw new Error('Employee ID is required');
    }

    const employeeIndex = this.employees.findIndex(emp => emp.id === parseInt(id));
    if (employeeIndex === -1) {
      throw new Error('Employee not found');
    }

    const deletedEmployee = this.employees.splice(employeeIndex, 1)[0];
    return { ...deletedEmployee };
  }

  // Search employees
  searchEmployees(searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
      return this.getAllEmployees();
    }

    const term = searchTerm.toLowerCase();
    return this.employees.filter(emp => 
      emp.firstName.toLowerCase().includes(term) ||
      emp.lastName.toLowerCase().includes(term) ||
      emp.email.toLowerCase().includes(term) ||
      emp.position.toLowerCase().includes(term) ||
      emp.department.toLowerCase().includes(term)
    );
  }

  // Get employees by department
  getEmployeesByDepartment(department) {
    if (!department) {
      return this.getAllEmployees();
    }

    return this.employees.filter(emp => 
      emp.department.toLowerCase() === department.toLowerCase()
    );
  }

  // Get total employee count
  getTotalEmployeeCount() {
    return this.employees.length;
  }

  // Clear all employees (for testing)
  clearAllEmployees() {
    this.employees = [];
    this.nextId = 1;
  }
}

// Export singleton instance
const employeeService = new EmployeeService();
export default employeeService;