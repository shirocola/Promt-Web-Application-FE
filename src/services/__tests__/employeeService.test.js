import employeeService from '../employeeService';

describe('EmployeeService', () => {
  beforeEach(() => {
    // Reset the service to initial state before each test
    employeeService.clearAllEmployees();
    employeeService.initializeData();
  });

  describe('createEmployee', () => {
    it('should create a new employee with valid data', () => {
      const employeeData = {
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice.johnson@example.com',
        position: 'UX Designer',
        department: 'Design',
        salary: 70000,
        hireDate: '2023-03-15'
      };

      const newEmployee = employeeService.createEmployee(employeeData);

      expect(newEmployee).toMatchObject(employeeData);
      expect(newEmployee.id).toBeDefined();
      expect(newEmployee.createdAt).toBeDefined();
      expect(newEmployee.updatedAt).toBeDefined();
    });

    it('should throw error when employee data is missing', () => {
      expect(() => {
        employeeService.createEmployee();
      }).toThrow('Employee data is required');

      expect(() => {
        employeeService.createEmployee(null);
      }).toThrow('Employee data is required');
    });

    it('should throw error when required fields are missing', () => {
      const incompleteData = {
        firstName: 'Alice'
        // missing lastName, email, position
      };

      expect(() => {
        employeeService.createEmployee(incompleteData);
      }).toThrow('lastName is required');
    });

    it('should throw error when email already exists', () => {
      const employeeData = {
        firstName: 'Bob',
        lastName: 'Wilson',
        email: 'john.doe@example.com', // This email already exists in sample data
        position: 'Developer'
      };

      expect(() => {
        employeeService.createEmployee(employeeData);
      }).toThrow('Employee with this email already exists');
    });

    it('should handle empty string fields as invalid', () => {
      const employeeData = {
        firstName: '',
        lastName: 'Wilson',
        email: 'bob.wilson@example.com',
        position: 'Developer'
      };

      expect(() => {
        employeeService.createEmployee(employeeData);
      }).toThrow('firstName is required');
    });
  });

  describe('getAllEmployees', () => {
    it('should return all employees', () => {
      const employees = employeeService.getAllEmployees();
      expect(employees).toHaveLength(2);
      expect(employees[0]).toMatchObject({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com'
      });
    });

    it('should return a copy of employees array', () => {
      const employees1 = employeeService.getAllEmployees();
      const employees2 = employeeService.getAllEmployees();
      
      expect(employees1).not.toBe(employees2);
      expect(employees1).toEqual(employees2);
    });
  });

  describe('getEmployeeById', () => {
    it('should return employee by valid ID', () => {
      const employee = employeeService.getEmployeeById(1);
      expect(employee).toMatchObject({
        id: 1,
        firstName: 'John',
        lastName: 'Doe'
      });
    });

    it('should throw error for invalid ID', () => {
      expect(() => {
        employeeService.getEmployeeById(999);
      }).toThrow('Employee not found');
    });

    it('should throw error when ID is missing', () => {
      expect(() => {
        employeeService.getEmployeeById();
      }).toThrow('Employee ID is required');
    });

    it('should return a copy of employee object', () => {
      const employee1 = employeeService.getEmployeeById(1);
      const employee2 = employeeService.getEmployeeById(1);
      
      expect(employee1).not.toBe(employee2);
      expect(employee1).toEqual(employee2);
    });
  });

  describe('updateEmployee', () => {
    it('should update employee with valid data', () => {
      const updateData = {
        firstName: 'Johnny',
        position: 'Senior Software Engineer'
      };

      const updatedEmployee = employeeService.updateEmployee(1, updateData);

      expect(updatedEmployee.firstName).toBe('Johnny');
      expect(updatedEmployee.position).toBe('Senior Software Engineer');
      expect(updatedEmployee.lastName).toBe('Doe'); // Should keep existing data
      expect(updatedEmployee.updatedAt).toBeDefined();
    });

    it('should throw error when employee not found', () => {
      expect(() => {
        employeeService.updateEmployee(999, { firstName: 'Test' });
      }).toThrow('Employee not found');
    });

    it('should throw error when ID is missing', () => {
      expect(() => {
        employeeService.updateEmployee(null, { firstName: 'Test' });
      }).toThrow('Employee ID is required');
    });

    it('should throw error when update data is missing', () => {
      expect(() => {
        employeeService.updateEmployee(1);
      }).toThrow('Update data is required');
    });

    it('should throw error when updating to existing email', () => {
      expect(() => {
        employeeService.updateEmployee(1, { email: 'jane.smith@example.com' });
      }).toThrow('Employee with this email already exists');
    });

    it('should allow updating to same email', () => {
      const updateData = { email: 'john.doe@example.com', firstName: 'Johnny' };
      const updatedEmployee = employeeService.updateEmployee(1, updateData);
      
      expect(updatedEmployee.firstName).toBe('Johnny');
      expect(updatedEmployee.email).toBe('john.doe@example.com');
    });
  });

  describe('deleteEmployee', () => {
    it('should delete employee by valid ID', () => {
      const deletedEmployee = employeeService.deleteEmployee(1);
      
      expect(deletedEmployee.id).toBe(1);
      expect(employeeService.getAllEmployees()).toHaveLength(1);
    });

    it('should throw error when employee not found', () => {
      expect(() => {
        employeeService.deleteEmployee(999);
      }).toThrow('Employee not found');
    });

    it('should throw error when ID is missing', () => {
      expect(() => {
        employeeService.deleteEmployee();
      }).toThrow('Employee ID is required');
    });
  });

  describe('searchEmployees', () => {
    it('should search employees by first name', () => {
      const results = employeeService.searchEmployees('john');
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('John');
    });

    it('should search employees by email', () => {
      const results = employeeService.searchEmployees('jane.smith');
      expect(results).toHaveLength(1);
      expect(results[0].email).toBe('jane.smith@example.com');
    });

    it('should search employees by position', () => {
      const results = employeeService.searchEmployees('manager');
      expect(results).toHaveLength(1);
      expect(results[0].position).toBe('Product Manager');
    });

    it('should return all employees for empty search term', () => {
      const results = employeeService.searchEmployees('');
      expect(results).toHaveLength(2);
    });

    it('should return empty array for no matches', () => {
      const results = employeeService.searchEmployees('nonexistent');
      expect(results).toHaveLength(0);
    });

    it('should be case insensitive', () => {
      const results = employeeService.searchEmployees('JOHN');
      expect(results).toHaveLength(1);
      expect(results[0].firstName).toBe('John');
    });
  });

  describe('getEmployeesByDepartment', () => {
    it('should return employees by department', () => {
      const results = employeeService.getEmployeesByDepartment('Engineering');
      expect(results).toHaveLength(1);
      expect(results[0].department).toBe('Engineering');
    });

    it('should return all employees for empty department', () => {
      const results = employeeService.getEmployeesByDepartment('');
      expect(results).toHaveLength(2);
    });

    it('should be case insensitive', () => {
      const results = employeeService.getEmployeesByDepartment('engineering');
      expect(results).toHaveLength(1);
    });
  });

  describe('getTotalEmployeeCount', () => {
    it('should return correct count', () => {
      expect(employeeService.getTotalEmployeeCount()).toBe(2);
      
      employeeService.createEmployee({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        position: 'Tester'
      });
      
      expect(employeeService.getTotalEmployeeCount()).toBe(3);
    });
  });

  describe('clearAllEmployees', () => {
    it('should clear all employees', () => {
      employeeService.clearAllEmployees();
      expect(employeeService.getTotalEmployeeCount()).toBe(0);
      expect(employeeService.getAllEmployees()).toHaveLength(0);
    });
  });
});